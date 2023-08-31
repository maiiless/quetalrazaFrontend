import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/List.scss';
import swal from 'sweetalert';
import DemoApp from '../components/DemoApp.jsx';
// import citas from '@icons/kyc.png';

const ListAppo = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const showSteps = () => {
        swal({
            title: "Pasos para reserva de cita",
            text: "1. Registrar cliente / 2. Ir a mascotas / 3. Registrar mascota / 4. Reservar cita",
            icon: "info",
          });
          setTimeout(function(){
            navigate('/ListAppo');
        }, 3000);
    }

    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('/ListAppoAll')
        .then(res => setData(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('/DeleteAppo/'+id)
        .then(res=> {
            swal({
                text: "Eliminando registro",
                icon: "warning",
              });
              setTimeout(function(){
                location.reload();
            }, 3000);
        }).catch(err => console.log(err))
    }

    
    return(
        <>
            <Header />
            <div className="calendar-appo">
                <div className="calendar-div">
                <DemoApp />
                </div>
                <div className="list-div">

                <div className="list-content">
            <div><h3>Citas</h3></div>
            <div className="encabezado">
                {/* <div className="imagen"><img src={citas} /></div> */}
            <div>
                <input class="input-inset" type="text" placeholder="Buscar"/>
                <a className="button create-button" onClick={showSteps}>Nueva Cita</a>
            </div>
            </div>
            
            <div className="list-content">
           <table className="styled-table">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Cliente</th>
                    <th>Contacto</th>
                    <th>Mascota</th>
                    <th>Especie</th>
                    <th>Género mascota</th>
                    <th>Fecha Cita</th>
                    <th>Hora Cita</th>
                    <th>Motivo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((appo,index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{appo.nameowner} {appo.surnameowner}</td>
                        <td>{appo.phoneowner}</td>
                        <td>{appo.namepet}</td>
                        <td>{appo.namespeciepet}</td>
                        <td>{appo.namegenderpet}</td>
                        <td>{appo.dateappointment}</td>
                        <td>{appo.timeappointment}</td>
                        <td>{appo.namevetservices}</td>
                        <td>
                            <Link to={`/CreateCare/${appo.idappointment}`} className="button pet-button">Registrar</Link>
                            <Link to={`/EditAppo/${appo.idappointment}`} className="button edit-button">Editar</Link>
                            
                        </td>
                    </tr>
                })}
            </tbody>
           </table>
           </div>
        </div>
                </div>
            </div>
            
            </>  
    );
}

export default ListAppo;