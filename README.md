[![Netlify Status](https://api.netlify.com/api/v1/badges/00ac9a3f-7894-4e9b-a7b0-0e93a3715849/deploy-status)](https://app.netlify.com/sites/workers-loading-styling/deploys)

### Loading Styling

#### Легенда

Сейчас модно показывать интерфейсы загрузки вроде следующего:

![](./pic/loading.png)

#### Описание

Реализуйте подобный интерфейс, закешировав статические ресурсы и показывая этот внешний вид до момента загрузки данных.

Даже если у пользователя нет подключения, страница всё равно должна отображаться, но в режиме загрузки и после неудачной попытки соединения переходить в режим:

![](./pic/loading-2.png)

Для эмуляции задержки - [koa-slow](https://github.com/bahmutov/koa-slow).

Для кеширования - плагин Workbox.
