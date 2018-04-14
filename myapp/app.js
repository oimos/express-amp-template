const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
/**
 * npm install ejs(templat engine)
 * app.set('views', ejsのテンプレートファイルのdir)
 */
app.set('views', `${__dirname}/views`)
/**
 * app.set('view engine', 使用するテンプレートエンジン)
 */
app.set('view engine', 'ejs')

/**
 * app.useで詠みこむものはmiddlewareと呼ぶ
 * requestが来た時にmiddlewareを順次適用していく
 * middlewareは読み込む順番で処理がかかるため記述の順番は大切
 *
 */
app.use(logger('dev'))
app.use(express.static(`${__dirname}/public`))
/**
 * With app.use(express.static(PATH)), it returns static files of the same name if the file is in public dir
 */
// app.get('/diary.txt', (req, res) => {
//   res.sendFile(`/diary.txt`)
// })
app.use(function(req, res, next){
  console.log('my custom middleware!!!')
  next() // it goes to next middleware
})
//npm install nodemon -g => then instead of node app.js(app), you can do nodemon app. YOu dont need to restrat the server


app.get('/', (req, res) => {
  res.render('index.ejs', {title: 'title'});
})

app.get('/users/:name?', (req, res) => {
  console.log(req.params)
  if(req.params.name){
    res.send(`${req.params.name}, Hello`);
  } else {
    res.send(`New User, Hello`);
  }
})

app.get('/items/:id([0-9]+)', (req, res) => {
  if(req.params.id){
    res.send(`${req.params.id}, is the ID`);
  } else {
    res.send(`No ID!!!`);
  }
})

app.param('id', (req, res, next, id) => {
  const users = ['shinya', 'paul', 'john'];
  req.params.name = users[id]
  next();
})
app.get('/hello/:id', (req, res) => {
  res.send(`Hello ${req.params.name}`)
})
app.get('/bye/:id', (req, res) => {
  res.send(`Bye ${req.params.name}`)
})
app.get('/new', (req, res) => {
  res.render('new')
})
app.post('/create', (req, res) => {
  res.send(req.body.name)
})

app.listen(3000)
console.log('server starting...')