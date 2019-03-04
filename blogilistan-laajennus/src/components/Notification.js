import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Notification = (props) => {

  if (props.notMessage === undefined || props.notMessage === null || props.notMessage === '') {
    return null
  } else {
    console.log('Notmessage', props.notMessage)
    if (props.notClass === 'error') {
      return (
        <div className="error">{props.notMessage}</div>
      )
    } else {
      return (
        <div className="success">{props.notMessage}</div>
      )
    }
  }

}

Notification.propTypes = {
  notMessage: PropTypes.string,
  notClass: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    notMessage: state.notification.notMessage,
    notClass: state.notification.notClass
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)