import { Skeleton } from '@material-ui/lab';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
ProductSkeletonText.propTypes = {
    length: PropTypes.number,
};
ProductSkeletonText.defaultProps = {
    length: 6,
}
function ProductSkeletonText({length}) {
    return (
        <Box>
            {Array.from(new Array(length)).map((x,index) => (
                    <Box key={index} padding={1}>
                            <Skeleton variant="text" width="90%" />
                    </Box>
                ))}
        </Box>
    );
}

export default ProductSkeletonText;