import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

import Layout from '../../components/Layout';
import LinkList  from '../../components/LinkList';

import { API } from '../../config'
import { listAPI } from '../../listAPI'
import { listPage } from './../../listPage';
import { listEnum } from '../../listEnum';

import withUser from './withUser'
import { getCookie } from '../../utils/auth';

const User = ({user, token, userLinks}) => {
  
    return (
        <Layout>
            <section id="app-form" className="app-form section-bg">
                <div className="container" >
                    <div className="section-title">
                        <h2>Subscriber dashboard</h2>
                        <form action={listPage.Page_Link_Create} role="form" className="php-email-form w-100" >
                            <div className="text-center"><button type="submit">Create a link</button></div>
                        </form> 
                    </div>
                    
                    <section id="newestLinks" class="link section-bg">
                        <div class="container">
                            <div class="section-title">
                                <h2>Your link</h2> 
                            </div>
                            <LinkList linkList={userLinks} isEditable='true' token={token} /> 
                        </div> 
                    </section> 
    
                </div>
            </section>
        </Layout>
    );
}
  
User.getInitialProps = async ({ req }) => {

    const token = getCookie('token', req); 
    const response = await axios.get(`${API}${listAPI.API_LinkListByUser}`,   {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }); 
 
    return { userLinks: response.data.links };
 
}

export default withUser(User);
