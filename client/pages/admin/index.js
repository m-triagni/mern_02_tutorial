import axios from 'axios';
import Link from 'next/link'
import React from 'react';

import { API } from '../../config'
import { listAPI } from '../../listAPI'
import { listPage } from './../../listPage';
import { listEnum } from '../../listEnum';

import Layout from '../../components/Layout';
import CategoryList  from '../../components/CategoryList';

import withAdmin from './withAdmin'
import { getCookie } from '../../utils/auth';

const Admin = ({user, token , categoryList}) => {
  
    return (
        <Layout>
        <section id="app-form" className="app-form section-bg">
            <div className="container" >
                <div className="section-title">
                    <h2>Admin dashboard</h2>
                    <form action={listPage.Page_Category_Create} role="form" className="php-email-form w-100" >
                        <div className="text-center"><button type="submit">Create a category</button></div>
                    </form>  
                </div>
                <section id="newestLinks" class="link section-bg">
                    <div class="container">
                        <div class="section-title">
                            <h2>Categories</h2> 
                        </div>
                        <div className='row'>
                            <CategoryList categoryList={categoryList} isEditable='true' token={token} /> 

                            </div>
                        </div> 
                </section> 
 
            </div>
        </section>
    </Layout>
    )
}

Admin.getInitialProps = async ({ req }) => {

    const token = getCookie('token', req); 

    const response = await axios.get(`${API}${listAPI.API_CategoryList}`);
   
    return { categoryList: response.data, token };
 
}

export default withAdmin(Admin);