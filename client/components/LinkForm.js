import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.bubble.css';

import { showSuccessMessage, showErrorMessage } from './../utils/alert';
import Modal from './Modal'

import { API } from '../config';
import { listAPI } from '../listAPI';
import { listPage } from '../listPage';
import { listEnum } from '../listEnum';

const LinkForm = ({ token, link }) => {
  
    // state
    const [state, setState] = useState({
        _id: link ? link._id : undefined,
        title: link ? link.title : '',
        url: link ? link.url : '',
        categories: link ? link.categories : '',
        allCategories: [],
        type: link ? link.type : '',
        medium: link ? link.medium : '',
        difficulty: link ? link.difficulty : '', 
        isNewRecord: link ? false : true,
        success: '',
        error: '',
    });
    const [description, setDescription] = useState(link ? link.description : '');

    const { _id, title, url,   categories, allCategories, type, medium, difficulty, success, error, isNewRecord } = state;

    // load categories when component mounts using useEffect
    useEffect(() => {
        loadCategories();
    }, [success]);

    const loadCategories = async () => {
        const response = await axios.get(`${API}${listAPI.API_CategoryList}`);

        setState({ ...state, allCategories: response.data });
    };

    const handleChange = (attributeName) => (e) => { 
        setState({...state, [attributeName]: e.target.value, error:'', success:''  })
    };

    const handleChangeDescription = e => {
        setDescription(e);
    };

    const handleToggle = c => () => {
        // return the first index or -1
        const clickedCategory = categories.indexOf(c);
        
        const checkedCategories = [...categories];

        if (clickedCategory === -1) {
            //if checked category is not exists, add
            checkedCategories.push(c);
        } else {
            //if checked category is exists, remove it
            checkedCategories.splice(clickedCategory, 1);
        }

        setState({ ...state, categories: checkedCategories, success: '', error: '' });
    };

    const handleSave = async e => {
        e.preventDefault();
  
         try { 
            const response = await axios.post(`${API}${listAPI.API_LinkSave}`, { _id, title, url, description, categories, type, medium, difficulty }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (isNewRecord) {
                setState({
                    ...state,
                    title: '',
                    url: '', 
                    categories: [],
                    type: '',
                    medium: '',
                    difficulty: '',
                    success: 'Link is created',
                    error: '',
                });
                setDescription('')
            }
            else {
                setState({
                    ...state, 
                    success: 'Link is updated',
                    error: '',
                });
            }

            
        } catch (error) {
            console.log('LINK SUBMIT ERROR', error);
            setState({ ...state, error: error.response.data.error });
        }
    };
  
    const handleCancel = e => {
        location.href = listPage.Page_User ;
    };

    const showCategories = () => {
        return (
            allCategories &&
            allCategories.map((c, i) => (
                <React.Fragment>
                    <input type="checkbox"  
                        id={c.slug} name="switch-c" value={c.slug} 
                        checked={categories.includes(c._id)} onChange={handleToggle(c._id)}/>
                    <label for={c.slug}>{c.name}</label> 
                </React.Fragment>
            ))
              
        ); 
    };
 
    const showMedium = () => (
        <React.Fragment>
            <div class="switch-field">
                <input type="radio" id="switch-m-1" name="switch-medium" value="blog" checked={medium === 'blog'} onClick={handleChange('medium')}/>
                <label for="switch-m-1">Blog</label>

                <input type="radio" id="switch-m-2" name="switch-medium" value="video" checked={medium === 'video'} onClick={handleChange('medium')}/>
                <label for="switch-m-2">Video</label>

                <input type="radio" id="switch-m-3" name="switch-medium" value="book" checked={medium === 'book'} onClick={handleChange('medium')}/>
                <label for="switch-m-3">Book</label>
            </div> 
        </React.Fragment>
    );
 
    const showTypes = () => (
        <React.Fragment>
            <div class="switch-field">
                <input type="radio" id="radio-one" name="switch-type" value="free" checked={type === 'free'} onClick={handleChange('type')}/>
                <label for="radio-one">Free</label>

                <input type="radio" id="radio-two" name="switch-type" value="paid" checked={type === 'paid'} onClick={handleChange('type')}/>
                <label for="radio-two">Paid</label>
            </div> 
        </React.Fragment>
    );
 
    const showDifficulty = () => (
        <React.Fragment>
             <div class="switch-field">
                <input type="radio" id="d-1" name="switch-d" value="beginner" checked={difficulty === 'beginner'} onClick={handleChange('difficulty')}/>
                <label for="d-1">Beginner</label>

                <input type="radio" id="d-2" name="switch-d" value="intermediate" checked={difficulty === 'intermediate'} onClick={handleChange('difficulty')}/>
                <label for="d-2">Intermediate</label>

                <input type="radio" id="d-3" name="switch-d" value="advance" checked={difficulty === 'advance'} onClick={handleChange('difficulty')}/>
                <label for="d-3">Advance</label>
            </div> 
        </React.Fragment>
    );
 
    const showButtons = () => ( 
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <button className="btn btn-danger" type="button" data-toggle="modal" data-target="#cancelModal" >
                        Cancel
                    </button>
                    <Modal id='cancelModal' title='Cancel Confirmation' body='Are you sure to cancel to update this link ?' onContinue={(e) => handleCancel(e)}/>

                </div> 
                <div className="col-md-2">
                <button className="btn btn-warning" type="button" onClick={handleSave}>
                        Save
                    </button> 
                </div> 
            </div> 
        </div> 
    );

    const linkForm = () => (
        <React.Fragment> 
            <div class="form-group">
                <label className="text-muted" for="title">Title</label>
                <input type="text" className="form-control" id="title"  placeholder="Enter title" required onChange={handleChange('title')} value={title} />
            </div>
            <div class="form-group mt-3">
                <label className="text-muted" for="url">URL</label>
                <input type="text" className="form-control" id="url"  placeholder="Enter URL" required onChange={handleChange('url')} value={url}/>
            </div>
            <div class="form-group mt-3">
                <label className="text-muted" for="description">Description</label>
                <ReactQuill id="description" value={description} onChange={handleChangeDescription} placeholder="Enter description" className="pb-5 mb-3" theme="bubble" style={{border: '1px solid #666'}} />
            </div>
            <div className="form-group mt-3">
                <label className="text-muted">Type</label>
                {showTypes()}
            </div>
            <div className="form-group mt-3">
                <label className="text-muted">Medium</label>
                {showMedium()}
            </div>
            <div className="form-group mt-3">
                <label className="text-muted">Difficulty</label>
                {showDifficulty()}
            </div>
            <div class="form-group mt-3" >
                <label className="text-muted" for="category">Category</label>
                <div class="switch-field">
                    {showCategories()}
                </div>
            </div>
            <div className="form-group mt-3"> 
                {showButtons()}
            </div>
 
        </React.Fragment>
    );

    return  (
        <div className="row justify-content-center"> 
            <div className="col-lg-6 mt-4 mt-lg-0">
                <form className="php-email-form w-100" >
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {linkForm()} 
                </form>
            </div>
        </div>
    );
}

export default LinkForm;