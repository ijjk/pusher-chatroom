import React from 'react'
import { ChatContext } from '../lib/chat-context'

const maxLength = 20
const minLength = 2

export default () => {
  const { updateCtx } = React.useContext(ChatContext)
  const [user, setUser] = React.useState(null)

  const handleChange = e => {
    setUser(e.target.value.trim())
  }
  let error = null

  // we don't want to show an error initially
  if (user !== null) {
    if (user.length < minLength)
      error = 'Username must be at least 2 characters'
    if (user.length > maxLength)
      error = 'Username must be less than 32 characters'
    // Just an example could contain spaces if wanted
    if (user.includes(' ')) error = 'Username must not contain spaces'
  }
  const submit = () => updateCtx({ user })
  const checkSubmit = e => {
    if (e.which === 13 && !error) {
      submit()
    }
  }

  return (
    <div className="modal active" id="modal-id">
      <div className="modal-overlay" />
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title h5">Choose a username</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <div className={`form-group${error ? ' has-error' : ''}`}>
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                autoFocus
                type="text"
                id="username"
                value={user || ''}
                minLength={minLength}
                maxLength={maxLength}
                className="form-input"
                placeholder="Username"
                onChange={handleChange}
                onKeyDown={checkSubmit}
              />
              {error && <p className="form-input-hint">{error}</p>}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
