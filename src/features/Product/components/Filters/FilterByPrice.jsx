import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        padding: '20px 0 10px 20px',
        borderTop: '2px solid #eee'
    },
    flex: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px 10px 0 0',
        
    },
    space: {
        display: 'inline-block',
        margin: '0 15px 0 10px'
    },
    input: {
        padding: '15px'
    },
    span: {
        display: 'inline-block',
        padding: '3px 10px',
        marginTop: '10px',
        backgroundColor: '#eeeeee',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.25s linear',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#1976d2',
            
        }
    },
}))

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

function FilterByPrice({onChange ,filters= {} }) {
    const classes = useStyles();
    const [values , setValues] = useState({
        salePrice_gte: 0, 
        salePrice_lte: 0, 
    })
    const handleSubmit = () => {
       if(onChange) 
           onChange(values)
       setValues({salePrice_gte: 0, 
        salePrice_lte: 0, })
    }
    const handleChange = (e) => {
        const {name , value} = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleClickSpan1 = () => {
        if(!onChange) return;
        onChange({salePrice_gte: 50000 , salePrice_lte:25000000});
    }
    const handleClickSpan2 = () => {
        if(!onChange) return;
        onChange({ salePrice_lte:500000 ,salePrice_gte: 50000});
    }
    const handleClickSpan3 = () => {
        if(!onChange) return;
        onChange({salePrice_gte: 500000 , salePrice_lte:25000000});
    }
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">GIÁ</Typography>
            <span className={classes.span} onClick={handleClickSpan1}>Trên 50.000</span>
            <span className={classes.span} onClick={handleClickSpan2}>Từ 50.000 - 500.000</span>
            <span className={classes.span} onClick={handleClickSpan3}>Trên 500.000</span>


            <Box className={classes.flex}>
                <TextField className={classes.input} variant="standard" name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange}/>
                <span className={classes.space}>-</span>
                <TextField className={classes.input} variant="standard" name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange}/>
            </Box>

            <Button variant="outlined" color="primary" onClick={handleSubmit}>Áp Dụng</Button>
        </Box>
    );
}

export default FilterByPrice;