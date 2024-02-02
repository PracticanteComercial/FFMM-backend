FROM node:18.0.0

WORKDIR /FFMM-backend

COPY package.json yarn.lock* ./

RUN yarn install

COPY . .

ENV DB_HOST=10.0.1.8

RUN DATABASE_URL="postgres://practicantecomercial:ok@${DB_HOST}:5432/ffmm_vectorcapital_development" yarn sequelize-cli db:migrate

EXPOSE 3001

CMD ["yarn", "start"]