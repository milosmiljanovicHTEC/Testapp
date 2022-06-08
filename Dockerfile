FROM node:15
EXPOSE 3200
WORKDIR /app
COPY . .
RUN npm install 
CMD ["npm","start"]