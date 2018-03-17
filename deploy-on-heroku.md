# NodeJS articulosEM

By: Edwin Montoya Munera - emontoya@eafit.edu.co

# Despliege en Heroku

1. referencia: https://devcenter.heroku.com/articles/deploying-nodejs
2. crear una cuenta en heroku.com
3. crear una cuenta y base de datos en mlab.com

## 1 Crear base de datos

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

## 2 deploy en heroku

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



@20181            
