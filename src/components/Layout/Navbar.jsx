import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>App Logo</Link>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  )
}