import React from 'react'
import styles from './Card.module.css';
import {Link} from 'react-router-dom';


export default function Card({id,name,flag,continent}) {

  return (
    <div className={styles.card}>
        <div className={styles.description}>
            <h3 className={styles.name}>{name}</h3>
            <h5 className={styles.continent}>{continent}</h5>
        </div>
        <div className={styles.containerFlag}>
            <img className={styles.img} src={flag} alt="BanderaPais" />
        </div>
        <div>
          <Link to={'/home/'+ id}>
            <button className={styles.btnDetails}>Detalle</button>
          </Link>
        </div>
    </div>
  )
}
