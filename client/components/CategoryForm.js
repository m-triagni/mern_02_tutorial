
import axios from 'axios';
import Link from 'next/link'
import Resizer from 'react-image-file-resizer';
import dynamic from 'next/dynamic';
import React, {useRef, useState, useEffect} from 'react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.bubble.css';

import { showSuccessMessage, showErrorMessage } from './../utils/alert';
import Modal from './Modal'

import { API } from '../config';
import { listAPI } from '../listAPI';
import { listPage } from '../listPage';
import { listEnum } from '../listEnum';


const CategoryForm = ({ token, category }) => {
      
    const buttonSaveState = ['Save', 'Submitting..'];
    const buttonImageState = ['Upload Image' ];

    const [imageUploadButtonName, setImageUploadButtonName] = useState(buttonImageState[0]);
    const [buttonSaveText, setButtonSaveText] = useState(buttonSaveState[0]);

    // state
    const [state, setState] = useState({
        _id: category ? category._id : undefined,
        name: category ? category.name : '',
        image: category ? category.image : '',
        imagePreview: category ? category.image.url : '',  
        isNewRecord: category ? false : true,
        success: '',
        error: '',
    });
    const [content, setContent] = useState(category ? category.content : '');
    const [imageURI, setImageURI] = useState(category ? category.image.url : '' );

    const {_id, name, image,  imagePreview, isNewRecord, error, success} = state
 
    
    const handleChangeImage = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setImageURI(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

        console.log(imageURI);
    }

    const handleChange = (attributeName) => (e) => { 
        setState({...state, [attributeName]: e.target.value, error:'', success:''  })
    };

    const handleChangeContent = e => {
        setContent(e);
        setState({ ...state, success: '', error: '' });
    };
  
    const handleSave = async e => {
        e.preventDefault();

        setButtonSaveText(buttonSaveState[1]);
  
         try { 
            const response = await axios.post(`${API}${listAPI.API_CategorySave}`, {_id, name, content, image, imageURI}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
 
            if (isNewRecord) {
                setState({
                    ...state,
                    _id: '',
                    name:  '',
                    image:   '',
                    isNewRecord:  true,
                    success: 'Category is created',
                    error: '',
                });
                setContent('');
                setImageURI('');
            }
            else {
                setState({
                    ...state, 
                    success: 'Category is updated',
                    error: '',
                });
            }
            setButtonSaveText(buttonSaveState[0])
            
        } catch (error) {
            console.log('category SUBMIT ERROR', error);
            setState({ ...state, error: error.response.data.error });
        }
    };
  
    const handleCancel = e => {
        location.href = listPage.Page_Admin ;
    };
 
 
    const showButtons = () => ( 
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <button className="btn btn-danger" type="button" data-toggle="modal" data-target="#cancelModal" >
                        Cancel
                    </button>
                    <Modal id='cancelModal' title='Cancel Confirmation' body='Are you sure to cancel to save this category ?' onContinue={(e) => handleCancel(e)}/>
                </div> 
                <div className="col-md-2">
                <button className="btn btn-warning" type="button" onClick={handleSave}>
                        {buttonSaveText}
                    </button> 
                </div> 
            </div> 
        </div> 
    );

    const CategoryForm = () => (
        <React.Fragment> 
            <div class="form-group">
                <label className="text-muted" for="title">Name</label>
                <input type="text" className="form-control" id="title"  placeholder="Enter name" required onChange={handleChange('name')} value={name} />
            </div>
            <div class="form-group mt-3">
                <label className="text-muted" for="content">Content</label>
                <ReactQuill value={content} onChange={handleChangeContent} placeholder="Write content here" className="pb-5 mb-3" theme="bubble" style={{border: '1px solid #666'}} />
            </div>
            <div class="form-group mt-3"> 
                <label className="text-muted" for="inputLabel">Image</label> 
                <div className='imgCategoryHolder'>
                    <img src={imageURI} alt='' id='imgCategory' className='imgCategory' />
                </div>
                <input id='input' type="file" style={{display: "none"}} accept="image/*" onChange={handleChangeImage}/>  
                <label id='inputLabel' htmlFor='input' className='imgCategoryButton text-muted text-center' >
                    Choose image
                </label>
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
                    {CategoryForm()} 
                </form>
            </div>
        </div>
    );
}

export default CategoryForm;