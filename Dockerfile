FROM node:15
EXPOSE 3200
WORKDIR /app
ADD package*.json ./
RUN npm install 
ADD  ./ ./
CMD ["npm","start"]