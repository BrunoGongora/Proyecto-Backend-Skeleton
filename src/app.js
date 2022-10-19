const express = require('express');
const app = express();
const userRouter = require('./users/user.router')
const db = require('./utils/database')
const authRouter = require('./auth/auth.router')

const {port} = require('./config')

app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK',
        user: `localhost: ${port}/api/v1/users`
    })
});


db.authenticate()
.then(() => {
    console.log("Database augtenticada")
})
.catch(error => {
    console.log(error)
})

db.sync()
    .then(()=> {
        console.log("Databsabe sincronizada")
    })
    .catch(error => {
        console.log(error)
    })


app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)


app.listen(port, () => {
    console.log(`SERVER startet at port ${port}`)
})