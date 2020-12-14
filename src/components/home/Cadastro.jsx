import React, { useContext, useState } from 'react';
import {Redirect} from "react-router";

import { Context } from '../../Context/AuthContext';


export default function Cadastro() {
  const {
        sucessCad,
        setEmail, 
        setPassword, 
        setUserName, 
        setConfirmPassword, 
        handleCadastro } = useContext(Context);
 
    

    return <div className="position-relative overflow-hidden m-md-3 text-center bg-light">
        {sucessCad && <Redirect to="/login"/>}
        <div className="col-md-5 p-lg-5 mx-auto ">
            <h1 className="display-4 font-weight-normal">Cadastro</h1>
            <div className="form-login">
                <form >
                    <div className="row">
                        <label htmlFor="name">Nome</label>
                        <input 
                            className="form-control"
                            id="name"
                            name="name"
                            onBlur={e => setUserName(e.target.value)}
                            placeholder="Fulano da Silva"
                            required />
                        <div className="invalid-feedback">
                            Nome inválido.
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onBlur={e => setEmail(e.target.value)}
                            placeholder="exemplo@gmail.com"
                            required />
                        <div className="invalid-feedback">
                            Email inválido.
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onBlur={e => setPassword(e.target.value)}
                            required />
                        <div className="invalid-feedback">
                            Senha inválida.
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            onBlur={e => setConfirmPassword(e.target.value)}
                            required />
                        <div className="invalid-feedback">
                            Senha inválida.
                        </div>
                    </div>
                    <br></br>
                    <div className="row botao">
                        <button
                            className="btn btn-success btn-lg btn-block bg-success"
                            type="button"
                            onClick={handleCadastro()}>
                            Cadastre-se!
                        </button>
                    </div>
                </form>
                            
            </div>
        </div>
    </div>
}


