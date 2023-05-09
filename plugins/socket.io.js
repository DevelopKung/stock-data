import io from 'socket.io-client'
// URL_API // PORT // URL_CLIENT
let url = process.env.URL_API
const socket = io(url, {reconnect: true})

export default socket