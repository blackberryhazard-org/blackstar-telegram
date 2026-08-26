FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --only=production
RUN npx prisma generate

COPY src ./src

CMD ["node", "src/index.js"]
