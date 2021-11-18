import { Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { addToCart } from '../../Cart/cartSlice';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReview from '../components/ProductReview';
import ProductThumnail from '../components/ProductThumnail';
import useProductDetail from '../hooks/useProductDetail';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    left: {
        width: '400px',
        padding: '12px',
        borderRight: '3px solid #eee'
    },
    right: {
        flex: '1 1 0',
        padding: '12px',
    },
    center: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: '20px'
    },
    animation: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%)',
    }
}))

DetailPage.propTypes = {
    
};

function DetailPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {params: {productId} , url} = useRouteMatch();
    
    const {product , loading} = useProductDetail(productId);
    if(loading) {
        return  <ReactLoading className={classes.animation} type="spinningBubbles" color="#1976d2" height={120} width={70} />
            
    }
    const handleAddToCartSubmit = ({quantity}) => {
        const action = addToCart({
            id: product.data.id,
            product: product.data,
            quantity,
        });
        dispatch(action)
    }
    return (
        
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumnail product={product.data}/>
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product.data} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit}/>
                        </Grid>
                    </Grid>
                </Paper>

                <ProductMenu />

                <Switch>
                    <Route exact path={url}>
                        <ProductDescription product={product.data} />
                    </Route>
                    <Route exact path={`${url}/additional`}>
                        <ProductAdditional product={product.data} />
                    </Route>
                    <Route exact path={`${url}/reviews`}>
                        <ProductReview product={product.data} />
                    </Route>
                </Switch>
            </Container>
        </Box>
    
    );
}

export default DetailPage;