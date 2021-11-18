import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';
Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        
        try {
            values.username = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            // Close dialog
            const {closeDialog } = props;
            if(closeDialog) {
                closeDialog();
            }

            // Show succesfully Noti
            enqueueSnackbar('Đăng ký thành công !!! :3' , {variant : 'success'})

        } catch (error) {
            enqueueSnackbar('Email của bạn đã tồn tại !!! :3' , {variant : 'error'})
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/> 
        </div>
    );
}

export default Register;