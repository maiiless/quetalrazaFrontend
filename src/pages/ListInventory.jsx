import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/List.scss';
import swal from 'sweetalert';


const ListInventory = () => {

    const {id} = useParams();

    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('https://quetalraza.onrender.com/ListInventory')
        .then(res => setData(Array.from(res.data)))
        .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Header />
            <div className="list-content">
            <div><h3>Inventario</h3></div>
                <div className="section-buttons">
                    <input class="input-inset" type="text" placeholder="Buscar"/>
                    <a className='button create-button'>Descargar inventario</a>
                    <Link to='/CreateMedicine' className="button create-button">Nuevo medicamento</Link>
                    <Link to='/CreateVaccine' className="button create-button">Nueva vacuna</Link>
                </div>
           <table className="styled-table">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Insumo / Medicamento</th>
                    <th>Descripción</th>
                    <th>Fecha de Vencimiento</th>
                    <th>Marca</th>
                    <th>Stock Actual</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                { data.map( (prod, index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{prod.namevet}</td>
                        <td>{prod.description}</td>
                        <td>{prod.timestamp}</td>
                        <td>{prod.brand}</td>
                        <td>{prod.stocks}</td>
                        <td>
                            <Link to={`/EditPet/${prod.iden}`} className="button pet-button">Nueva entrada</Link>
                            <a className="button delete-button">Eliminar</a>
                        </td>
                    </tr>
                })}
            </tbody>
           </table>
           </div>
        </>  
    );
}

export default ListInventory;
