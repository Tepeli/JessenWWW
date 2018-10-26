let iidee = 0; // id listan uusia alkioita varten

Vue.component('lista', {
 props: ['osuus', 'index'],
 template: '<li class="collection-item amber lighten-2 flow-text"><div class="row"><div class="col m10 s10">{{ osuus }}</div><div class="col m2 s2"><a class="btn btn-small waves-effect waves-light blue" v-on:click="$emit(`poisto`, index)">Poista</a></div></div></li>' // template sisältää poistonapin
})

new Vue({
  el: '#app',
  data() {
    return {
      ostos: '',
      errors: [],
      // id on tavallaan täysin turha ominaisuus tässä, mutta pyörii mukana kuitenkin
      // messagesia on vähän esitäytetty
      messages: [
         { id: 0, osuus: 'maito' },
         { id: 1, osuus: 'makkara' },
         { id: 2, osuus: 'munat' }
      ],
   };
  },

  // jos löytyy local storagesta messages, otetaan se käyttöön.
  mounted() {
    if (localStorage.getItem('messages')) {
      try {
        this.messages = JSON.parse(localStorage.getItem('messages'));
        iidee = Number(this.messages[this.messages.length - 1].id)+1; // korjataan ylempänä ollut iidee=0 oikeaksi.
      } catch(e) { // korruptoitunut data..
        localStorage.removeItem('messages');
      }
    }
  },

  methods: {
    // ostoksen lisääminen listaan
    lisays() {
      // Virhetilanteiden tutkinta
      this.errors = [];

      if (!this.ostos) {
        this.errors.push('Ostos vaaditaan.');
      }
      if (this.ostos.length > 10) {
        this.errors.push('Ostos liian pitkä. (max 10)');
      }
      if (!this.validointi(this.ostos)) {
        this.errors.push('Oikea ostos vaaditaan (Ei erikoismerkkejä!)');
      }

      // Jos ei virheitä, aloitetaan lisäys
      if (!this.errors.length) {
        if (this.ostos === '') {
          return;
        }

        this.messages.push({id: iidee, osuus: this.ostos});
        iidee++
        this.ostos = '';
        this.savetus() // Tallennetaan local storageen
      }
    },

    // Tutkitaan onko sallittuja merkkejä
    validointi: function (ostos) {
      var re = /^[a-öA-Ö0-9.,]*$/;
      return re.test(ostos);
    },

   poisto(index) {
      this.messages.splice(index, 1);
      this.savetus();
    },

    savetus() {
      const parsed = JSON.stringify(this.messages);
      localStorage.setItem('messages', parsed);
    },

 },
})
