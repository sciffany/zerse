const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const port = 4001

const app = express()

const server = http.createServer(app)

const io = socketIO(server)


const passwordio = io.of('/password')
passwordio.on('connection', socket => {
    console.log('User connected')

    socket.on('name', (name)=>
        socket.join(name)
    )

    socket.on('disconnect', ()=> {
        console.log('user disconnected')
    })
})


server.listen(port, ()=>console.log(`Listening on port ${port}`))