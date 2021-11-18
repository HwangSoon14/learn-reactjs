import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import CartItem from './CartItem';

CartList.propTypes = {
    items: PropTypes.array,
};

function CartList({items}) {
    return (
        <Box>
            {items.map(item => (
                <Box>
                    <div key={item.id}>
                        <CartItem item={item} />
                    </div>
                </Box>
            ))}
        </Box>
    );
}

export default CartList;