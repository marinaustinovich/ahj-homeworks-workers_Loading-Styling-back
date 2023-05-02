const faker = require('faker');
const cors = require('@koa/cors');
const serverless = require('serverless-http');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const router = new Router();
const app = new Koa();

app.use(cors());

function generateData() {
  const data = [];
  const randomLength = faker.datatype.number({ min: 1, max: 10 });

  for (let i = 0; i < randomLength; i++) {
    data.push({
      author_id: faker.datatype.uuid(),
      title: faker.lorem.sentence(),
      author: faker.name.findName(),
      avatar: faker.image.avatar(),
      image: faker.image.imageUrl(),
      created: faker.date.recent().getTime(),
    });
  }
  return data;
}

function generateNews() {
  const data = [];
  const randomLength = faker.datatype.number({ min: 1, max: 3 });
  for (let i = 0; i < randomLength; i++) {
    data.push({
      id: faker.datatype.uuid(),
      avatar: faker.image.avatar(),
      text: faker.lorem.paragraph(),
      date: faker.date.recent().getTime(),
    },);
  }
  return data;
}

app.use(serve(path.join(__dirname, 'public'))); // предоставлять статические файлы из папки 'public'

router.get('/', async (ctx) => {
  ctx.body = 'Welcome to server!';
});

app.use(router.routes()).use(router.allowedMethods());

const handler = serverless(app);
module.exports.handler = handler;
