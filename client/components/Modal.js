import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../utils/alert';
 
import { API } from '../config';
import { listAPI } from '../listAPI';
import { listPage } from '../listPage';
import { listEnum } from '../listEnum';

const Modal = ({  id , title, body, onCancel, onContinue, dataId}) => {
    return (
        <div class="modal" id={id} key={dataId} >
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h3 class="modal-title">{title}</h3>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body text-left">
                    {body}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={onCancel}>Cancel</button>

                    <button type="button" class="btn btn-success" data-dismiss="modal" onClick={onContinue}>Continue</button>
                </div>

                </div>
            </div>
        </div>
    )
}

export default Modal;