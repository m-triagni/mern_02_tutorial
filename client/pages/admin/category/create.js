import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {showSuccessMessage, showErrorMessage} from './../../../utils/alert';
import Resizer from 'react-image-file-resizer';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';

import Layout from './../../../components/Layout';
import CategoryForm from '../../../components/CategoryForm';

import { API } from './../../../config';
import { listAPI } from '../../../listAPI';
import { listPage } from '../../../listPage';
import { listEnum } from '../../../listEnum';
import withAdmin from './../withAdmin';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

const Create =({user, token}) => {
   
    return( 
            <Layout>
                <section id="app-form" class="app-form section-bg">
                    <div class="container" >
                        <div class="section-title">
                            <h2>Create a category</h2>
                        </div>
                    </div>
                    <CategoryForm token={token}/>
                </section> 
            </Layout>  
    )
}

export default withAdmin(Create);