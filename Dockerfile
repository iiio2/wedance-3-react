FROM node:alpine 

WORKDIR /app 

COPY package.json . 

COPY pnpm-lock.yaml . 

RUN npm i -g pnpm 

COPY . . 

RUN pnpm i

EXPOSE 3000 

CMD ["pnpm", "run", "dev"]