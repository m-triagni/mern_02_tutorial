// imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from './../../../utils/alert';
import { getCookie, isAuth } from './../../../utils/auth';

import Layout from '../../../components/Layout';
import LinkForm from '../../../components/LinkForm';

import { API } from '../../../config';
import { listAPI } from '../../../listAPI';
import { listPage } from '../../../listPage';
import { listEnum } from '../../../listEnum';

const Create = ({ token }) => {
      
    return (
        <Layout>
            <section id="app-form" class="app-form section-bg">
                <div class="container" >
                    <div class="section-title">
                        <h2>Submit link</h2>
                    </div>
                </div>
                <LinkForm token={token}/>
            </section> 
        </Layout>
    );
};

Create.getInitialProps = ({ req }) => {
    const token = getCookie('token', req);
    return { token };
};

export default Create;
