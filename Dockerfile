FROM nginx:latest
COPY . /usr/share/ngix/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
