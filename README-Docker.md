# NodeJS articulosEM

By: Edwin Montoya Munera - emontoya@eafit.educo

# Descripción de aplicación

Aplicación web que permite gestionar Articulos, un CRUD básico de (title, url y description) por Artículo.

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
* Web Server: NGINX y Apache Web Server

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

# 4. Correr el código en contenedores de Docker

## Instalar Docker

### Ubuntu

    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu$(lsb_release -cs) stable"
   $ sudo apt-get update
   $ sudo apt-get install docker-ce

### Windows

Descargar el instalador grafico oficial de [Docker](https://docs.docker.com/docker-for-windows/install/)

### OSX

Descargar el instalador grafico oficial de [Docker](https://docs.docker.com/docker-for-mac/install/)

## Descargar el proyecto github

      $ cd /tmp/
      $ mkdir apps
      $ cd apps
      $ git clone https://github.com/st0263eafit/appwebArticulosNodejs.git
      $ cd appwebArticulosNodejs

## Se ejecuta el docker-compose

    $ docker-compose up

comprobar la ejecución con un browser y visitar la URL [0.0.0.0:3000](0.0.0.0:3000)

@20181            
