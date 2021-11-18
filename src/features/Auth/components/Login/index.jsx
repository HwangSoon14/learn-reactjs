import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm';
Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            // Close dialog
            const {closeDialog } = props;
            if(closeDialog) {
                closeDialog();
            }
        } catch (error) {
            enqueueSnackbar('Failed to Login !!! :3' , {variant : 'error'})
        }
    };

    return (
        <div>
            <LoginForm onSubmit={handleSubmit}/> 
        </div>
    );
}

export default Login;