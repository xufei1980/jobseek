/**
 * Created by think on 2018/1/26.
 */
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const path=require('path')
// Chat.remove({},function(e,d){})

const app = express()
// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection',function(socket){
    console.log('user login')
    socket.on('sendmsg',function(data){
        console.log(data)
        const {from, to, msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg', Object.assign({},doc._doc))
        })
        // console.log(data)
        // io.emit('recvmsg',data)
    })
})



const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use(function (req,res,next) {
    if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
        return next()
    }
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function(){
    console.log('Node app start at port 9093')
})

