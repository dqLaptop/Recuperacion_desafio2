# desafio_mitologico

Para poder probar el proyecto hay que hacer los siguientes pasos:

Clonar el repositorio, que nos generará las dos carpetas con las dos "partes" del proyecto (back y front)
Abrir cada carpeta en un VSC distinto.
En la parte front, hay que:
  - Montar las dependencias y lo necesario tecleando en la terminal: "npm install"
  - Una vez montado lo necesario hay que ponerlo en marcha, tecleando: "npm run start"
  
Para la parte back:
  - Lo primero es crear la base de datos, en el phpMyAdmin, e importar el sql que acompaña el proyecto.
  - En VSC, estando situados en la carpeta del proyecto, generar nuestras dependencias y archivos necesarios, tecleando: "composer update". Quizás haya que poner antes "composer install".
  - Copiar el archivo .env.example como .env (podemos hacerlo tecleando en la terminal "cp .env.example .env")
  - Modificar en el archivo .env los siguientes parámetros:
      - DB_DATABASE -> nombre de la base de datos
      - DB_USERNAME -> nombre de usuario
      - DB_PASSWORD -> contraseña
      - También hay que generar el parámetro APP_KEY, que se genera tecleando en la terminal: "php artisan key:generate"
  - Por último en la parte de back, hay que poner el servidor en marcha, tecleando en la terminal: "php artisan serve"
  En cuanto a la configuración para que funcione el correo es, dentro del fichero .env:
  MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=auxiliardaw2@gmail.com
MAIL_PASSWORD=yjiivqqdpwuiisev
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"
  
 En principio ya devería de mostrarnos la parte front en el navegador, si no fuera así poner en la barra de direcciones: http://localhost:8081/index.html
 Ojo, que el puerto donde muestra nuestra aplicación es el 8081.
 
 También se adjunta una copia de la base de datos (archivo.sql) para que no se tenga que desplegar la base de datos desde Laravel con las migrations.
 
 Para poner en funcionamiento la base de datos se tiene que tener ejecutandose la aplicación XAMP o MAMP o similar.
 
 Para tener acceso a la base de datos para ir comprobando las modificaciones, teclear en el navegador: localhost/phpmyadmin.
 
 El nombre de la base de datos es: prueba.
 
 Usuarios de ejemplo para poder acceder a la aplicación:
 Rol Hades: hades@gmail.es constraseña:123456
 Rol Dios: zeus123@gmail.com contraseña:123456
 Rol Usuario:odessa25@example.net contraseña:123456
 
 
 
 
 
