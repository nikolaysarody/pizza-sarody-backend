### NestJS API сервер для Pizza Sarody. База данных - MongoDB.

Клиент - <https://github.com/nikolaysarody/pizza-sarody>

Вам нужно установить `MongoDB` с помощью `Docker`:
1) Установите `Docker` - <https://www.docker.com/>.
2) Запустите контейнер `mongo`.
3) Установите `MongoDB Compass` - <https://www.mongodb.com/products/compass>.
4) Установите и запустите сервер.
5) Откройте `MongoDB Compass`, в поле `URI` вставьте `mongodb://localhost:27017` и нажмите `Connect`.
6) В появившихся коллекциях внутри `pizza` импортируйте данные из папки `src/db`.

Инструкция по запуску сервера:
1) Если у Вас не установлены `Node.js` и `git`, установите их - <https://nodejs.org/en/download/> и <https://git-scm.com/download/>.
2) Откройте терминал и перейдите в папку, в которой будет находиться этот проект, либо другим удобным для Вас методом.
3) Выполните команду `git clone https://github.com/nikolaysarody/pizza-sarody-backend`.
4) Выполните команду `cd pizza-sarody-backend`.
5) Выполните команду `npm i`.
6) Выполните команду `npm start`.