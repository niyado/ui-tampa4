FROM node:10-alpine as frontend

WORKDIR /app
RUN npm install
RUN npm run build

ENV PORT 3000
ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]