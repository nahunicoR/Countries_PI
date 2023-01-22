import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({countriesPerPage,countries,pagination}) {
    const pageNumber = [];

    for(let i=1; i<=Math.ceil(countries/countriesPerPage); i++){
        pageNumber.push(i);
    }

  return (
        <nav className={styles.pageNumbers}>
            <ul className={styles.paginado}>
                {
                    pageNumber && pageNumber.map(number =>{
                       return <li key={number} className={styles.numbers}>
                            <a href onClick={()=> pagination(number)} className={styles.number}>{number}</a>
                        </li>
                    })
                }
            </ul>
        </nav>
  )
}
