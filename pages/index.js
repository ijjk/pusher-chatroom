import React from 'react'
import { ChatContext } from '../lib/chat-context'
import UserModal from '../components/user-modal'
import Channels from '../components/channels'
import Chat from '../components/chat'

const ExtLink = ({ children, ...props }) => (
  <a rel="noreferrer noopener" target="_blank" {...props}>
    {children}
  </a>
)

export default function Index() {
  const { user } = React.useContext(ChatContext)

  return (
    <>
      <h2>
        <ExtLink href="https://pusher.com">Pusher</ExtLink>/
        <ExtLink href="https://nextjs.org">Next.js</ExtLink> Chat
        <i className="icon icon-message" />
      </h2>
      <hr />

      {!user && <UserModal />}

      <div className="columns col-gapless">
        <div className="column col-3 channels">
          <Channels />
        </div>

        <div className="column col-9 chat">
          <Chat />
        </div>
      </div>

      <style jsx>{`
        h2 {
          text-align: center;
        }

        h2 i {
          font-size: 24px;
          margin-left: 10px;
        }

        hr {
          margin-bottom: 0;
        }

        .channels,
        .chat {
          height: calc(100vh - 40px);
          overflow-x: hidden;
          overflow-y: scroll;
        }

        .channels {
          border-right: 1px solid #3b4351;
        }
      `}</style>
    </>
  )
}
