
Creado por: Andres Felipe Galvis Pereira 
=====================================================================

# API_REST_FULL_STACK

##=================================================================================
    INTRODUCCION
    
Este proyecto se desarrollo en node.js para el backend
y se consumieron los servicios de la api-rest con javascript
se uso un poco de bootstrap para el diseño y algunos styles.css propios

#=============================================================================
  
 --> EXPLICACION DEL FUNCIONAMIENTO <-- 

Este es un proyecto En el cual se creo un sistema que ayuda a juzgar a una persona por sus delitos, 
el Proyecto nos permite Agregar una persona sospechosa a la base de datos , y apartir de ese registro crear o iniciar  un caso,
y a ese caso se le pueden asignar pruebas,

el proyceto basandose en la cantidad de pruebas positivas o negativas determinara el veredicto del caso, si es culpable,
si es inocente o si el caso esta inconcluso, este ultimo se determina si el numero de pruebas negativas es igual al nuemero de pruebas positivas

por ultimo en las vistas , tenemos 3 paginas html, una para casos , una para acusados, y otra para pruebas,
en cada una de ellas , existen las opcionde CRUD , crear , leer ,actualizar y borrar los registros.

aparte hay dentro de cada tabla una accion de mmostrar detalles, en la cual se muestran unos detalles extra de los resgistros de las tablas.


##==================================================================================================
  
  ------>  TENER EN CUENTA LO SIGUIENTE, ES IMPORTANTE PARA QUE FUNCIONE EL PROYECTO EN SUS ENTORNOS <------------------
  
  el proyecto corre en el puerto 7000   ( npm run dev )

para que puedan correr el proyecto tiene que modificar el archivo .env:
    -ya que es en este archivo en el que se esta especificando los datos de la base de datos que en este caso es mysql
    - luego deberan importar a mysql el archivo db.sql que esta dentro de el directorio simulacroConcurso.
    - crear una base de datos con el nombre que deseen y ahi es donde van a importar el archivo db.sql que ya tiene unos registros previos,
      y enotnces en el archo .env deberan cambiar el nombre de la base de datos , por el nombre que uds hayan creado 
      es decir: (DATABASE = "SU data base").
      
###=======================================================================================================


    
