import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    if (notification.length === 0) {
        return ''
    }
    const message = notification[0].message
    const type = notification[0].type

    if (type === 'error') {
        console.log('ssss')
        return <Alert variant="error">{message}</Alert>
    }

    if (type === 'success') {
        return <Alert variant="success">{message}</Alert>
    }

    return <Alert variant="error">{message}</Alert>
}

export default Notification
