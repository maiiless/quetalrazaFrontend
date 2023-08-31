import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Client.scss';
import {useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';
import '../styles/index.css';

const CreateAppointment = () => {
    const {id} = useParams();

    //Listar servicio
    const [service, setService] = useState([])
    useEffect(()=>{
        axios.get('/ListVetService')
        .then(res => setService(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])

    //Mostrar nombre mascota
    useEffect(() => {
        axios.get('/ReadPet/'+id)
        .then(res => {
            console.log(Array.from(res.data))
            setName({...value,
                idPet: Array.from(res.data)[0],
                namePet:Array.from(res.data)[2]});
        }).catch(err => console.log(err))
    }, [])

    const [value, setName] = useState({
        idPet: '',
        namePet: ''
    })

    //Crear cita
    const [values, setValues] = useState({
        idPet:id,
        service: '',
        dateAppo: '',
        timeAppo: '',
        comment: '',
        status: '1'
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/CreateAppo',values)
        .then(res => {
            swal({
                text: "Cita reservada",
                icon: "success",
              });
              setTimeout(function(){
                navigate('/ListAppo');
            }, 3000);
            
        })
        .catch(err => console.log(err))
    }

return(
<>
<Header />
 <div className="client">
            <div className="form-container">
            <h1 className="title">Reservar cita</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>
                <div> 
                <label for="name" className="label">Mascota</label>
                <input type="text" id="namePet" className="input input-text" value={value.namepet}/>
                
                <label for="name" className="label">Fecha</label>
                <input type="date" id="dateAppo" className="input input-text" onChange={e => setValues({...values,dateAppo: e.target.value})}/>
                
                <label for="name" className="label">Hora</label>
                <input type="time" id="timeAppo" className="input input-text" onChange={e => setValues({...values,timeAppo: e.target.value})}/>

                <label for="service" className="label">Servicio</label>
                <select id="service" name="service" className="input" onChange={e => setValues({...values,service: e.target.value})}>
                    <option selected>Seleccionar</option>
                    {service.map((gen,index) => {
                        return <option value={gen.idvetservices}>{gen.namevetservices}</option>
                    })}    
                </select>

                <label for="name" className="label">Comentarios generales</label>
                <input type="text" id="comment" className="input input-text" onChange={e => setValues({...values,comment: e.target.value})}/>
                
                <input type="submit" value="Reservar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>

                </div>

            </form>
            </div>
        </div>
    </>
)
}


export default CreateAppointment