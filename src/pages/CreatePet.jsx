import React, { useEffect, useState , Fragment} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Pet.scss';
import {useNavigate,useParams} from 'react-router-dom';
import swal from 'sweetalert';

const CreatePet = () => {

    const {id} = useParams();

    //Listar género mascota
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('/ListGender')
        .then(res => setData(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])

    //Listar procedencia mascota
    const [dataOrigin, setDataOrigin] = useState([])
    useEffect(()=>{
        axios.get('/ListOrigin')
        .then(res => setDataOrigin(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])

    //Listar especie mascota
    const [dataSpecie, setDataSpecie] = useState([])
    useEffect(()=>{
        axios.get('/ListSpecie')
        .then( res => setDataSpecie(Array.from(res.data)))
        .catch(err => console.log(err));
    }, [])

    //Subir fotografía
    const [file, setFile] = useState()

    const [image, setImage] = useState()

    const handleUpload = (e) => {
        const formdata = new FormData()
        formdata.append('file', file)
        axios.post('/upload',formdata)
        .then(function (res) {
            setImage(res.data);
            setValues({...values,photoFile: res.data})
        })
        .catch(err => console.log(err))
    }

    //Capturar datos
    const [values, setValues] = useState({
        idUser: id,
        name: '',
        specie: '',
        gender: '',
        origin: '',
        race: '',
        color: '',
        birthday: '',
        description: '',
        photoFile: ''
    })

    //Enviar datos
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/CreatePet/'+id, values)
        .then(res => {
            swal({
                text: "Mascota registrada",
                icon: "success",
              });
            //   setTimeout(function(){
            //     navigate('/ListPet/'+id);
            // }, 3000);
        })
        .catch(err => console.log(err))
    }

return(
<>
<Header />

<div className="pet">
            <div className="form-container-3">
            <h1 className="title">Registrar Mascota</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>

          
                        <label for="name" className="label">Nombre</label>
                        <input type="text" id="name" className="input input-name" onChange={e => setValues({...values,name: e.target.value})}/>

             
                <table>
                    <tr>

                        <td>
                        <label for="specie" className="label">Especie</label>
                <select id="specie" name="specie" className="input" onChange={e => setValues({...values,specie: e.target.value})}>
                    <option selected>Seleccionar</option>
                    {dataSpecie.map((specie,index) => {
                        return <option value={specie.idspeciepet}>{specie.namespeciepet}</option>
                    })}  
                </select>
                        </td>
                        <td>
                        <label for="gender" className="label">Género</label>
                <select id="gender" name="gender" className="input" onChange={e => setValues({...values,gender: e.target.value})}>
                    <option selected>Seleccionar</option>
                    {data.map((gen,index) => {
                        return <option value={gen.idgenderpet}>{gen.namegenderpet}</option>
                    })}    
                </select>
                        </td>
                        <td>
                        <label for="origin" className="label">Procedencia</label>
                <select id="origin" name="origin" className="input" onChange={e => setValues({...values,origin: e.target.value})}>
                    <option selected>Seleccionar</option>
                    {dataOrigin.map((origin,index) => {
                        return <option value={origin.idoriginpet}>{origin.nameoriginpet}</option>
                    })}  
                </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <label for="name" className="label">Raza</label>
                <input type="text" id="race" className="input input-name" onChange={e => setValues({...values,race: e.target.value})}/>

                        </td>
                        <td>
                            <label for="name" className="label">Color</label>
                            <input type="text" id="color" className="input input-name" onChange={e => setValues({...values,color: e.target.value})}/>
                        </td>
                        <td>
                            <label for="name" className="label">Fecha de Nacimiento</label>
                            <input type="date" id="birthday" className="input input-name" onChange={e => setValues({...values,birthday: e.target.value})}/>

                        </td>

                    </tr>
                </table>
               
                <label for="name" className="label">Señas particulares</label>
                <textarea className="textarea" rows="3" id="description" onChange={e => setValues({...values,description: e.target.value})}></textarea>

                <label for="photo" className="label">¿Deseas que conoscamos más a tu mascota? Sube una foto!</label>
                <input type="file" id="photo" placeholder="" className="file" onChange={e => setFile(e.target.files[0])} accept=".jpg, .jpeg, .png"/>
                <br/><div className="pet-but"><input type="button" value="Cargar imagen" className="primary-button" onClick={handleUpload}/> </div>
                <img src={`/images/`+ image} alt="" width="50%"/>
                <br/>
                 <div className="pet-but">
                 <input type="submit" value="Registrar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>
                </div>   
                
            </form>
            </div>
        </div>
    </>
)
}


export default CreatePet