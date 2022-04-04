import Layout from '../../../components/Layout';
import {showSuccessMessage, showErrorMessage} from '../../../utils/alert';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API} from '../../../config';
import {isAuth} from '../../../utils/auth';
import Router from 'next/router'

import { listAPI } from '../../../listAPI';
import { listPage } from '../../../listPage';
 
const Registration = () =>  {
   
    //if user has login, can't display registration screen and will be redirected to home
    useEffect(() => {
        isAuth() && Router.push(listPage.Page_User)
    },[]);
    
    const buttonState = ['Register Now', 'Registering..', 'Submitted'];

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error:'',
        success:'',
        buttonText: buttonState[0]
    })

    const {name, email, password , error, success, buttonText} = state
   
    const registrationHead = () => {
        return (
            <React.Fragment>
                <div class="section-title">
                    <h2>Sign Up</h2>
                    <p>Join as subscriber now</p>
                </div>
            </React.Fragment>
        )
    }

    const handleChange = (attributeName) => (e) => {
        setState({...state, [attributeName]: e.target.value, error:'', success:'', buttonText:buttonState[0]})
    }

    const handleSubmit =  async e => {
        e.preventDefault();

        setState({...state, buttonText: buttonState[1] })
        try {
 
             const response = await axios.post(`${API}${listAPI.API_Register}`,{
                name, email, password
            })
 
             //if success , empty all field
             setState({...state,
                name:'',
                email:'',
                password:'',
                buttonText: buttonState[2],
                success: response.data.message,
                error: response.data.error,
            });

            Router.push(listPage.Page_RegistrationDone) ;
 
        }catch(error) {
            console.log('error: ' , error);
            setState({...state,
                buttonText:  buttonState[0],
                error: error.response.data.error
            });
        }
    }
 
    const registrationForm = () => {
        return (
            <div class="row justify-content-center">
                <div class="col-lg-4 mt-4 mt-lg-0">
                    {registrationMessage()}
                    <form onSubmit={handleSubmit} role="form" class="php-email-form w-100" >
                     
                        <div class="form-group mt-3 mt-md-0">
                        <input type="name" class="form-control" name="name" id="name" placeholder="Name" value={name} onChange={handleChange('name')} required/>
                        </div>
                   
                     
                        <div class="form-group mt-3">
                        <input type="email" class="form-control" name="email" id="email" placeholder="Email" value={state.email}  onChange={handleChange('email')} required/>
                        </div>
                  
                        <div class="form-group mt-3">
                            <input type="password" class="form-control" name="password" id="password" placeholder="Password" value={state.password} onChange={handleChange('password')}  required/>
                        </div> 
                        <div class="my-3">
                            <div class="loading">Loading</div>
                            <div class="error-message"></div>
                            <div class="sent-message"></div>
                        </div>
                        <div class="text-center"><button type="submit">{state.buttonText}</button></div>
                    </form>
                </div>
            </div>
             
        )
    }

    const registrationMessage = () => {
        return (
            <React.Fragment>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
            </React.Fragment>
        )
    }

    return (
        <Layout> 
            <section id="app-form" class="app-form section-bg">
                <div class="container">
                    {registrationHead()} 
                    {registrationForm()}
                    <hr/>
                </div>
            </section>
        </Layout>
    )
}

export default Registration