FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]



#FROM node:lts-alpine
#WORKDIR /front2
#COPY package.json ./
#RUN  npm install
#CMD npm run dev
#EXPOSE 5173
