import React from 'react'
import { ChatContext } from '../lib/chat-context'

export default () => {
  const {
    user,
    channels,
    curChannel,
    updateCtx,
    resetCtx,
    joinChannel,
    channelNames,
    removeChannel,
  } = React.useContext(ChatContext)

  const selectChannel = curChannel => {
    updateCtx({ curChannel })
  }
  const checkJoin = () => {
    const el = document.querySelector('#join-channel')
    let val = (el.value || '').trim().toLowerCase()
    if (!val) return
    el.value = ''
    val = val.replace(/ /g, '-')

    if (!channels[val]) {
      joinChannel(val)
    }
  }
  const checkEnter = e => {
    if (e.which === 13) checkJoin()
  }

  // Auto-join general channel when username is set
  React.useEffect(() => {
    if (user && !channels.general) {
      joinChannel('general')
    }
  }, [user])

  return (
    <>
      <div className="join-group">
        <input
          type="text"
          id="join-channel"
          minLength={4}
          maxLength={32}
          className="col-auto"
          onKeyDown={checkEnter}
          placeholder="Channel to join"
        />
        <button className="btn join-btn" onClick={checkJoin}>
          <i className="icon icon-plus" />
          Join
        </button>
      </div>

      <div className="channels-list">
        {channelNames.length === 0 ? (
          <h6 className="none-joined">You haven't joined any channels yet</h6>
        ) : (
          channelNames.map(name => {
            const channel = channels[name]
            const lastMessage =
              channel && channel.messages[channel.messages.length - 1]

            return (
              <div
                className={`channel${curChannel === name ? ' active' : ''}`}
                key={name}
              >
                <i
                  className="icon icon-cross"
                  title="Click to remove channel"
                  onClick={() => removeChannel(name)}
                />
                <h5
                  onClick={() => selectChannel(name)}
                  title="Click to select channel"
                >
                  {name}
                </h5>
                <span>
                  Last message:{' '}
                  {lastMessage
                    ? new Date(lastMessage.sent).toLocaleString()
                    : 'N/A'}
                </span>
              </div>
            )
          })
        )}
      </div>

      <div className="user-status">
        <i className="icon icon-2x icon-people" />
        <span>{user}</span>
        <button className="btn" onClick={resetCtx}>
          <i className="icon icon-shutdown" />
          Leave
        </button>
      </div>

      <style jsx>{`
        .none-joined {
          text-align: center;
          padding: 10px 5px;
        }

        .join-group {
          display: flex;
          padding: 0 1px;
          flex-direction: row;
        }
        .join-group input {
          flex-grow: 1;
        }
        .join-btn i {
          margin-right: 5px;
        }

        .channels-list {
          height: calc(100vh - 40px - 100px);
          overflow-x: hidden;
          overflow-y: scroll;
        }

        .channel {
          padding: 5px;
          position: relative;
          border-bottom: 1px solid #3b4351;
        }

        .channel.active {
          background: #e8e8e8;
        }

        .channel h5 {
          cursor: pointer;
          margin-bottom: 5px;
        }

        .channel i {
          top: 5px;
          right: 3px;
          position: absolute;
          cursor: pointer;
        }

        .user-status {
          padding: 5px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        }
        .user-status i {
          margin-right: 8px;
        }
        .user-status span {
          font-weight: 600;
          font-size: 18px;
        }
        .user-status button {
          margin-left: auto;
        }
      `}</style>
    </>
  )
}
