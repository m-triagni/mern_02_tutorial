
import Link from 'next/link';
import axios from 'axios'
import React, { useState, useEffect } from 'react';

import renderHTML from 'react-render-html';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';

import Layout from './../../../components/Layout';
import {showSuccessMessage, showErrorMessage} from './../../../utils/alert';
import withAdmin from './../withAdmin';
import { getCookie } from './../../../utils/auth';

import { API } from './../../../config';
import { listAPI } from './../../../listAPI';
import { listPage } from './../../../listPage';
import { listEnum } from './../../../listEnum';

const Links = ({ query, links, totalLinks, limitParam, skipParam, token}) => {
    const [allLinks, setAllLinks] = useState(links); 
    const [limit, setLimit] = useState(limitParam);
    const [skip, setSkip] = useState(skipParam);
    const [size, setSize] = useState(totalLinks);
  

    const listOfLinks = () =>
        allLinks.map((l, i) => (
            <div key={i}  className="row alert alert-primary p-2">
                <div className="col-md-8 pt-2">
                    <h5 className="">{l.title}</h5> 
                    <a href={l.url} target="_blank"  >
                        <h6 className="pt-2 text-danger" style={{ fontSize: '12px' }}>
                            <span style={{   color:'#346751' }}>{l.url}</span> 
                        </h6>
                    </a>
                </div>
                <div className="col-md-4 pt-2">
                    <span className="pull-right" style={{ fontSize: '12px', color:'#346751' }}>
                        {moment(l.createdAt).fromNow()} by {l.postedBy && l.postedBy.name}
                    </span>
                    <br />
                    <span className="badge text-secondary pull-right">{l.clicks} clicks</span>
                </div>
                <div className="col-md-12">
                    <span className="badge text-dark">
                        {l.type} / {l.medium}
                    </span>
                    {l.categories.map((c, ii) => (
                        <span key={i + ii}  className="badge text-success"> {c.name}</span>
                    ))}
                </div>
            </div>
    ));

    const loadMore = async () => {

        let toSkip = skip + limit;
 
        let apiURL = `${API}${listAPI.API_CategoryRead}`.replace(":slug", query.slug);
        const response = await axios.post(apiURL, {skip: toSkip, limit});

        setAllLinks([...allLinks, ...response.data.links])
        setSize(response.data.links.length);
        setSkip(toSkip);

    };

    const loadMoreButton = () => {
         return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Load more
                </button>
            )
        );
    };

    return (
        <Layout>
            <div className="row">
                
                    <h1 className="display-4 font-weight-bold" > <span style={{   color:'#16213E' }}>All Links </span></h1>
                 
            </div>
            <br />
            
 
            <div className="row">
                <div className="col-md-12 text-center">
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={size > 0 && size === limit}
                        loader={<img src="/static/images/loading.gif" alt="loading" />}
                    >

                    <div className="row">
                        <div className="col-md-8"> {listOfLinks()} </div>
                        <div className="col-md-4">
                            <p>show popular links</p>
                        </div>
                    </div>
                    </InfiniteScroll>
                    
                </div>
            </div>
            
            <p>{loadMoreButton()}</p>
        </Layout>
    );
};

Links.getInitialProps = async ({ req, query })  => {
    let skip = 0;
    let limit = 2;
 
    const token = getCookie('token', req);
 
    let apiURL = `${API}${listAPI.API_LinkList}`
    const response = await axios.get(apiURL, {
        headers: {
            Authorization: `Bearer ${token}`
        }},
        {skip, limit});
     
    const links = response.data

    return { query,  links, totalLinks: links.length, limitParam: limit, skipParam: skip, token  }
    
}

export default withAdmin(Links);
