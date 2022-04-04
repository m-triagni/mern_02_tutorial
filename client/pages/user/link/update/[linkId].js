// imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Layout from '../../../../components/Layout';
import LinkForm from '../../../../components/LinkForm';

import { showSuccessMessage, showErrorMessage } from './../../../../utils/alert';
import { getCookie, isAuth } from './../../../../utils/auth';
import withUser from './../../withUser'

import { API } from './../../../../config';
import { listAPI } from './../../../../listAPI';
import { listPage } from './../../../../listPage';
import { listEnum } from './../../../../listEnum';

const Update = ({ link, token }) => {
     
    return (
        <Layout>
            <section id="app-form" class="app-form section-bg">
                <div class="container" >
                    <div class="section-title">
                        <h2>Update link</h2>
                    </div>
                </div>
                <LinkForm token={token} link={link}/>
            </section> 
        </Layout>
    );

};

Update.getInitialProps = async ({ req, token, query }) => {
    let apiURL = `${API}${listAPI.API_LinkRead}`.replace(":id", query.linkId); 

    const response = await axios.get(apiURL);
    return { link: response.data, token };
};

export default withUser(Update);
