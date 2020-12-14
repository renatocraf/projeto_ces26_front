import { useState, useEffect } from 'react';
import { baseApiUrl } from '../../global';
import axios from 'axios';

import api from '../../api';
import history from '../../main/history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sucess, setSucess] = useState(false);
  const [userName, setUserName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sucessCad, setSucessCad] = useState(false);
  const [google, setGoogle] = useState(false);
  const [aux, setAux] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
 
  async function handleLogin() {
    
    const data = {
      "email":email,
      "password": password
    }
    var userTudo = await api.post('\signin',data)
    console.log(userTudo)
    var userData = userTudo.data
    console.log(userData)
    if(userData){
      localStorage.setItem('token', JSON.stringify(userData.token));
      api.defaults.headers.Authorization = `Bearer ${userData.token}`;
      //setSucess(true)
      setAuthenticated(true)
      
    }
    else{
      alert("Senha e/ou email incorretos!")
    }

      
  }

  function handleCadastro(){
    const data = {
      "email":email,
      "password": password,
      "name": userName,
      "confirmPassword": confirmPassword
    }

    api.post('/signup', data)
    .then( response=>{
        console.log(response)
    
        setSucessCad(true)
    } )
  
  
  }

  
  const responseGoogle = (response) => {
    var email = String(response.profileObj.email)
    var token = response.tokenId

    handleLoginGoogle(email, token)
  }

  async function handleLoginGoogle(email, token){

    var Data = await api.get(`/users/${email}`)
    var userData = Data.data;
    console.log(userData)

    if(userData){
      localStorage.setItem('token', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      //setSucess(true);
      setAuthenticated(true);
      //setAux(false)
      //history.push('/anuncio');
      }
    else{
      alert("Email não cadastrado!")
    }
  }
    
    
    
    
  



  
  const handleLogout = ()=>{
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
    setSucess(false)
  }
  
  return { authenticated, loading, sucess, sucessCad,google, aux, setSucessCad, handleLogin, handleLogout, setEmail, 
            setPassword, setUserName, setConfirmPassword, handleCadastro, responseGoogle };



}