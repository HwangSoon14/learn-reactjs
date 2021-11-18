import { Paper } from '@mui/material';
import DOMPurify from 'dompurify';
import React from 'react';
ProductDescription.propTypes = {
    
};

function ProductDescription({product = {}}) {
    const  safeDescription = DOMPurify.sanitize(product.description)

    return (
        <Paper elevation={0} style={{padding: '15px' , paddingBottom: '40px'}}>
            <div dangerouslySetInnerHTML={{__html: safeDescription}} />
        </Paper>
    );
}

export default ProductDescription;