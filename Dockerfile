FROM nginx:alpine
COPY index.hmtl /usr/share/nginx/html/index.html
EXPOSE 80
