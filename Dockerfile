FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY index.hmtl /usr/share/nginx/html/index.html
EXPOSE 80
