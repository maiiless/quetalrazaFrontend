import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/List.scss';
import swal from 'sweetalert';
// import citas from '@icons/kyc.png';



const ListCare = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('/ListCare')
        .then(res => setData(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])

    return(
        <>
            <Header />
            <div className="list-content">
            <div><h3>Atenciones</h3></div>
            <div className="encabezado">
                {/* <div className="imagen"><img src={citas} /></div> */}
            <div>
                <input class="input-inset" type="text" placeholder="Buscar"/>
            </div>
            </div>
            
            <div className="list-content">
           <table className="styled-table">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Fecha de Atención</th>
                    <th>Cliente </th>
                    <th>Mascota</th>
                    <th>Especie</th>
                    <th>Servicio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((appo,index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{appo.dateappointment} </td>
                        <td>{appo.nameowner} {appo.surnameowner}</td>
                        <td>{appo.namepet}</td>
                        <td>{appo.namespeciepet}</td>
                        <td>{appo.namevetservices}</td>
                        <td>
                            <Link to='' className="button pet-button">Ver Atención</Link>
                            <Link to='' className="button edit-button">Editar</Link>
                        </td>
                    </tr>
                })}
            </tbody>
           </table>
           </div>
        </div>
            </>  
    );
}

export default ListCare;