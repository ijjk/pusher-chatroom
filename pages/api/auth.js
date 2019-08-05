import Pusher from 'pusher'

const pusher = new Pusher({
  key: process.env.PUSHER_KEY,
  appId: process.env.PUSHER_APP_ID,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu',
})

export default (req, res) => {
  const { socket_id, channel_name } = req.body
  res.send(pusher.authenticate(socket_id, channel_name))
}
