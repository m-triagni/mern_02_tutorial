 import Link from 'next/link'
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

const Login = () =>  {
     
    //if user has login, can't display registration screen and will be redirected to home
    useEffect(() => {
        isAuth() && Router.push(listPage.Page_User);
    }, []);
     

    //list of button state
    const buttonState = ['Sign In', 'Signing in..'];

    //set initial state
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error:'',
        success:'',
        buttonText: buttonState[0]
    })

    const {name, email, password , error, success, buttonText} = state
   
    const handleChange = (attributeName) => (e) => {
        setState({...state, [attributeName]: e.target.value, error:'', success:'', buttonText: buttonState[0]})
    }

    const handleSubmit =  async e => {
        e.preventDefault();

        setState({...state, buttonText: buttonState[1] })
        try {

            //console.table({name, email, password})
            const response = await axios.post(`${API}${listAPI.API_Login}`,{
                email, password
            })

            //authenticate
            authenticate(response, () => {
                 return isAuth() && isAuth().role === listEnum.user.role.admin 
                    ? Router.push(listPage.Page_Admin) 
                    : Router.push(listPage.Page_User) ; // redirect to home
            })
  
        }catch(error) {
            console.log('error: ' , error);
            setState({...state,
                buttonText:  buttonState[0],
                error: error.response.data.error
            });
        }
    }
 
    //set head
    const loginHead = () => {
        return (
            <React.Fragment>
                <div className="section-title">
                    <h2>Sign In</h2>
                    <p>Not a member ? <a href={listPage.Page_Registration}>Join now</a></p>
                </div>
            </React.Fragment>
        ) 
    }

    //set form
    const loginForm = () => {
        return (
            <div className="row justify-content-center"> 
                <div className="col-lg-4 mt-4 mt-lg-0">
                    <form onSubmit={handleSubmit} className="php-email-form w-100" >
                        
                        <div className="form-group mt-3 mt-md-0">
                            <input type="email" className="form-control" name="email" id="email" placeholder="Email"  value={state.email} onChange={handleChange('email')}  required/>
                        </div> 
                        <div className="form-group mt-3">
                            <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={state.password}  onChange={handleChange('password')}  required/>
                        </div>
                        <div className="form-group mt-3"> 
                            <div className="w-50 text-md-right"> 
                                <a href={listPage.Page_PasswordForget} >Forgot Password</a> 
                            </div> 
                        </div>
                        <div className="my-3">
                            <div className="loading">Loading</div>
                            <div className="error-message"></div>
                            <div className="sent-message"></div>
                        </div>
                        <div className="text-center"><button type="submit">{state.buttonText}</button></div>
                    </form>
                </div>
            </div>
             
        )
    }

    //set message
    const loginMessage = () => {
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
            <section id="app-form" className="app-form section-bg">
                <div className="container" >
                    {loginHead()}
                    {loginMessage()}
                    {loginForm()}
                </div> 
            </section>
        </Layout>
    )
}
  
export default Login