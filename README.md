# FFMM-backend

## Antes de correr el proyecto por primera vez, se debe crear la base de datos 
### Si se está usando sistema Linux:
1. Iniciar el servicio de postgresql: ```sudo service postgresql start```
2. Entrar a la consola de postgresql: ```sudo -u postgres psql```
3. Crear una tabla llamada "{DB_NAME}_development" usando: ```CREATE DATABASE {DB_NAME}_development;``` donde "DB_NAME" corresponde a la variable que se está definiendo en .env. (Si se desea cambiar el nombre o formato de nombre de la tabla, procure cambiar también la línea 8 ``` "database": `${process.env.DB_NAME}_development`,```," del archivo ```src/config/config.js``` ).
4. Salir de postgresql usando:  ```\q```

## Correr migraciones
```yarn sequelize-cli db:migrate```

## Correr el proyecto
```yarn install```
```yarn start```

## Ingreso de datos de fondos mutuos a la base de datos (Paso Opcional)
A través de Postman subir el archivo de excel que está guardado en ```src/assets/Excel-FFMM.xlsx``` a través del endpoint ```{URL_base}/FFMMs/upload```, donde {URL_base} es el URL de deploy. El código NO lee el archivo de excel por sí solo, por lo que no guarda automaticamente a la base de datos.

## Docker 
docker build -t ffmm-backend .

docker run -p 3001:3001 

(
Crear bdd:
createdb -h localhost -U practicantecomercial -p 5432 ffmm_vectorcapital_development
)

docker tag ffmm-backend 10.0.1.8:5000/ffmm-backend:1.0
docker push 10.0.1.8:5000/ffmm-backend:1.0

## Docker Compose
Después de levantar las imagenes con docker run, ejecutar este comando:
docker-compose up

##### Creación del proyecto
npm init -y


