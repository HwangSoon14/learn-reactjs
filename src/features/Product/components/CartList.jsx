import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import CartItem from './CartItem';
import { makeStyles } from '@mui/styles';

CartList.propTypes = {
    items: PropTypes.array,
};
const useStyles = makeStyles(theme => ({
    root: {
        listStyle: 'none'
    }
}))
function CartList({items}) {
    const classes = useStyles();
    return (
        <Box>
            <ul className={classes.root}>
            {items.map(item => (
                <li  key={item.id}>
                        <CartItem item={item} />  
                </li>
            ))}
            </ul>
        </Box>
    );
}

export default CartList;