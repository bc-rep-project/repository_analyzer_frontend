import { useState, useEffect } from 'react'
import styles from './styles/Home.module.css'
import { userService } from '../../services/api'

export default function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers()
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUsers()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Welcome to Our App</h1>
      {loading ? (
        <div className={styles.loading}>Loading users...</div>
      ) : (
        <div className={styles.userList}>
          {users.map(user => (
            <div key={user._id} className={styles.userCard}>
              <h3>{user.username}</h3>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}