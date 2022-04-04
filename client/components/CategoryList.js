import moment from 'moment';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Parser } from 'html-to-react'

import Modal from './Modal'

import { API } from '../config';
import { listAPI } from '../listAPI';
import { listPage } from '../listPage';
import { listEnum } from '../listEnum';
 
const CategoryList = ({ token, categoryList, isEditable }) => {
    const [categories, setCategories] = useState(categoryList); 
    const [deletedId, setDeletedId] = useState(0); 

    const handleDelete = ( id) => {
        setDeletedId(id)  
    };

    const executeDelete = async () => {

         try {
            let apiURL = `${API}${listAPI.API_CategoryDelete}`.replace(":id", deletedId);
            const response = await axios.delete(apiURL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            removeCategory(deletedId);
        } catch (error) {
            console.log('CATEGORY DELETE ', error);
        }
    };

    const removeCategory =( (id) => {
        let tempCategories = [...categories]; 
 
        tempCategories = tempCategories.filter((value, index, arr) => {
            return value._id != id 
        }); 

        setCategories(tempCategories); 
    });
 
 
    const handleEdit = (e, slug) => {
        e.preventDefault();

        let path = `${listPage.Page_Category_Update}`.replace(":slug", slug);

         window.location.href=path 
    };

    const listOfCategories = () => 
        categories.map((c, i) => (
            <div className='col-4 '>
                <div class="card" style={{width: '18rem'}}>
                    <div class="card-header text-center">

                        <img class="card-img-top" src={c.image && c.image.url} alt={c.name} style={{width: '100px', height: 'auto'}} className="pr-3"/>
                        <h5 class="card-title">{c.name}</h5>
                    </div>
                        <div class="card-body">
                            <p class="card-text">  {Parser().parse(c.content)} </p>
                            
                        </div> 
                        <div class="card-footer text-right">
                        {
                                isEditable && (
                                    <div  >  
                                        <button class="btn btn-success btn-sm rounded-2" onClick={(e) => handleEdit(e,c.slug)} ><i class="fa fa-edit "></i> Edit</button>
                                        <button class="btn btn-danger btn-sm rounded-2 ml-2"  data-toggle="modal" data-target="#deleteModal"  onClick={() => handleDelete(c._id)} ><i class="fa fa-trash"></i> Delete</button>
                                    </div>   
                                )
                            }
                        </div>
                    </div>   
            </div>
             
    ));

    return  (
        <React.Fragment>
            {listOfCategories()}
            <Modal id='deleteModal' title='Delete Confirmation' body='Are you sure to delete this category ?' onContinue={executeDelete} />
        </React.Fragment>
    )
}

export default CategoryList;