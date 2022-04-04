import Router from 'next/router'

import Layout from '../../../components/Layout';
import {showSuccessMessage, showErrorMessage} from '../../../utils/alert';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API} from '../../../config';
import {authenticate, isAuth} from '../../../utils/auth';

import { listAPI } from '../../../listAPI';
import { listPage } from '../../../listPage';
import { listEnum } from '../../../listEnum';

const ForgetPassword = () => {
    
    //list of button state
    const buttonState = ['Reset Password', 'Submit..'];

    const [state, setState] = useState({
        email: '', 

        error:'',
        success:'',
        buttonText: buttonState[0],   
     })

     const { email,  error, success, buttonText} = state

 
    const handleChange = (attributeName) => (e) => {
        setState({...state, [attributeName]: e.target.value, error:'', success:'', buttonText: buttonState[0]})
    }

    const handleSubmit =  async e => {
        e.preventDefault();

        setState({...state, buttonText: buttonState[1] })
        try {

            //console.table({name, email, password})
            const response = await axios.put(`${API}${listAPI.API_ForgetPassword}`,{
                email
            })
 
            Router.push(listPage.Page_PasswordForgetDone) ;

  
        }catch(error) {
            console.log('error: ' , error);
            setState({...state,
                buttonText:  buttonState[0],
                error: error.response.data.error
            });
        }
    }

    //set head
    const passwordForgetHead = () => {
        return (
            <React.Fragment>
                <h1>Forget Password</h1>
                <br />
            </React.Fragment>
        ) 
    }

    //set form
    const passwordForgetForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                 
                <div className="form-group">
                    <input 
                        value={state.email}
                        onChange={handleChange('email')} 
                        type="email" className="form-control" placeholder="Type your email" 
                        required
                        />
                </div>
                
                <div className="form-group">
                    <button className="btn btn-outline-warning" > {state.buttonText} </button>
                </div>
            </form>
        )
    }

    //set message
    const passwordForgetMessage = () => {
        return (
            <React.Fragment>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
            </React.Fragment>
        )
    }

    //return page layout
    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                {passwordForgetHead()}
                {passwordForgetMessage()}
                {passwordForgetForm()}
                <hr/>
             </div> 
        </Layout>
    )
}

export default ForgetPassword