FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node . .

EXPOSE 5000

USER node

CMD ["node", "server.js"]
