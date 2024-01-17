# FFMM-backend

## Antes de correr el proyecto por primera vez, se debe iniciar la base de datos 
### Si se está usando sistema Linux:
1. Iniciar el servicio de postgresql: ```sudo service postgresql start```
2. Entrar a la consola de postgresql: ```sudo -u postgres psql```
3. Crear una tabla llamada "{DB_NAME}_development" usando: ```CREATE DATABASE {DB_NAME}_development;``` donde "DB_NAME" corresponde a la variable que se está definiendo en .env. (Si se desea cambiar el nombre o formato de nombre de la tabla, procure cambiar también la línea 8 ``` "database": `${process.env.DB_NAME}_development`,```," del archivo ```src/config/config.js``` ).
4. Salir de postgresql usando:  ```\q```

## Correr el proyecto
```yarn install```
```yarn start```

## Correr migraciones
```yarn sequelize-cli db:migrate```


##### Creación del proyecto
npm init -y
