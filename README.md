# NodeJS articulosEM

By: Edwin Montoya Munera - emontoya@eafit.edu.co

# 1. Analisis y Diseño

* [Análisis y Diseño](analisis-diseno.md)

# 2. Despligue en un Servidor Centos 7.x en el DCA

* [Despliegue en DCA](deploy-on-dca.md)

# 3. Despliege en Heroku

* [Despliegue en Heroku](deploy-on-heroku.md)

# 4. Despliege en Docker

* [Despliegue en Docker](deploy-on-docker.md)

# 5. Despliegue en Kubernetes

<<<<<<< HEAD
# 2. Desarrollo

Se generó la base, con Yeoman:

$ yo express

(este generador, crea una app base ejemplo MVC para gestión de articulos)

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


# 5. Despliege en Heroku

1. referencia: https://devcenter.heroku.com/articles/deploying-nodejs
2. crear una cuenta en heroku.com
3. crear una cuenta y base de datos en mlab.com

## 5.1 Crear base de datos

primero es crear una base de datos, usuario y clave en un proveedor de Mongo como mlab.com

ofrece un plan gratis con limitaciones, pero para efectos de esta prueba va bien.

en este caso, se creo una base de datos: "emontoya", user: "emontoya", password: "*****".

para comprobar funcionalidad puede probar:

        user1$ mongo ds163397.mlab.com:63397/emontoya -u <dbuser> -p <dbpassword>

debe cambiar el string de conexión a la base de datos en producción en config.js:

        // config/config.js
        .
        .
        production: {
          baseUrl: "/",
          root: rootPath,
          app: {
            name: 'articulos'
          },
          port: process.env.PORT || 5000,
          db: 'mongodb://emontoya:*****@ds163397.mlab.com:63397/emontoya'
        }
        .
        .

## 5.2 deploy en heroku

* ya tiene una cuenta en heroku
* ya tienen el CLI local de heroku.

(ej: en macos se instalo con $ brew install heroku)


          user1$ heroku login

          user1$ cd articulosEM
          user1$ herocu local web

          // esto prueba la app local en production
          // se conecta para pruebas: http://localhost:5000

          user1$ heroku create
          Creating app... done, ⬢ afternoon-ocean-97432
          https://afternoon-ocean-97432.herokuapp.com/ | https://git.heroku.com/afternoon-ocean-97432.git

          user1$ git push heroku master

Queda en producción en:

            https://afternoon-ocean-97432.herokuapp.com/

## 6. Despliegue en Kubernetes

## 6.1 Personalizar los manifiestos para cada grupo

En el directorio raiz del código descargado ejecutar:

      docker image build -t emontoya/artnode:1.0 .
      docker image push emontoya/artnode:1.0

En Linux:

      export KUBECONFIG=$HOME/.kube/kubeconfig

## 6.2 Despliegue en cluster de Kubernetes

Para hacer el deploy a partir de los manifiestos, ejecutar desde el directorio raiz del código:

      kubectl -n emontoya create -f k8s/
      kubectl -n emontoya create configmap webapp-nginx-config --from-file=k8s/configmap/nginx.conf

## 6.3 Limpiar la instalación

Para limpiar la instalación:

      kubectl -n emontoya delete rc --all
      kubectl -n emontoya  delete svc --all
      kubectl -n emontoya  delete deployment --all
      kubectl -n emontoya  delete ingress --all
      kubectl -n emontoya  delete configmap webapp-nginx-config
=======
* [Despliegue en Kubernetes](deploy-on-kubernetes.md)
>>>>>>> master

/////

@20181            
