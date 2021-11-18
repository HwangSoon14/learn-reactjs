import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/common';
import SlideShowImg from './SlideShowImg';
ProductThumnail.propTypes = {
    product: PropTypes.object,   
};

function ProductThumnail({product}) 
{   
    const thumbnailUrl = product.thumbnail ?
    `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;

    return (
        <Box>
            <img src={thumbnailUrl} alt={product.name} />
            <SlideShowImg img={thumbnailUrl}/>
        </Box>
        
        
    );
}

export default ProductThumnail;