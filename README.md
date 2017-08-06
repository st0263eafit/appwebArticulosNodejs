# NodeJS articulosEM

By: Edwin Montoya Munera - emontoya@eafit.educo

# Descripción de aplicación

<<<<<<< HEAD
Aplicación web que permite gestionar Articulos.

Se generó la base, con Yeoman (http://yeoman.io/):

    $ yo express

(este generador, crea una app base ejemplo MVC para gestión de articulos)
=======
Aplicación web que permite gestionar Articulos, un CRUD básico de (title, url y description) por Artículo.
>>>>>>> test

Ejemplo de clase, a modo de tutorial, que cubre:

* Aplicación del patron MVC a una aplicación Web
* Uso de un framework backend moderno -> NodeJS
* Configuración de ambientes: Desarrollo, Pruebas y Producción.

# 1. Análisis

## 1.1 Requisitos funcionales:

1. Crear Articulo.
2. Buscar articulo por parte del titulo
3. Borrar articulo por Id de articulo
4. Listar todos los articulos de la base de datos en la página home o index

## 1.2 Definición de tecnología de desarrollo y despliegue para la aplicación:

* Lenguaje de Programación: Javascript
* Framework web backend: NodeJS - Express
* Framework web frontend: no se usa - se utilizará Templates HTML para Vista (V)
* Base de datos: MongoDB
* Web App Server: NodeJS
<<<<<<< HEAD
* Web Server: NGINX

## Ambiente de Desarrollo, Pruebas y Producción:

## Desarrollo:

## Pruebas

en el DCA:

1. se instala nvm local para el usuario

source: https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-centos-7/

2. se instala la version de node:

    $ nvm install v7.7.4

3. se instala el servidor mongodb

como root:

    # yum install mongodb-server -y

ponerlo a correr:

    # systemctl enable mongod
    # systemctl start mongod


lo instala de los repositorios propios de Centos.

tambien lo puede instalar de un repo de mongodb:

ver pág: https://www.liquidweb.com/kb/how-to-install-mongodb-on-centos-7/

=======
* Web Server: NGINX y Apache Web Server

# 2. Desarrollo

Se generó la base, con Yeoman:

$ yo express

(este generador, crea una app base ejemplo MVC para gestión de articulos)

>>>>>>> test
# 3. Diseño:

## 3.1 Modelo de datos:

    article:

    {
        title: String,
        url: String,
        text: String
    }

## 3.2 Servicios Web

    /* Servicio Web: Inserta un registro de Articulo en la Base de datos
      Método: POST
      URI: /newarticle
    */

    /* Servicio Web: Realiza la búsqueda en la base de datos, por campo titulo
      Método: GET
      URI: /findbytitle?title=val
    */

    /* Servicio Web: Realiza la búsqueda en la base de datos de todos los articulos
      Método: GET
      URI: /articles
    */

    /* Servicio Web: Borra un Articulo de la Base de datos.
      Método: GET
      URI: /delarticle?id=val
     */

     /* Servicio Web: Borra un Articulo de la Base de datos.
       Método: DELETE
       URI: /delarticle/id
      */

# 4. Despligue en un Servidor Centos 7.x en el DCA


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

      user1$ firewall-cmd --zone=public --add-port=3000/tcp --permanent
      user1$ firewall-cmd --reload
      user1$ firewall-cmd --list-all

como medida desesperada, puede parar y desactivar el firewalld, cosa que no es recomendable:
      user1$ sudo systemctl stop firewalld   
      user1$ sudo systemctl disable firewalld
      user1$ sudo systemctl start firewalld

<<<<<<< HEAD
# 5. Implementación o Despliegue (DCA y PaaS):

5.1 despliegue en el data center academico (DCA):

se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

    emontoya$ npm install -g pm2
    emontoya$ cd articulosEM
    emontoya$ pm2 start app.ps
    emontoya$ pm2 list
    
ponerlo como un servicio, para cuando baje y suba el sistema:    
    
    emontoya$ pm2 startup systemd
    
abrir los puertos en el firewall que utilizara la app:

    # firewall-cmd --zone=public --add-port=3000/tcp --permanent
    # firewall-cmd --reload
    # firewall-cmd --list-all
    
como medida desesperada, puede parar y desactivar el firewalld, cosa que no es recomendable:

    # systemctl stop firewalld   
    # systemctl disable firewalld
    # systemctl start firewalld
    

Instalar NGINX:

    # yum install -y nginx
    
    # systemctl enable nginx
    # systemctl start nginx
    
Abrir el puerto 80
    
    # firewall-cmd --zone=public --add-port=80/tcp --permanent
    # firewall-cmd --reload
    
MUY MUY IMPORTANTE: Deshabilitar SELINUX

    # vim /etc/sysconfig/selinux
    
          SELINUX=disabled
          
    # reboot
    
    
    

=======
## se instala Apache Web Server

      user1$ sudo yum install httpd

## se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

      user1$ npm install -g pm2
      user1$ cd articulosEM
      user1$ pm2 start app.ps
      user1$ pm2 list

ponerlo como un servicio, para cuando baje y suba el sistema:    

      user1$ sudo pm2 startup systemd

## MUY MUY IMPORTANTE: Deshabilitar SELINUX

          user1$ sudo vim /etc/sysconfig/selinux

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

### Configuración del proxy inverson en NGINX para cada aplicación:

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


# 5. Despliege en Heroku
>>>>>>> test
