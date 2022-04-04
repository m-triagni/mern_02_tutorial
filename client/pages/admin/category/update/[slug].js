
import axios from 'axios';
import Link from 'next/link'
import Resizer from 'react-image-file-resizer';
import dynamic from 'next/dynamic';
import React, {useState, useEffect} from 'react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.bubble.css';

import Layout from '../../../../components/Layout';
import CategoryForm from '../../../../components/CategoryForm';

import withAdmin from '../../withAdmin';
import {showSuccessMessage, showErrorMessage} from '../../../../utils/alert';
import { getCookie } from './../../../../utils/auth';

import {API} from '../../../../config';
import { listAPI } from '../../../../listAPI';
import { listPage } from '../../../../listPage';
import { listEnum } from '../../../../listEnum';


const Update = ({ category, token , slug}) => {

    return (
        <Layout>
            <section id="app-form" class="app-form section-bg">
                <div class="container" >
                    <div class="section-title">
                        <h2>Update category</h2>
                    </div>
                </div>
                <CategoryForm token={token} category={category}/>
            </section> 
        </Layout>   
    );
};

Update.getInitialProps = async ({ req, query }) => {
    const slug = query.slug;

    const token = getCookie('token', req);

     let apiURL = `${API}${listAPI.API_CategoryRead}`.replace(":categorySlug", slug);

     console.log(apiURL);
    const response = await axios.post(apiURL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return { category: response.data.category, token, slug};
};

export default withAdmin(Update);