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

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {

    const classes = useStyles();

    
    
    const schema = yup.object().shape({
        identifier: yup.string().required("Hãy nhập Email của bạn !").email('Hãy nhập Email hợp lệ !'),
        password: yup.string().required("Hãy nhập Password của bạn !"),
    });
    
    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
                Sign In
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)} > 
                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <Button 
               type="submit" className={classes.submit} variant="contained" style={{marginTop: '25px'}} size="large" disable={isSubmitting} fullWidth> {!isSubmitting && 'Sign In'}
               {isSubmitting && <CircularProgress className={classes.loading} />}
               </Button>
            </form>
        </div>
    );
}

export default LoginForm;