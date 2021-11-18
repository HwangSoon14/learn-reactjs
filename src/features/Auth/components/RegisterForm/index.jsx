import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-control/InputField';
import PasswordField from '../../../../components/form-control/PasswordField';

const useStyles = makeStyles(theme => ({
    root:{
        padding: "25px 0",
    },
    avatar:{
        margin: '0 auto',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    title: {
        textAlign: 'center',
        padding: '15px 0'
    },
    loading: {
        color: 'white',
    }
}));

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {

    const classes = useStyles();

    
    
    const schema = yup.object().shape({
        fullName: yup.string()
        .required('Hãy nhập đầy đủ tên của bạn !')
        .test('Nhập ít nhất 2 kí từ !', 'Hãy nhập ít nhất 2 từ !' , value => {
            return value.split(' ').length >= 2
        }),
        email: yup.string().required("Hãy nhập Email của bạn !").email('Hãy nhập Email hợp lệ !'),
        password: yup.string().required("Hãy nhập Password của bạn !").min(6 , "Hãy nhập ít nhất 6 kí tự !"),
        retypePassword: yup.string().required('Hãy nhập lại password của bạn !').oneOf([yup.ref('password')] , 'Hãy nhập lại password của bạn !')
    });
    
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    });
    
    const {isSubmitting} = form.formState;

    const handleSubmit = async (values) => {
        const {onSubmit} = props;
        if(onSubmit) {
            await onSubmit(values);
        }
    }

    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography className={classes.title} component="h3" variant="h5" >
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)} > 
                <InputField name="fullName" label="Full Name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype Password" form={form} />
                <Button 
               type="submit" className={classes.submit} variant="contained" style={{marginTop: '25px'}} size="large" disable={isSubmitting} fullWidth> {!isSubmitting && 'Create An Account'}
               {isSubmitting && <CircularProgress className={classes.loading} />}
               </Button>
            </form>
        </div>
    );
}

export default RegisterForm;