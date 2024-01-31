# Usa una imagen base con Node.js instalado
FROM node:18.0.0

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y yarn.lock (si existe) al directorio de trabajo
COPY package.json yarn.lock* ./

# Instala las dependencias del proyecto
RUN yarn install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Ejecuta el comando para migrar la base de datos
# RUN yarn sequelize-cli db:migrate

# Expone el puerto 3001 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["yarn", "start"]
