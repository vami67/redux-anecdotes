import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = useSelector(state => state.notification)

  if (notification) {
    setTimeout(() => dispatch(setNotification('')), 5000)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return <div></div>


}

export default Notification