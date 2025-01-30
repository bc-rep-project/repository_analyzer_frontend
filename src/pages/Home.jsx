import { useState } from 'react';
import { userService } from '../services/api';
import styles from './styles/Home.module.css';

export default function Home() {
  const [githubUrl, setGithubUrl] = useState('');
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.createUser({
        username: `user_${Date.now()}`, // Generate temp username
        email: `temp_${Date.now()}@example.com`, // Temp email
        githubUrl
      });
      setUserId(response.data._id);
    } catch (err) {
      console.error('Error saving GitHub URL:', err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.urlForm}>
        <input
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="Enter GitHub repository URL"
          required
          pattern="https?://github.com/.*"
        />
        <button type="submit">Analyze Repository</button>
      </form>
      
      {userId && (
        <div className={styles.visualizationLink}>
          <a href={`/dashboard/${userId}`}>View Visualization</a>
        </div>
      )}
    </div>
  );
}


// import { useState, useEffect } from 'react'
// import styles from './styles/Home.module.css'
// import { userService } from "../services/api";

// export default function Home() {
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await userService.getUsers()
//         setUsers(response.data)
//       } catch (error) {
//         console.error('Error fetching users:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     fetchUsers()
//   }, [])

//   return (
//     <div className={styles.container}>
//       <h1>Welcome to Our App</h1>
//       {loading ? (
//         <div className={styles.loading}>Loading users...</div>
//       ) : (
//         <div className={styles.userList}>
//           {users.map(user => (
//             <div key={user._id} className={styles.userCard}>
//               <h3>{user.username}</h3>
//               <p>{user.email}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }