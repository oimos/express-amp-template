// https://devcenter.heroku.com/articles/ssl-certificate-self
// openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
// openssl rsa -passin pass:x -in server.pass.key -out server.key
// rm server.pass.key
// openssl req -new -key server.key -out server.csr
// openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

const fs = require('fs')
const http = require('http')
const https = require('https')
const privateKey = fs.readFileSync('./server.key', 'utf8')
const certificate = fs.readFileSync('./server.crt', 'utf8')
const credentials = {key: privateKey, cert: certificate}

const express = require('express')
const util = require('util');
const bodyParser = require('body-parser')
const logger = require('morgan')
const methodOverride = require('method-override')
const connect = require('connect')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const cors = require('cors')
const multer = require('multer')
const multipart = multer()
const app = express()
const post = require('./routes/post')
// const allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('AMP-Access-Control-Allow-Source-Origin', 'http://localhost:3000')
//   res.header('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin')
//   next()
// }

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// app.use(allowCrossDomain)
// app.use(methodOverride(function(req, res){
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     // look in urlencoded POST bodies and delete it
//     var method = req.body._method;
//     // delete req.body._method;
//     delete req.body._method;
//     return method;
//   }
// }))
app.use(express.static(`${__dirname}`))

const port = process.env.PORT || 3000;

app.use(methodOverride('_method'));
app.use(cookieParser())
app.use(expressSession({
  secret: '12380%9G',
  resave: false,
  saveUninitialized: false
}))
// app.use(csrf())
// app.use(function(req, res, next){
//   const token = req.csrfToken()
//   res.locals.csrftoken = token
//   next()
// })

app.use(logger('dev'))

app.use(function(err, req, res, next){
  res.send(err.message)
})

app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')


// routing
app.get('/', post.index)
app.get('/posts/:id([0-9]+)', post.show)
app.get('/posts/new', post.new)

app.post('/posts/create', multipart.fields([]), post.create)
app.get('/posts/:id/edit', post.edit)
app.put('/posts/:id', multipart.fields([]), post.update)
app.delete('/posts/:id', multipart.fields([]), post.destroy)
app.get('/showlist/', post.showlist)

app.get('/amp', post.indexAmp)
app.get('/posts/:id([0-9]+)/amp', post.showAmp)
app.get('/posts/new/amp', post.newAmp)
app.get('/posts/:id/edit/amp', post.editAmp)

app.get('/amp-fx-flying-carpet', post.ampFxFlyingCarpet)
app.get('/amp-position-observer', post.ampPositionObserver)
app.get('/amp-user-notification', post.ampUserNotification)
app.get('/shouldshow', multipart.fields([]), post.ampUserNotificationShouldShow)
app.post('/shouldshow', multipart.fields([]), post.ampUserNotificationShouldHide)
// app.get('/new/:name?', (req, res) => {
//   if(req.params.name){
//     res.render('new', {name: req.params.name})
//   } else {
//     res.send('Hello')
//   }
// })

// app.listen(port)
// console.log(`listen on port ${port}`)
const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

// httpServer.listen(8080)
httpsServer.listen(4460)
console.log(`listen on port ${port}`)