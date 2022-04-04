import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import Layout from '../components/Layout'
import LinkList  from '../components/LinkList';

import { API } from './../config';
import { listAPI } from './../listAPI';
import { listPage } from './../listPage';
import { listEnum } from './../listEnum';

const Home = ({categories, popularLinks, newestLinks}) =>  {

    const topSection = () => (
        <React.Fragment>
            <section id="home-top"> 
                <div class="container">
                    <div class="row d-flex align-items-center">
                        <div class="col-lg-12 py-5 py-lg-0 order-2 order-lg-1" > 
                            <h1>Catalog of web programming tutorial</h1>
                            <h2>Browse our selected collection of popular full-stack web programming tutorial references.</h2>
                        </div> 
                    </div>
                </div> 
            </section>
        </React.Fragment>
    )

    const categoriesSection = () => categories.map((c,i) => (
        
        <div className="col-lg-2 col-md-4 col-6">
            <div className="home-catalog-logo">
            <Link href={`${listPage.Page_Link_ListByCategory}/${c.slug}`} key={c.name}> 
                <a  >
                   
                         <img src={c.image && c.image.url} className="img-fluid" alt={c.name} style={{width: '100px', height: 'auto'}}/>
                        <div class="image__overlay image__overlay--primary">
                            <div class="image__title">{c.name}</div>
                            <p class="image__description">
                                 
                            </p>
                        </div>
                 </a>
            </Link>
            </div>
        </div>
    
    ));

    const catalogSection = () => (
        <React.Fragment>
            <section id="home-catalog" class="home-catalog section-bg">
                <div class="container">

                    <div class="row no-gutters clearfix wow">

                     {categoriesSection()}
            
                    </div>

                </div>
                </section>
        </React.Fragment>
    )

    const newestLinksSection = () => (
        <React.Fragment>
            <section id="newestLinks" class="link section-bg">
                <div class="container">
                    <div class="section-title">
                        <h2>Newest tutorial link</h2> 
                    </div>
                    <LinkList linkList={newestLinks} /> 
                </div> 
            </section> 
        </React.Fragment> 
    )

    const popularLinksSection = () => (
        <React.Fragment>
            <section id="popularLinks" class="link section-bg">
                <div class="container">
                    <div class="section-title">
                        <h2>Popular tutorial link</h2> 
                    </div>
                    <LinkList linkList={popularLinks} /> 
                </div> 
            </section> 
        </React.Fragment> 
    )

    return (
        <Layout testName="agni"> 
                {topSection()}
                {catalogSection()}  
                {newestLinksSection()}
                {popularLinksSection()}
        </Layout> 
    )
}


//prepare data in server side, so by the time this page is rendered, data is ready
Home.getInitialProps = async () => {

    const resCategoryList = await axios.get(`${API}${listAPI.API_CategoryList}`);

    const resPopularLinks = await axios.get(`${API}${listAPI.API_LinkReadPopular}`);

    const resNewestLinks = await axios.get(`${API}${listAPI.API_LinkReadNewest}`);

    return {
        categories: resCategoryList.data,
        popularLinks: resPopularLinks.data,
        newestLinks: resNewestLinks.data, 
    }
}

export default Home