FROM node:15
EXPOSE 3000
WORKDIR /app
COPY . .
RUN npm install && npm run build 
CMD ["npm","start"]