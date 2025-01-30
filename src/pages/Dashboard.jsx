import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import styles from './styles/Dashboard.module.css';

export default function Dashboard() {
  const { userId } = useParams();
  const [visualization, setVisualization] = useState(null);

  useEffect(() => {
    const fetchVisualization = async () => {
      try {
        const response = await api.get(`/visualize/${userId}`);
        setVisualization(response.data);
      } catch (err) {
        console.error('Error fetching visualization:', err);
      }
    };
    
    if (userId) fetchVisualization();
  }, [userId]);

  return (
    <div className={styles.container}>
      {visualization ? (
        <div className={styles.visualization}>
          <h2>Repository Structure for {visualization.user}</h2>
          <pre>{JSON.stringify(visualization.structure, null, 2)}</pre>
        </div>
      ) : (
        <div className={styles.loading}>Loading visualization...</div>
      )}
    </div>
  );
}