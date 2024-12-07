FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# prod environment
FROM node:18-alpine as production
WORKDIR /app

# ENV NODE_ENV=development

# install server for static file hosting
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist"]

