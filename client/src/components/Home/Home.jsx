import React, {useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllCountries } from '../../action';
import { filterByContinent,sortByName,sortByPopulation,getActivities,filterByActivity} from '../../action';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import styles from './Home.module.css';


export default function Home() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const allActivities = useSelector((state)=> state.activities);

    const activities = [];
    allActivities.map(
        a => !activities.includes(a.name) && activities.push(a.name)
    );
    const current = useSelector((state) => state.currentPage)

    useEffect(()=> {
        dispatch(getAllCountries())
        dispatch(getActivities())
        setCurrentPage(1)
    },[dispatch]);

    const [currentPage,setCurrentPage] = useState(current);
    const [countriesPerPage] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry,indexOfLastCountry);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    function handlerContinents(e){
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
 
    }

    function handlerSortName(e){
        dispatch(sortByName(e.target.value));
        setCurrentPage(1)

    }

    function handlerSortPopulation(e){
        dispatch(sortByPopulation(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterActivity(e) {
        dispatch(filterByActivity(e.target.value))
        setCurrentPage(1);    
    }

  return (
    <div  className={styles.full}>
        <div className={styles.containerFilters}>
        <select onChange={handlerSortName} className={styles.select}>
            <option className={styles.option} disabled>Orden por Nombre</option>
            <option value="asc" className={styles.option}>A-Z</option>
            <option value="desc" className={styles.option}>Z-A</option>
        </select>
        <select onChange={handlerContinents}className={styles.select}>
            <option value="All" className={styles.option} disabled>Orden por Continente</option>
            <option value="Antarctic" className={styles.option}>Antarctic</option>
            <option value="Americas" className={styles.option}>Americas</option>
            <option value="Asia" className={styles.option}>Asia</option>
            <option value="Africa" className={styles.option}>Africa</option>
            <option value="Europe" className={styles.option}>Europe</option>
            <option value="Oceania" className={styles.option}>Oceania</option>
        </select>          
        <select onChange={handlerSortPopulation}className={styles.select}>
            <option className={styles.option} disabled>Orden por Poblacíon</option>
            <option value="asc" className={styles.option}>Mayor Población</option>
            <option value="desc" className={styles.option}>Menor Población</option>
        </select>
        <select onChange={handleFilterActivity}name=""className={styles.select}>
            <option value="All" disabled>Actividades</option>
            {activities && activities.map((activity) => (
             <option key={activity} value={activity}>{activity}</option>
            ))}
        </select>
    </div>
        <div className={styles.contenedor}>
            <div className={styles.cartas}>
                {
                    currentCountries && currentCountries.map((c) =>{
                        return <Card key={c.id} id={c.id} name={c.name} flag={c.flag} continent={c.continent}/>

                    })
                }
            </div>
        </div>
            <Pagination countriesPerPage={countriesPerPage} countries={countries.length} pagination={pagination}/>
    </div>
  )
}
