import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/List.scss';
import swal from 'sweetalert';
// import mascotas from '@icons/mascotas.png';

const ListAllPet = () => {

    const {id} = useParams();

    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('/ListAllPet')
        .then(res => setData(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('/DeletePet/'+id)
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
            <div className="list-content">
            <div><h3>Mascotas</h3></div>
            <div className="encabezado">
            {/* <div className="imagen"><img src={mascotas} /></div> */}
            <div>
                <input class="input-inset" type="text" placeholder="Buscar"/> 
                <Link to={`/CreatePet/${id}`} className="button create-button">Nueva Mascota</Link>
            </div>
            </div>
            
           <table className="styled-table">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Nombre</th>
                    <th>Especie</th>
                    <th>Raza</th>
                    <th>Género</th>
                    <th>Fecha Nacimiento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((pet,index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{pet.namepet}</td>
                        <td>{pet.namespeciepet}</td>
                        <td>{pet.racepet}</td>
                        <td>{pet.namegenderpet}</td>
                        <td>{pet.birthdatepet}</td>
                        <td>
                            <Link to={`/CreateAppo/${pet.idpet}`} className="button pet-button">Reservar Cita</Link>
                            <Link to={`/EditPet/${pet.idpet}`} className="button edit-button">Editar</Link>
                            <a onClick={() =>handleDelete(pet.idpet)} className="button delete-button">Eliminar</a>
                        </td>
                    </tr>
                })}
            </tbody>
           </table>
           </div>
        </>  
    );
}

export default ListAllPet;