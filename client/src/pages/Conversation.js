import React, { useEffect, useState } from 'react'
import io from "socket.io-client"

const socket=io.connect("http://localhost:3002")
export default function Conversation() {

  //  Message State
  const [message,setMessage]=useState("")
  const [messageReceived,setMessageReceived]=useState("")
// Room state
  const [room,setRoom]=useState("")

const sendMessage=()=>{
socket.emit("send_message",{ message,room})
}

const joinRoom=()=>{
  if(room!==""){
    socket.emit("join_room",room)
  }
}

useEffect(()=>{
  socket.on("receive_message",(data)=>{
    setMessageReceived(data.message);
  })
},[socket])


  return (
    <div style={{margin:" 10% 40%"}}>
        <input 
        type='text'
        placeholder='message..'
        onChange={(event)=>setRoom(event.target.value)}
        />
         <button
            name="send"
            id="send"
            onClick={joinRoom}>
            create Room
            </button>
           
        <input 
        type='text'
        placeholder='message..'
        onChange={(event)=>setMessage(event.target.value)}
        />
        <button
            name="send"
            id="send"
            onClick={sendMessage}>
            Send
            </button>
            <h1>Message:
              {messageReceived}
            </h1>
    </div>
  )
}
