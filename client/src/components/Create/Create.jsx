import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {postActivity,getAllCountries, getActivities} from '../../action/index';
import { useDispatch,useSelector } from 'react-redux';
import styles from './Create.module.css';


export default function Create() {
    const dispatch = useDispatch();
    const acts = useSelector((state)=> state.activities);
    const countries = useSelector((state)=> state.countries).sort((a, b) => {
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    });
    const[errors,setErrors]= useState({});

    function validate(data){
        let errors = {};
    
        if(!data.name){
            errors.name = 'El nombre es obligatorio';
        } else if (!/^(?!.*[ ]{2})[a-zA-Z0-9._\s-#!~@%^()]+$/g.test(data.name)) {
            errors.name = 'Nombre inválido: Debería tener letras y/o numeros.';
        }
        if (!data.difficulty) {
            errors.difficulty = 'Selecciona la dificultad por favor.';
        } else if (parseInt(data.difficulty) > 5 || parseInt(data.difficulty) < 1) {
            errors.name = 'Dificultad inválid: Debería ser un numero de: 1 a 5.';
        }
        if (!data.duration) {
            errors.duration = 'Por favor pon la duración, debe ser formato 24hs.';
        } else if (parseInt(data.duration) < 0 || parseInt(data.duration) > 24) {
            errors.duration = 'Duración inválida: Debería ser de 1h a 24hs. ';
        }
        if (!data.season) {
            errors.season = 'Por favor selecciona una Temporada.';
        } else if (!["Verano", "Otoño", "Invierno", "Primavera"].includes(data.season)) {
            errors.season = 'Temporada inválida: Debería ser "Verano", "Otoño", "Invierno" o "Primavera".';
        }
        if (!data.countries.length) {
            errors.countries = 'Por favor, selecciona al menos un país.';
        }
        setErrors(errors)
        return errors;
    
    }
    
    const [data,setData] = useState({
        name:'',
        difficulty:'',
        duration:'',
        season:'',
        countries:[]
    });

    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getActivities())
    }, [dispatch])

    function handleChange(e){
        const {name,value} = e.target;
        setData({...data,
            [name]:value });

        setErrors(validate({
            ...data,
            [name]:value}));
        console.log(data);
    }

    function handleSelect(e){
        setData({
            ...data,
            countries:[...data.countries,e.target.value]
        })
    }

    function handleDelete(e){
        setData({
            ...data,
            countries: data.countries.filter(c => c !== e)
        });
    }

    function handleSubmit(e){
        if (data.countries.length <= 0 || !data.name || !data.difficulty || !data.duration || !data.season){
            e.preventDefault();
            alert('Por favor completar todos los campos antes de enviar.')

        }else if(acts.includes(data.name)){
            alert('Esta actividad ya esta creada.')
        }else{
            e.preventDefault();
          console.log(data);
          dispatch(postActivity(data))
          setData({
              name:'',
          difficulty:'',
          duration:'',
          season:'',
          countries:[]
          });
        }     
    }


  return (
    <div className={styles.fullDiv}>
       <img src="https://fontmeme.com/permalink/221116/f503f78c0fe38f9cee19655e2be188d2.png" alt="pirates-of-the-caribbean-font" border="0"/>
        <form onSubmit={(e)=>handleSubmit(e)} className={styles.form}>
            <div className={styles.nameContainer}>
                <label className={styles.labelName}>Nombre:</label>
                    <input className={styles.textInput} type="text" placeholder='Nombre' value={data.name} name='name'onChange={handleChange}/>
                {
                    errors.name && (<p className={styles.errors}>{errors.name}</p>)
                }
            </div>
            <div className={styles.nameContainer}>
                <label className={styles.labelName}>Dificultad: </label>
                    <div className={styles.radioDiv}>
                        <label className={styles.labelName}>
                            <input className={styles.radio} type="radio" value='1' name='difficulty'onChange={handleChange}/> 1
                        </label>
                        <label className={styles.labelName}>
                            <input className={styles.radio} type="radio" value='2' name='difficulty'onChange={handleChange}/> 2
                        </label>
                        <label className={styles.labelName}>
                            <input className={styles.radio} type="radio" value='3' name='difficulty'onChange={handleChange}/> 3
                        </label>
                        <label className={styles.labelName}>
                            <input className={styles.radio} type="radio" value='4' name='difficulty'onChange={handleChange}/> 4
                        </label>
                        <label className={styles.labelName}>
                            <input className={styles.radio} type="radio" value='5' name='difficulty'onChange={handleChange}/> 5
                        </label>
                    </div>
            </div>
            <div className={styles.nameContainer}>
                <label className={styles.labelName}>Duración: </label>
                    <input className={styles.textInput} type="text" placeholder='Duración' value={data.duration} name='duration'onChange={handleChange}/>
                {
                    errors.name && (<p className={styles.errors}>{errors.duration}</p>)
                }
            </div>
            <div className={styles.nameContainer}>
                <label className={styles.labelName}>Estación: </label>
                    <div className={styles.radioDiv}>
                        <label className={styles.labelName}>
                            <input className={styles.radio} type="radio" value='Primavera' name='season'onChange={handleChange}/> Primavera
                        </label>
                        <label className={styles.labelName}>
                            <input className={styles.radio} type="radio" value='Verano' name='season'onChange={handleChange}/> Verano
                        </label>
                        <label className={styles.labelName}>
                            <input className={styles.radio}t type="radio" value='Invierno' name='season'onChange={handleChange}/> Invierno
                        </label>
                        <label className={styles.labelName}>
                            <input className={styles.radio} type="radio" value='Otoño' name='season'onChange={handleChange}/> Otoño
                        </label>
                    </div>  
            </div>
            <div className={styles.nameContainer}>
                <label className={styles.labelName}>Países: </label>
                    <select onChange={(e)=>handleSelect(e)} className={styles.selectForm}>
                        <option className={styles.option} disabled>Select country</option>
                        {countries.map(c => (
                            <option className={styles.option} value={c.name} name="countries" key={c.name} onChange={handleChange}>{c.name}</option>
                        ))}
                    </select>
            </div>
            <div className={styles.btnsContainer}>
                <div className={styles.LoadContainer}>
                    <button className={styles.btnSubmit} type='submit'>Cargar Datos</button>
                </div>
                <div className={styles.backContainer}>
                    <Link to='/home'><button className={styles.btnBack}>Volver al Home</button></Link>
                </div>

            </div>
            
        </form>
             <div className={styles.division}>
        {
                data.countries.map(e => {
                    
                return  <div className={styles.miniCard}>
                            <div className={styles.containerCountry}>
                            <p className={styles.nameCountry}>{e}</p>
                            <button className={styles.btnDelete} onClick={()=>handleDelete(e)}>x</button>
                            </div>
                        </div>
                })
            }
                </div>               
    </div>
  )
}
