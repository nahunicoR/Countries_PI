import React from 'react'
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams, Link} from 'react-router-dom';
import {getCountryById} from '../../action/index';
import styles from './Details.module.css';




export default function Details() {
    
    let {id} = useParams();
    
    const dispatch = useDispatch();
    const countryId = useSelector(state => state.countryDetail)
    console.log(countryId)
    
    useEffect(() => {
      dispatch(getCountryById(id));
    },[dispatch,id])

 
 return (
   <div className={styles.generalDetails}>
    {  !countryId.name? 
    <div >
    <p className={styles.loadingTextDetails}>Cargando Detalle...</p>
   </div> :
      <div className={styles.detailCardContainer}>
        <div id={styles.blueNav}></div>
          <div className={styles.detailUpperSection}> 
            <div className={styles.imagedetailContainer}>
              <img src={countryId.flag} alt='Img not found'/>
           </div>
             <h1 className={styles.name}>{countryId.name}</h1>
         </div>
        <div className={styles.detailMediumSection}>
          <div className={styles.generalDetailCardData}> 
             <h1>Información de País</h1>
               <div className={styles.detailCardData}>
                  <div className={styles.detailDataHeaders}>
                    <h4> I.D:</h4> 
                    <h4>Capital:</h4>
                    <h4>Continente: </h4>
                    <h4>Subregion: </h4>
                    <h4>Población:</h4>
                    <h4>Área:</h4>
                  </div>
                  <div className={styles.detailDataInfo}>
                    <h4>{countryId.id}</h4>
                    <h4>{countryId.capital}</h4>
                    <h4> {countryId.continent}</h4>
                    <h4> {countryId.subregion}</h4>
                    <h4>  {countryId.population}</h4>
                    <h4>  {countryId.area} Km²</h4>
                  </div>
                </div>
            </div>
             <div className={styles.activitiesDetailCard}>
                <h1>Actividades:</h1>
                <div className={styles.activitiesMapSection}>
                     {countryId.activities.map((c) => 
                        <div key={c.name} className={styles.detailActivityGeneral}>
                            <h3>{c.name}</h3>
                          <div className={styles.detailActivityContainer}>
                            <div className={styles.detailActivityHeader}> 
                                <h4>Duración:</h4>
                                <h4>Dificultad:</h4>
                                <h4>Temporada:</h4>
                            </div>
                            <div className={styles.detailActivityInfo}>
                                <p> {c.duration +''} Dias</p>
                                <p> Nivel  {''+ c.difficulty}</p>
                                <p> {c.season} </p>
                           </div>
                          </div>
                       </div>
                                )}
                      </div>
                     </div>
                    </div> 
                    <div className={styles.detailsBackButtonDiv}>
                       <Link to={'/home'}> <button className={styles.detailsBackButton}> volver </button></Link>
                    </div>
                  </div>
                     } 
                 </div>
    )
}