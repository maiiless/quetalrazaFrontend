import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../styles/List.scss';
import swal from 'sweetalert';
// import person from '@icons/chico.png';


const Home = () => {

    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('/listclient')
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('/DeleteClient/'+id)
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
            <div><h3>Clientes</h3></div>    
                <div className="encabezado">
                    {/* <div className="imagen"><img src={person} /></div> */}
                    
                <div>
                <input class="input-inset" type="text" placeholder="Buscar"/> 
                <Link to="/CreateClient" className="button create-button">Nuevo Cliente</Link>
                </div>
                </div>
            <div>
           
           </div>
           </div>
        </>  
    );
}

export default Home;