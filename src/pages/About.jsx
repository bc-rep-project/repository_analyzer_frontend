import styles from './styles/About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <h1>About Us</h1>
      <div className={styles.content}>
        <p>We are a passionate team dedicated to building innovative web applications.</p>
        <div className={styles.features}>
          <h2>Our Features</h2>
          <ul>
            <li>Real-time updates</li>
            <li>Secure authentication</li>
            <li>Responsive design</li>
            <li>Modern UI/UX</li>
          </ul>
        </div>
      </div>
    </div>
  );
}