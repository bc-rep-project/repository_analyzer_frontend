import { useState, useEffect } from 'react'
import styles from './styles/Dashboard.module.css'

export default function Dashboard() {
  const [notifications, setNotifications] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = new WebSocket(import.meta.env.VITE_WS_URL)
    
    newSocket.onopen = () => {
      console.log('WebSocket connected')
      setSocket(newSocket)
    }

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setNotifications(prev => [data, ...prev.slice(0, 9)])
    }

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => newSocket.close()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Real-Time Dashboard</h1>
      <div className={styles.notifications}>
        <h2>Notifications</h2>
        <div className={styles.list}>
          {notifications.map((notification, index) => (
            <div key={index} className={styles.item}>
              {notification.message}
            </div>
          ))}
          {notifications.length === 0 && (
            <div className={styles.empty}>No notifications</div>
          )}
        </div>
      </div>
    </div>
  )
}