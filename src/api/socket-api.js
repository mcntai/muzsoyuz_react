import io from "socket.io-client"

const socket = io('https://muzsoyuz.com/', {
  path : '/api/v2/chat',
  query: {
    token: localStorage.getItem("token"),
  }
})


console.log(socket)

export default socket