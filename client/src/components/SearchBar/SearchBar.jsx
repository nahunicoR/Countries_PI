import React,{useState} from 'react';
import { searchCountries } from '../../action';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const[name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchCountries(name));
        setName('');
    }


  return (
    <header className={styles.header}>
        <div className={styles.input}>
            <input className={styles.look} type="text" placeholder='Buscar...' onChange={handleInputChange} />
            <button className={styles.btnSearch}type='submit' onClick={(e)=> handleSubmit(e)}>Buscar</button>        
        </div>
        <div>
            <Link to='/home'>
                <img src="https://fontmeme.com/permalink/221116/0b59ffcc7d1638c3d6cf902592e2a36e.png" alt="pirates-of-the-caribbean-font" border="0"/>            
            </Link>
        </div>
        <div className={styles.btnCreate}>
            <Link to='/activities'>
                <button className={styles.btnCreate}>Crear Actividad</button>
            </Link>
        </div>
    </header>
  )
}
