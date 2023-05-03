const faker = require('faker');
const cors = require('@koa/cors');
const slow = require('koa-slow');
const serverless = require('serverless-http');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const router = new Router();
const app = new Koa();

app.use(cors());
app.use(slow({
  delay: 5000, // Задержка в миллисекундах
  urlPattern: '/news', // Опционально: только к определенному URL-шаблону
}));
function generateNews() {
  const data = [];
  const randomLength = faker.datatype.number({ min: 1, max: 5 });
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

router.get('/news', async (ctx) => {
  ctx.body = generateNews();
});

app.use(router.routes()).use(router.allowedMethods());

const handler = serverless(app);
module.exports.handler = handler;

// для заупска сервера локально
// app.listen(7000, function(){
//   console.log('Server running on http://localhost:7000')
// });
