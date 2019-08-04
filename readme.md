# Pusher Chatroom

> demonstrates creating a real-time chatroom using [Pusher](https://pusher.com) and [Next.js](https://nextjs.org)

## Features

- Joining with just a display name
- Creation/joining/leaving of Chatrooms
- Sending text/links/images/code blocks
- Muting specific users

## Libraries used

- [pusher-js](https://github.com/pusher/pusher-js)
- [Next.js](https://github.com/zeit/next.js)
- [Spectre.css](https://github.com/picturepan2/spectre)

## Getting Started

1. Clone this repo `git clone https://github.com/ijjk/pusher-chatroom.git`
2. Install dependencies `cd pusher-chatroom && yarn`
3. Start development server `yarn dev`

## Deploying

1. Install `now` if not already installed `npm i -g now@latest`
2. Login if not already
3. Change to project directory and run `now`

## Potential improvements

- Add bad-word filtering with an API endpoint
- Send messages through API to prevent spam
