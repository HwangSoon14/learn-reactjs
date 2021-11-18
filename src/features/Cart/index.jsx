import { Button, Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import store from '../../app/store';
import CartList from '../Product/components/CartList';
import { cartItemsCountSelector, cartTotalSelector } from './selectors';
CartFeature.propTypes = {
    
};
const useStyles = makeStyles(theme => ({
    root: {},
    left: {
        flex: '1 1 0',
    },
    right: {
        width: '300px',
    },
    center: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: '20px'
    },
    totalText: {
        display: 'inline-block',
        color: '#fb4c53',
        fontWeight: '500',
        fontSize: '35px',
        marginLeft: '15px'
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '20px',
        justifyContent: 'center'
    },
    wrapper: {
        display: 'block',
        padding: '8px 0px 0px 15px',
        marginBottom: '15px',
    }
    
    
}))
function CartFeature(props) {
    const items = store.getState().cart.cartItems;
  
    const total = useSelector(cartTotalSelector);
    const count = useSelector(cartItemsCountSelector);

    const classes = useStyles();
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <CartList items={items} />
                        </Paper>
                    </Grid>

                    <Grid item className={classes.right} mt={7}>
                        <Paper elevation={0} p={2}>
                                <span className={classes.wrapper} >Tổng cộng :
                                    <span className={classes.totalText}
                                    >
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                                    </span>
                                </span>
                                <Button variant="contained" color="error" fullWidth >Mua Hàng ({count})</Button>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}

export default CartFeature;