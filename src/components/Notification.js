import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    if (notification.length === 0) {
        return ''
    }
    const message = notification[0].message
    const type = notification[0].type

    if (type === 'error') {
        return <div className="error">{message}</div>
    }

    if (type === 'success') {
        return <div className="success">{message}</div>
    }

    return <div className="error">{message}</div>
}

export default Notification
