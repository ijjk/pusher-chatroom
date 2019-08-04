import App, { Container } from 'next/app'
import { ChatContext } from '../lib/chat-context'
import styles from 'spectre.css/dist/spectre.min.css'
import icons from 'spectre.css/dist/spectre-icons.min.css'

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', e => {
    e.returnValue = 'Are you sure you want to leave? You will lose your state'
  })
}

export default class MyApp extends App {
  constructor() {
    super()

    // Expose MyApp's state as context for simplicity (sub-optimal)
    this.state = {
      user: null,
      channels: {},
      channelNames: [],
      curChannel: null,
      updateCtx: (newValues = {}) => {
        this.setState({
          ...this.state,
          ...newValues,
        })
      },
      resetCtx: () => {
        this.setState({
          ...this.state,
          user: null,
          channels: {},
          curChannel: null,
        })
      },
      removeChannel: name => {
        // TODO: also un-bind any events for the removed channel
        const newChannels = { ...this.state.channels }
        const newChannelNames = this.state.channelNames.filter(n => n !== name)
        delete newChannels[name]

        let curChannel = this.state.curChannel
        if (curChannel === name) curChannel = newChannelNames[0]
        this.state.updateCtx({
          curChannel,
          channels: newChannels,
          channelNames: newChannelNames,
        })
      },
      joinChannel: name => {
        // TODO: listen to events for newly joined channel
        this.state.updateCtx({
          curChannel: name,
          channels: { ...this.state.channels, [name]: [] },
          channelNames: [...this.state.channelNames, name],
        })
      },
      sendMessage: text => {
        // TODO: emit event for current channel sending message to others
        const { channels, curChannel } = this.state
        const channel = channels[curChannel]
        const message = {
          text,
          user: this.state.user,
          sent: new Date().getTime(),
        }
        channel.push(message)
        this.setState({ channels })
      },
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <ChatContext.Provider value={this.state}>
          <Component {...pageProps} />
        </ChatContext.Provider>

        <style jsx global>{`
          html {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            padding: 5px 0;
          }
        `}</style>
        <style jsx global>
          {styles}
        </style>
        <style jsx global>
          {icons}
        </style>
      </Container>
    )
  }
}
