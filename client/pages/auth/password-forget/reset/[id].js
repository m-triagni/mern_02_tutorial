import { withRouter } from 'next/router';
import {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken'
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../../../../utils/alert';
import {API} from '../../../../config';
import Layout from '../../../../components/Layout';
import Router from 'next/router'

import { listAPI } from '../../../../listAPI';
import { listPage } from '../../../../listPage';

const ResetPassword = ({router}) => {

    const buttonState = ['Submit', 'Submitting...']

    const [state, setState] = useState({
        newPassword:'',
        token:'',
        buttonText: buttonState[0],
        success: '',
        error: ''
    });

    const {newPassword, token, buttonText, success, error } = state;
 
    useEffect(() => {
        let token = router.query.id;

        if(token) {
            const {name} = jwt.decode(token)
            setState({...state, name, token})
        }
    },[router])
    
    const handleChange = (attributeName) => (e) => {
        setState({...state, [attributeName]: e.target.value, error:'', success:'', buttonText:buttonState[0]})
    } 

    const handleSubmit = async e => {
        e.preventDefault();

        setState({...state, buttonText: buttonState[1]})

        try {
            const response = await axios.put(`${API}${listAPI.API_ResetPassword}`, { resetPasswordLink: token, newPassword });
 
            Router.push(listPage.Page_PasswordResetDone) ;

        }
        catch(error) {
            console.log('error : ', error)
            setState({...state, newPassword:'', token:'', buttonText: buttonState[0], error: error.response.data.error})
        }

    }

    
    const passwordResetHead = () => {
        return (
            <React.Fragment>
                <h1>Submit your new password</h1>
                <br/>
            </React.Fragment>
        )
    }

    const passwordResetMessage = () => {
        return (
            <React.Fragment>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
            </React.Fragment>
        )
    }

    const passwordResetForm = () => {
        return (
            <React.Fragment>
                
                <div className="form-group">
                    <input 
                        value={state.newPassword}
                        onChange={handleChange('newPassword')} 
                        type="password" className="form-control" placeholder="Type your new pssword" 
                        required
                        />
                </div>
                <button className="btn btn-outline-warning btn-block" onClick={handleSubmit}>{buttonText}</button>
            </React.Fragment>
        )
    } 

    return <Layout>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                
                {passwordResetHead()}
                {passwordResetMessage()}
                {passwordResetForm()}

            </div>
        </div>

    </Layout>
};

export default withRouter(ResetPassword);