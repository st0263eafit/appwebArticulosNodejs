# NodeJS articulosEM

By: Edwin Montoya Munera - emontoya@eafit.edu.co

# Despligue en un Servidor Centos 7.x en el DCA


## se instala nvm local para el usuario

source: https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-centos-7/

    user1$ nvm install v7.7.4

## se instala el servidor mongodb

como root:

    user1$ sudo yum install mongodb-server -y'

ponerlo a correr:

    user1$ sudo systemctl enable mongod'
    user1$ sudo systemctl start mongod'


lo instala de los repositorios propios de Centos.

tambien lo puede instalar de un repo de mongodb:

ver pág: https://www.liquidweb.com/kb/how-to-install-mongodb-on-centos-7/

## se instala NGINX

    user1$ sudo yum install nginx
    user1$ sudo systemctl enable nginx
    user1$ sudo systemctl start nginx

Abrir el puerto 80

    user1$ sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
    user1$ sudo firewall-cmd --reload

## abrir los puertos en el firewall que utilizara la app:

    user1$ sudo firewall-cmd --zone=public --add-port=3000/tcp --permanent
    user1$ sudo firewall-cmd --reload
    user1$ sudo firewall-cmd --list-all

como medida desesperada, puede parar y desactivar el firewalld, cosa que no es recomendable:

    user1$ sudo systemctl stop firewalld   
    user1$ sudo systemctl disable firewalld
    user1$ sudo systemctl start firewalld

## se instala Apache Web Server

    user1$ sudo yum install httpd

## descargar el proyecto github

    user1$ mkdir apps
    user1$ cd apps
    user1$ git clone https://github.com/st0263eafit/appwebArticulosNodejs.git
    user1$ cd appwebArticulosNodejs
    user1$ npm install

* ensaye la Aplicación

    user1$ npm start

por defecto abre el puerto 3000, entre a un browser y digite: http://ip-servidor:3000

cuando termine de probar, detenga la aplicación (^C)

    user1$

## se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

    user1$ npm install -g pm2
    user1$ cd apps
    user1$ cd appwebArticulosNodejs
    user1$ pm2 start app.js
    user1$ pm2 list

ponerlo como un servicio, para cuando baje y suba el sistema:    

    user1$ pm2 startup systemd

    una vez ejecutado este comando, le indicará las instrucciones para dejarlo como un servicio.

## MUY MUY IMPORTANTE: Deshabilitar SELINUX

    user1$ sudo vi /etc/sysconfig/selinux

        SELINUX=disabled

    user1$ sudo reboot      

## CONFIGURAR UN SERVIDOR NGINX PARA MULTIPLES APLICACIONES

Esta aplicaciones se van a diferenciar por path asi:

    app1: http://ip_server/nodeArticulos
    app2: http://ip_server/rubyArticulos

debe configurar tanto la configuración de la aplicación, como la configuración de NGINX:

### en la Aplicación app1: se debe garantizar que las páginas HTML generadas por templates HTML (ejs) y los redirect o send de las respuestas de los controladores, se incluya el path: "nodeArticulos".

En este ejemplo debe actualizar "config/config.js" con el path apropiado y en el ambiente que correra este servidor (test en este caso), en este caso "nodeArticulos":

      // config/config.js
      .
      .
      test: {
        baseUrl: "/nodeArticulos/",
        root: rootPath,
        app: {
          name: 'articulos'
        },
        port: process.env.PORT || 4000,
        db: 'mongodb://localhost/articulosem-test'
      },
      .
      .
      .

note que los redirect de los controladores, lo hacen con base en baseUrl, y envian esta variable a las páginas .ejs, ejemplo:

      // app/controllers/home.js
      .
      .
      res.render('index', {
        title: 'Gestión de Articulos',
        baseUrl: config.baseUrl,
        articles: articles
      });
      .
      .
      newArticulo.save(function(err, newArticulo) {
        if (err) return next(err);
        res.redirect(config.baseUrl);
      });

Cambien las páginas .ejs que tengan relación con las acciones o rutas, ejemplo:

      // app/views/index.ejs
      .
      .
      <form action="<%=baseUrl%>newarticle" method="POST">
        <input type="text" placeholder="title" name="title">      
      .
      .

### Configuración del proxy inverso en NGINX para cada aplicación:

      // /etc/nginx/nginx.config
      .
      .
      server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  10.131.137.236;
        root         /usr/share/nginx/html;
      .
      .
      location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
      }

      location /nodeArticulos/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header HOST $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:3000/;
        proxy_redirect off;
      }
      location /rubyArticulos/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header HOST $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:4000/;
        proxy_redirect off;
      }
      .
      .
      
@20181  