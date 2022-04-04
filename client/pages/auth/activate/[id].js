import { withRouter } from 'next/router';
import {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken'
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../../../utils/alert';
import {API} from '../../../config';
import Layout from '../../../components/Layout';

 import { listAPI } from '../../../listAPI';

const ActivateAccount = ({router}) => {

    const accountState = ['Activate Account', 'Activating...', 'Account is activated']

    const [state, setState] = useState({
        name:'',
        token:'',
        buttonText: accountState[0],
        success: '',
        error: ''
    });

    const {name, token, buttonText, success, error } = state;
 
    useEffect(() => {
        let token = router.query.id;

        if(token) {
            const {name} = jwt.decode(token)
            setState({...state, name, token})
        }
    },[router])
    
    const handleSubmit = async e => {
        e.preventDefault();

        setState({...state, buttonText: accountState[1]})

        try {
            const response = await axios.post(`${API}${listAPI.API_Activate}`, { token });
 
            setState({...state, name:'', token:'', buttonText: accountState[2],
                success: response.data.message,
                error: response.data.error,
            })
        }
        catch(error) {
            setState({...state, name:'', token:'', buttonText: accountState[0], error: error.response.data.error})
        }

    }

    
    const activateHead = () => {
        return (
            <React.Fragment>
                <h1>Activate your email</h1>
                <br/>
            </React.Fragment>
        )
    }

    const activateMessage = () => {
        return (
            <React.Fragment>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
            </React.Fragment>
        )
    }

    const activateForm = () => {
        return (
            <React.Fragment>
                <button className="btn btn-outline-warning btn-block" onClick={handleSubmit}>{buttonText}</button>
            </React.Fragment>
        )
    } 

    return <Layout> 
                <section id="app-form" class="app-form section-bg">
                    <div class="container"> 
                        <div class="row justify-content-center">
                            <div class="col-lg-6 mt-4 mt-lg-0 ">
                                {activateHead()}
                                {activateMessage()}
                                {activateForm()}
                            </div>
                        </div>
                    </div>
                </section>  

    </Layout>
};

export default withRouter(ActivateAccount);