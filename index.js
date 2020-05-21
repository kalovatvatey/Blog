const express = require('express')
const path = require('path')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')



/* Controller */
const indexController = require('./controller/render/index')
const addNewsController = require('./controller/render/addNews')
const editNewsController = require('./controller/editNews')
const loginController = require('./controller/render/login')
const registerController = require('./controller/render/register')
const authLoginController = require('./controller/authLogin')
const storeNewsController = require('./controller/storeNews')
const updateNewsController = require('./controller/updateNews')
const getNewsController=require('./controller/getNews')
const deleteController = require('./controller/delete')
const authRegisterController = require('./controller/register')
const logoutController = require('./controller/logout')
const singleNewsController = require('./controller/singleNews')
const newsController = require('./controller/news')

const redirectIf = require('./middleware/redirectIf')
const authMiddleware = require('./middleware/auth')

const app = express()

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Admin:admin@cluster0-rghmp.mongodb.net/test?retryWrites=true&w=majority');

app.use(connectFlash())

cloudinary.config({
    api_key: '443543165335289',
    api_secret: '3W96iKv50YcOBhZJ8Jo9zloJkuc',
    cloud_name: 'http-kalovatvatey-com'
})

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(express.static('public'))
app.use(fileUpload())
app.use(expressEdge.engine)

app.set('views', `${__dirname}/views`)

/* app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
}); */

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', authMiddleware, indexController)
app.get('/add/news', authMiddleware, addNewsController)
app.get('/edit/:id', authMiddleware, editNewsController)
app.get('/login', redirectIf, loginController)
app.get('/register', registerController)
app.get('/news', authMiddleware, getNewsController)
app.get('/delete/:id', authMiddleware, deleteController)
app.get('/logout', logoutController)
app.post('/update/:id', authMiddleware, updateNewsController)
app.post('/auth/login', authLoginController)
app.post('/auth/register', authRegisterController)
app.post('/store/news', authMiddleware, storeNewsController)

/* Frontend */
app.get('/index', newsController)
app.get('/news/:id', singleNewsController)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});