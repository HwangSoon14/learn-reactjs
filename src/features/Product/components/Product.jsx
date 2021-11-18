import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import {STATIC_HOST , THUMBNAIL_PLACEHOLDER} from '../../../constants/common'
import {useHistory } from 'react-router'


Product.propTypes = {
    product: PropTypes.object,
};

function Product({product}) {
    const history = useHistory();
    const thumbnailUrl = product.thumbnail ?
    `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;

    const handleClick = () => {
        history.push(`/products/${product.id}`);
        console.log(product)
    }

    return (
        <Box padding={1} onClick={handleClick} >
            <Box padding={1} minHeight="215px">
                <img src={thumbnailUrl} alt={product.name} />
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
            <Box component="span" fontSize="16px" fontWeight="bold" mr={1} > 
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
            </Box>
             {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ''}</Typography>
        </Box>
    );
}

export default Product;