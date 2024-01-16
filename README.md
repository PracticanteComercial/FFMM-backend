# FFMM-backend

## Creación de proyecto
npm init -y


## Correr la aplicación
yarn install
yarn start

## Para iniciar la base de datos 
sudo service postgresql start
sudo -u postgres psql

## Correr migraciones y seed
yarn sequelize-cli db:migrate
yarn sequelize-cli db:seed:all

## Links de recursos
