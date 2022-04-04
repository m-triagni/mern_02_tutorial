import moment from 'moment';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Parser } from 'html-to-react'

import Modal from './Modal'

import { API } from '../config';
import { listAPI } from '../listAPI';
import { listPage } from '../listPage';
import { listEnum } from '../listEnum';
 
const LinkList = ({ token, linkList, isEditable }) => {
    const [links, setLinks] = useState(linkList); 
    const [deletedId, setDeletedId] = useState(0); 

    const handleClick = async linkId => { 

        //update DB
        let apiURL = `${API}${listAPI.API_LinkUpdateClickCount}`;
        const response = await axios.put(apiURL, { linkId });
        const link = response.data;
 
        //copy click
        //updateLink(response.data);
        let templinks = [...links]; 
        const templinks2 = templinks
        templinks2.forEach(element => {
            if(element._id === link._id) {
               element.clicks = link.clicks;
            }
        });
        setLinks(templinks2); 
    };
 
    const handleDelete = ( id) => {
        //e.preventDefault();
 
        setDeletedId(id)   
    };

    const executeDelete = async () => {
        console.log(`executeDelete ${deletedId}`)

        try {
            let apiURL = `${API}${listAPI.API_LinkDelete}`.replace(":id", deletedId);
            const response = await axios.delete(apiURL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 
            
            removeLink(deletedId);
        } catch (error) {
            console.log('LINK DELETE ', error);
        }
    };

    const removeLink =( (id) => {
        let templinks = [...links]; 
 
        const templinks2 = templinks.filter((value, index, arr) => {
            return value._id != id 
        }); 
        setLinks(templinks2); 
    });
 
    const handleEdit = (e, id) => {
        e.preventDefault();

        let path = `${listPage.Page_Link_Update}`.replace(":id", id);

        window.location.href=path 
    };

    const listOfLinks = () => 
        links.map((l, i) => (
            <div key={i} className="row link-item d-flex align-items-stretch"> 
                    <div className="col-sm-8">
                        <i class="fa fa-book" ></i>
                        <h4><a href="#" >{l.title}</a></h4>
                    </div> 
                    <div className="col-sm-4">
                        <span className="pull-right" style={{ fontSize: '12px', color:'#346751' }}>
                            {moment(l.createdAt).fromNow()} by {l.postedBy && l.postedBy.name}
                        </span>
                    </div>
                    <div className="col-sm-12">
                        <a href={l.url} target="_blank" onClick={e => handleClick(l._id)}>
                            <h6 className="pt-2 text-danger" style={{ fontSize: '18px' }}>
                                <span style={{ color:'#346751' }}>{l.url}</span> 
                            </h6>
                        </a>
                    </div>
                    <div className="col-sm-12"> 
                        <h6 className="pt-2" style={{ fontSize: '12px' }}>
                            <p>{Parser().parse(l.description)}</p> 
                        </h6> 
                    </div>
                    <div className="col-sm-3 pt-4">
                        <span className="badge text-secondary pull-right">{l.clicks} clicks</span>
                    </div>
                    <div className="col-sm-3 pt-4">
                        <span className="badge text-dark">
                        {l.difficulty} , {l.type} , {l.medium}
                        </span>
                    </div> 
                    <div className="col-sm-3 pt-4" align="left"> 
                        {l.categories.map((c, ii) => (
                            <span key={i + ii}  className="badge text-success"> {c.name}</span>
                        ))}
                    </div> 
                    {
                        isEditable && (
                            <div className="col-sm-3 pt-4" align="left">  
                                <button class="btn btn-success btn-sm rounded-2" onClick={(e) => handleEdit(e,l._id)} ><i class="fa fa-edit "></i> Edit</button>
                                <button class="btn btn-danger btn-sm rounded-2 ml-2"  data-toggle="modal" data-target="#deleteModal" onClick={() => handleDelete(l._id)}  ><i class="fa fa-trash"></i> Delete</button>
                            </div>   
                        )
                    }
                    
            </div>
             
    ));

    return  (
        <React.Fragment>
            {listOfLinks()}
            <Modal id='deleteModal' title='Delete Confirmation' body='Are you sure to delete this link ?' onContinue={executeDelete} />
        </React.Fragment>
    )
}

export default LinkList;