import io from "socket.io-client"

export const socket = io('https://muzsoyuz.com/', {
  path : '/api/v2/chat',
  query: {
    token: localStorage.getItem("token"),
  }
})

console.log(socket)