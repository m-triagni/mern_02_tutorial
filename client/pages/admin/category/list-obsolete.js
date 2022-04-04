
import axios from 'axios';
import Link from 'next/link'
import Resizer from 'react-image-file-resizer';
import dynamic from 'next/dynamic';
import React, {useState, useEffect} from 'react';
import 'react-quill/dist/quill.bubble.css';

import Layout from '../../../components/Layout';
import withAdmin from '../withAdmin';
import {showSuccessMessage, showErrorMessage} from '../../../utils/alert';

import {API} from '../../../config';
import { listAPI } from '../../../listAPI';
import { listPage } from '../../../listPage';
import { listEnum } from '../../../listEnum';

const List = ({ user, token }) => {
    const [state, setState] = useState({
        error: '',
        success: '',
        categories: []
    });

    const { error, success, categories } = state;

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const response = await axios.get(`${API}${listAPI.API_CategoryList}`);
        setState({ ...state, categories: response.data });
    };

    const confirmDelete = (e, slug) => {
        e.preventDefault();
        // console.log('delete > ', slug);
        let answer = window.confirm('Are you sure you want to delete?');
        if (answer) {
            handleDelete(slug);
        }
    };

    const handleDelete = async slug => {
        try {
            let apiURL = `${API}${listAPI.API_CategoryDelete}`.replace(":slug", slug);
 
            const response = await axios.delete(apiURL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            loadCategories();
        } catch (error) {
            console.log(error);
         }
    };

    const listCategories = () =>
        categories.map((c, i) => (
            <Link href={`${listPage.Page_Link_ListByCategory}/${c.slug}`} key={c.name}>
                <a style={{border: '1px solid #000080' }} className='bg-light p-3 col-md-4 m-1'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <img src={c.image && c.image.url} alt={c.name} style={{width: '100px', height: 'auto'}} className="pr-3"/>
                        </div>
                        <div className='col-md-6'>{c.name}</div>
                        <div className="col-md-3">
                            <Link href={`${listPage.Page_Category_Update}/${c.slug}`}>
                                <button className="btn btn-sm btn-outline-success btn-block mb-1">Update</button>
                            </Link>

                            <button
                                onClick={e => confirmDelete(e, c.slug)}
                                className="btn btn-sm btn-outline-danger btn-block"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </a>
            </Link>
        ));

    return (
        <Layout>
            <div className="row">
                <div className="col">
                    <h1>List of categories</h1>
                    <br />
                </div>
            </div>

            <div className="row">{listCategories()}</div>
        </Layout>
    );
};

export default withAdmin(List);
