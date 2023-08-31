import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Client.scss';
import {useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';
import '../styles/index.css';

const CreateVaccine= () => {
    
    const [values, setValues] = useState({
        name: '',
        description: '',
        batch: '',
        dueDate: '',
        brand: '',
        stock: ''    
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/CreateVaccine',values)
        .then(res => {
            swal({
                text: "Vacuna registrada",
                icon: "success",
              });
              setTimeout(function(){
                navigate('/listinventory');
            }, 3000);
            
        })
        .catch(err => console.log(err))
    }

return(
<>
<Header />
 <div className="client">
            <div className="form-container">
            <h1 className="title">Registrar Vacuna</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>
                <label for="name" className="label">Nombre</label>
                <input type="text" id="name" placeholder="" className="input input-text" onChange={e => setValues({...values,name: e.target.value})}/>

                <label for="name" className="label">Descripción</label>
                <textarea className="textarea" rows="3" id="description" onChange={e => setValues({...values,description: e.target.value})}></textarea>

                <label for="batch" className="label">Número de lote</label>
                <input type="text" id="batch" placeholder="" className="input input-text" onChange={e => setValues({...values,batch: e.target.value})}/>

                <label for="dueDate" className="label">Fecha de vencimiento</label>
                <input type="date" id="dueDate" placeholder="" className="input input-text" onChange={e => setValues({...values,dueDate: e.target.value})}/>

                <label for="brand" className="label">Marca / Proveedor</label>
                <input type="text" id="brand" placeholder="" className="input input-text" onChange={e => setValues({...values,brand: e.target.value})}/>

                <label for="stock" className="label">Stock inicial</label>
                <input type="number" id="stock" placeholder="" className="input input-email" onChange={e => setValues({...values,stock: e.target.value})}/>

                <input type="submit" value="Registrar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>
                               
            </form>
            </div>
        </div>
    </>
)
}


export default CreateVaccine