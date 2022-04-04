import Link from 'next/link';
import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react';
import Head from 'next/head';
import renderHTML from 'react-render-html';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';

import Layout from '../../components/Layout';
import LinkList  from '../../components/LinkList';
import {showSuccessMessage, showErrorMessage} from '../../utils/alert';

import { API } from '../../config';
import { listAPI } from '../../listAPI';
import { listPage } from '../../listPage';
import { listEnum } from '../../listEnum';

const Links = ({ query, category, newestLinks, popularLinks, totalLinks, limitParam, skipParam}) => {
     
    const [limit, setLimit] = useState(limitParam);
    const [skip, setSkip] = useState(skipParam);
    const [size, setSize] = useState(totalLinks);

    const headSection = () => (
        <Head>
            <title>
                {category.name} | Tutorial
            </title>
            <meta name="description" content={stripHTML(category.content.substring(0, 160))} />
            <meta property="og:title" content={category.name} />
            <meta property="og:description" content={stripHTML(category.content.substring(0, 160))} />
            <meta property="og:image" content={category.image.url} />
            <meta property="og:image:secure_url" content={category.image.url} />
        </Head>
    );

    const stripHTML = data => data.replace(/<\/?[^>]+(>|$)/g, '');
          
    const categorySection = () => ( 
        <div class="row content">
          <div class="col-md-2 text-right" >
            <img src={category.image.url} class="img-fluid" alt={category.name} style={{ width: 'auto', maxHeight: '100px' }}/>
          </div>
          <div class="col-md-10 pt-4" >
            <h3>{category.name}</h3>
            <p class="fst-italic">
                {renderHTML(category.content || '')}
            </p> 
          </div>
        </div>  
    )

    const filterNewest = () => (
        <React.Fragment>
            <div class="row">
                <div class="col-lg-12">
                    <ul id="portfolio-flters">
                        <li data-filter="*" class="filter-active">All</li>
                        <li data-filter=".filter-app">Beginner</li>
                        <li data-filter=".filter-card">Intermediate</li>
                        <li data-filter=".filter-web">Advance</li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )

    const newestLinkSection = () => ( 
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

    const popularLinkSection = () => ( 
        <React.Fragment>
            <section id="newestLinks" class="link section-bg">
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
        <Fragment>
            {headSection()}
            <Layout>

                <section id="features" class="features section-bg">
                    <div class="container">
                        {categorySection()}
                        <section id="portfolio" class="portfolio section-bg">
                            <div class="container">
                            {newestLinkSection()}
                            </div>
                        </section> 
                        <section id="portfolio" class="portfolio section-bg">
                            <div class="container">
                            {popularLinkSection()}
                            </div>
                        </section> 
                    </div>
                </section> 
            </Layout>
        </Fragment>
    );
};
 
Links.getInitialProps = async ({ query, req }) => {
 
    let skip = 0;
    let limit = 100;
  
    let apiURL = `${API}${listAPI.API_CategoryRead}`.replace(":categorySlug", query.categorySlug);
 
    const response = await axios.post(apiURL, {skip, limit});
    const { category, links } = response.data
 
    let popularLinks  = links;
    const keySort = 'clicks';
    popularLinks.sort( (a,b) => (b[keySort] > a[keySort]) ? 1 : ((b[keySort] < a[keySort]) ? -1 : 0))
 
    return { query, category , newestLinks: links, popularLinks, totalLinks: links.length, limitParam: limit, skipParam: skip  }
}

export default Links;
