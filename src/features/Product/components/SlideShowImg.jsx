import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
SlideShowImg.propTypes = {
    img: PropTypes.string,
};

function SlideShowImg({img}) {
    const images = [
        {
            thumbnail: img,
        },
        {
            thumbnail: img,
        },
        {
            thumbnail: img,
        },
        {
            thumbnail: img,
        },
    ];
    return (
        <Box>
             <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} showNav={false}/>
        </Box>
    );
}
export default SlideShowImg;
