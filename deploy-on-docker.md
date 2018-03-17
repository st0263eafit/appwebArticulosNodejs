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

Construir el contenedor nodejs+app:

  $ cd appwebArticulosNodejs
  $ docker image build -t <docker_hub_user>/artnode:<version> .
  $ docker image push <docker_hub_user>/artnode:<version>

Adquirir el contenedor oficial de mongo:

  $ docker pull mongo

Adquirir el contenedor oficial de nginx:

  $ docker pull nginx    

## Con docker-compose

Se ejecuta el docker-compose

    $ docker-compose up

comprobar la ejecución con un browser y visitar la URL [0.0.0.0:3000](0.0.0.0:3000)

@20181            
