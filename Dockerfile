FROM node:18-alpine
WORKDIR /lms-fe/
COPY public/ /lms-fe/public
COPY src/ /lms-fe/src
COPY package.json /lms-fe/
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev:staging