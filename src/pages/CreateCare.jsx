import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Care.scss';
import {useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';

const CreateCare = () => {

    const {id} = useParams();

    //Listar datos de mascota
    const [dataPet, setDataPet] = useState([])
    useEffect(()=>{
        axios.get('/ListDataPet/'+id)
        .then(res => setDataPet(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])

    //Listar simtomas
    const [sym, setSym] = useState([])
    useEffect(()=>{
        axios.get('/ListSymptoms')
        .then(res => setSym(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])    

    //Listar diagnosticos
    const [diag, setDiag] = useState([])
    useEffect(()=>{
        axios.get('/ListDiagnosis')
        .then(res => setDiag(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])  

    //Crear cita
    const [values, setValues] = useState({
        id:id,
        anamnesis: '',
        weight: '',
        temperature: '',
        treatment: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/CreateCare/'+id,values)
        .then(res => {
            swal({
                text: "Atención médica registrada",
                icon: "success",
              });
              setTimeout(function(){
                navigate('/ListCare');
            }, 3000);
            
        })
        .catch(err => console.log(err))
    }

return(
<>
<Header />
    <div className="client">
            
            <h1 className="title">Registrar Atención Médica</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>
                <div>{dataPet.map((pet,index) => {
                            return <span>Nombre mascota: {pet.namePet} <br/>Especie: {pet.nameSpeciePet}</span>

                    })} </div>
                <div className="form-container-2">

                <label for="anamnesis" className="label">Anamnesis</label><br/>
                <label className="container-check"><input type="checkbox" id="sintomas" className="input input-name" /> ¿Ha tenido algún problema de salud que necesitara tratamiento?<span className="checkmark"></span></label>
                <label className="container-check"><input type="checkbox" id="sintomas" className="input input-name" /> ¿Está al día con las vacunas? <span className="checkmark"></span></label>
                <label className="container-check"><input type="checkbox" id="sintomas" className="input input-name" /> ¿Cuándo se realizó la última desparasitación? <span className="checkmark"></span></label>
                <label className="container-check"><input type="checkbox" id="sintomas" className="input input-name" /> ¿Tomo actualmente alguna medicación? <span className="checkmark"></span></label>
                <label className="container-check"><input type="checkbox" id="sintomas" className="input input-name" /> ¿Cómo es la alimentación de tu mascota? <span className="checkmark"></span></label>
                <label className="container-check"><input type="checkbox" id="sintomas" className="input input-name" /> ¿Qué hábitos tiene tu mascota? <span className="checkmark"></span></label>
                <br/>
                <label for="anamnesis" className="label">Observaciones</label>
                <textarea className="textarea" rows="3" id="anamnesis" onChange={e => setValues({...values,anamnesis: e.target.value})}></textarea>

                    <table>
                        <tr>
                            <td>
                            <label for="temperature" className="label">Temperatura (c°)</label>
                            <input type="number" id="temperature" className="input input-text" onChange={e => setValues({...values,temperature: e.target.value})}/>
                            

                            </td>
                            <td>
                            <label for="weight" className="label">Peso (kg)</label>
                            <input type="number" id="weight" className="input input-text" onChange={e => setValues({...values,weight: e.target.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label for="sintomas" className="label">Síntomas</label>
                            {sym.map((s,index) => {
                                    return <div><label className="container-check"><input type="checkbox" id="sintomas" className="input input-name" value={s.idsymptomspet} onChange={e => setValues({...values,services: e.target.value})}/>{s.namesymptomspet}<span className="checkmark"></span></label></div>
                            })}
                            </td>
                            <td>
                            <label for="diagnostico" className="label">Diagnóstico</label>
                            {diag.map((d,index) => {
                                    return <label className="container-check"><input type="checkbox" id="diagnostico" className="input input-name" value={d.iddiagnosispet} onChange={e => setValues({...values,services: e.target.value})}/>{d.namediagnosispet}<span className="checkmark"></span></label>
                            })}
                            </td>
                        </tr>
                    </table>
                    <br/>
                    <label for="treatment" className="label">Tratamiento</label>
                            <textarea className="textarea" rows="3" id="treatment" onChange={e => setValues({...values,treatment: e.target.value})}></textarea>
                
                         
                </div>
                <div className="care">
                    <input type="submit" value="Registrar" className="primary-button"/> 
                    <input type="button" value="Descartar" className="secondary-button"/>
                </div>
                

            </form>
        </div>
    </>
)
}


export default CreateCare