import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios'


function App() {
  
const [posts, setPosts] = useState([]);
const [Ta, setTa] = React.useState()
const [T0, setT0] = React.useState()
const [temps, setTemps] = React.useState()
const [intensite, setIntensite] = React.useState()
const [ws, setWS] = React.useState()
const [data, setdata] = useState({});

  return (
    <div className="body">
      <div className='form'>
      <h1 className='h1'>Calculez le température de votre câble pour les 30 prochaines minutes !</h1>
      <div className="formcontainer">
      <hr/>
      <div className="container">
        <label for="temp"><strong>Température du câble actuel</strong></label>
        <br/>
        <input type="text" className='input' placeholder="En °C" value={T0}  onChange={e => setT0(e.target.value)} name="temp" required/>
        <br/>
        <label for="meteo"><strong>Température ambiante</strong></label>
         <br/>
        <input type="text" className='input' placeholder="En °C" value={Ta}  onChange={e => setTa(e.target.value)} name="meteo" required/>
        <br/>
          <label for="intensite"><strong>Intensité</strong></label>
           <br/>
        <input type="text" className='input'  placeholder="En ampère" value={intensite}  onChange={e => setIntensite(e.target.value)} name="intensite" required/>
        <br/>
          <label for="vent"><strong>Vent</strong></label>
           <br/>
        <input type="text" className='input' placeholder="En m/s" value={ws}  onChange={e => setWS(e.target.value)} name="vent" required/>
        <br/>
         <label for="temps"><strong>Combien de temps ?</strong></label>
         <br/>
        <input type="text" className='input' placeholder="En minutes" value={temps}  onChange={e => setTemps(e.target.value)} name="temps" required/>
        <br/>
      </div>
      <button type="submit" className='button' onClick={() => {
                                                    axios.post("http://127.0.0.1:5000/send/?ws="+ws+"&intensite="+intensite+"&temps="+temps+"&T0="+T0+"&Ta="+Ta, {
                                                    ws : ws,
                                                    temps :temps,
                                                    T0 :T0,
                                                    Ta:Ta,
                                                    intensite :intensite
                                                }).then(value => {
                                                    if (value.status === 200) {
                                                    }
                                                }
                                                ).catch(error => alert(error.toString()))
                                            }
                                        }>Calculez !</button>
    </div>

    <div>       
      <p>{data.ws}</p>
      <p>{data.intensite}</p>
      <p>{data.temps}</p>
      <p>{data.T0}</p>
      <p>{data.Ta}</p>
    </div>

    </div>
    
</div>
    
  );
}

export default App;
