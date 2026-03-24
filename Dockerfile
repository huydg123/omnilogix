  # Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:22.2-alpine
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

ENTRYPOINT ["npm", "start"]
