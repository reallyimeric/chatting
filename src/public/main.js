/* globals io:false */
const socket = io('/', {path: '/chat'})
const inputForm = document.getElementById('inputForm')
const message = document.getElementById('m')
const messagesHistory = document.getElementById('messagesHistory')
const status = document.getElementById('status')
inputForm.addEventListener('submit', evt => {
  evt.preventDefault()
  socket.emit('say', message.value)
  message.value = ''
})
socket.on('broadcast', (socketId, msg) => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(`${socketId} :"${msg}"`))
  messagesHistory.appendChild(li)
})
socket.on('connect', () => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode('ok'))
  status.appendChild(li)
})
socket.on('error', err => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(`error: ${err}`))
  status.appendChild(li)
})
socket.on('disconnect', () => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode('disconnected'))
  status.appendChild(li)
})
socket.on('reconnecting', reconnectingTimes => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(`reconnecting, trying ${reconnectingTimes} ...`))
  status.appendChild(li)
})
socket.on('reconnect_error', error => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(`reconnecting error: ${error}`))
  status.appendChild(li)
})
socket.on('reconnect_failed', () => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode('reconnect_failed'))
  status.appendChild(li)
})
socket.on('reconnect', () => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode('reconnected'))
  status.appendChild(li)
})