# NodeJS articulosEM

By: Edwin Montoya Munera - emontoya@eafit.edu.co

# Correr el código en contenedores de Docker

## Instalar Docker

### En Ubuntu:

      $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
      $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu$(lsb_release -cs) stable"
      $ sudo apt-get update
      $ sudo apt-get install docker-ce

### En Windows:

Descargar el instalador grafico oficial de [Docker](https://docs.docker.com/docker-for-windows/install/)

### En MacOS:

Descargar el instalador grafico oficial de [Docker](https://docs.docker.com/docker-for-mac/install/)

## Descargar el proyecto github

      $ cd /tmp/
      $ mkdir apps
      $ cd apps
      $ git clone https://github.com/st0263eafit/appwebArticulosNodejs.git
      $ cd appwebArticulosNodejs

## Con Dockers independientes:

1. Adquirir el contenedor oficial de mongo:

            $ docker pull mongo
            $ docker run --name mongo-server -p 27017:27017 -v $(pwd)/data:/data/db -d mongo:latest

2. Construir el contenedor nodejs+app:

            $ cd appwebArticulosNodejs
            $ docker image build -t <docker_user>/artnode:<version> .
            $ docker image push <docker_user>/artnode:<version>
            $ docker run --name nodeapp --link mongo-server:mongo -p 3000:3000 -d <docker_user>/artnode:<version>

3. Adquirir el contenedor oficial de nginx:

            $ docker pull nginx
            $ docker run --name webapp --link nodeapp:node -p 80:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx:latest

4. comandos docker utiles:

* lista imagenes:

      $ docker image ls

* borrar una imagen:

      $ docker image rm <image_id>


* lista contenedores en ejecución: 

      $ docker container ls
      $ docker ps
  
* lista todos los contenedores estén o no ejecutando:

      $ docker container ls -a
      $ docker ps -a

* para la ejecución de un contenedor:

      $ docker container stop <container_id> 

* borrar un contenedor, despues que esta detenido:

      $ docker container rm <container_id> 

* ver los logs de un contenedor:

      $ docker container logs <container_id> 

## Con docker-compose

Se ejecuta el docker-compose

    $ docker-compose build
    $ docker-compose up

comprobar la ejecución con un browser y visitar la URL:

    http://localhost_or_ipserver:3000
    para ir directamente al node.

comprobar la ejecución con un browser y visitar la URL:

    http://localhost_or_ipserver
    para ir directamente al webserver nginx.

## Configuración con HAPROXY en Docker, y apps en DOCKER:

Escenario: Tenemos 3 maquinas:

### maq1: ej: 10.131.137.204, con docker y docker-compose instalado, y corriendo la app (nginx, rails, postgress).

### maq2: ej: 10.131.137.183, con docker y docker-compose instalado, y corriendo la app (nginx, rails, postgress).

utilizaremos balanceador de carda: HAPROXY en docker, en una maquina3:

### maq3: ej: 10.131.137.50, con docker instalado.

en maq3, se ejecuta:

      $ sudo docker pull haproxy:1.8.5
      $ sudo docker run -d --name myhaproxy -p 80:80 -v $(pwd)/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro haproxy:1.8.5

en archivo de configuración [haproxy.cfg](haproxy.cfg) en la raiz de este repo.      