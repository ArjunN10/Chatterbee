const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const http=require("http")
const {Server}=require("socket.io")
 
require("dotenv").config()
const port=process.env.PORT
const app =express()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected")
})


app.use(cors())
app.use(express.json())




const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    socket.on("join_room",(data)=>{
        socket.join(data)
    })


    // socket.on("send_message",(data)=>{
    //     socket.broadcast.emit("receive_message",data)
    // })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })
})

server.listen(port,()=>{
    console.log(`Server running on port:${port}`);
})