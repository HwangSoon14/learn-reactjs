import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
const useStyles = makeStyles(theme => ({
    root: {
        borderBottom: '1.6px solid #eee',
    },
    priceBox: {
        backgroundColor: '#eeeeee',
        borderRadius: '10px'
    },
    salePrice: {
        fontWeight: 'bold',
        fontSize: '40px',
        color: '#ff424e'
    },
    originalPrice: {
        color: '#8f8f97',
        textDecorationLine: 'line-through',
        fontSize: '18px'
    },
    promotionPercent: {
        color: '#ff424e',
        fontSize: '16px',
        fontWeight: '500',
        backgroundColor: '#fff0f1',
        borderRadius: '5px',
        border: '1px solid #fff0f1'
    },
}))

ProductInfo.propTypes = {
    product: PropTypes.object,
};

function ProductInfo({product = {}}) {

    const classes = useStyles();
    const {name , shortDescription , salePrice , originalPrice , promotionPercent} = product;
    return (
        <Box className={classes.root} pb={3} >
            <Typography component="h1" variant="h4">{name}</Typography>
            <Typography variant="body2" mt={3} mb={3} className={classes.description}>{shortDescription}</Typography>

            <Box className={classes.priceBox} p={1}>
                <Box component="span" m={2} className={classes.salePrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice)}</Box>
                {promotionPercent > 0 && (
                    <>
                        <Box component="span" m={2} className={classes.originalPrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice)}</Box>
                        <Box component="span" m={0.5} p={0.5} className={classes.promotionPercent}>- {product.promotionPercent}%</Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default ProductInfo;