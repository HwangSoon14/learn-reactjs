import Pagination from '@mui/material/Pagination';
import { Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import {useHistory , useLocation} from 'react-router'
import queryString from 'query-string'
import React, { useEffect, useMemo, useState  } from 'react';
import productApi from '../../../API/productApi';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import ProductSkeletonText from '../components/ProductSkeletonText';
import FilterViewer from '../components/FilterViewer';

const useStyles = makeStyles(theme => ({
    root: {},
    left: {
        width: '250px',
    },
    right: {
        flex: '1 1 0',
    },
    center: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: '20px'
    }
}))

function ListPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);

        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,  
            _limit:  Number.parseInt(params._limit) || 9,
            _sort: params._sort ||  'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        };
    } , [location.search])
    const [productList , setProductList] = useState([]);
    const [pagination ,setPagination] = useState({
        page: 1,
        limit: 9,
        total: {
            data: 10,
        },
    })
    const [loading , setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const {data , pagination} = await productApi.getAll(queryParams);
                setProductList(data.data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list , ' , error);
            }
            setLoading(false);   
        })();    
    }, [queryParams])
    const handlePageChange = (e , page) => {
            const filters = {
                ...queryParams,
                _page: page,
            };

            history.push({
                pathname: history.location.pathname,
                search: queryString.stringify(filters),
            })
        };
    const handleSortChange = (newSortValue) => {    
            const filters = {
                ...queryParams,
                _sort: newSortValue, 
            };

            history.push({
                pathname: history.location.pathname,
                search: queryString.stringify(filters),
            })

        };
    const handleFiltersChange = (newFilters) => {
            const filters = {
                ...queryParams,
                ...newFilters, 
            };
            
            history.push({
                pathname: history.location.pathname,
                search: queryString.stringify(filters),
            })
    };
    const setNewFilters = (newFilters) => {
        history.push({
                pathname: history.location.pathname,
                search: queryString.stringify(newFilters),
            })
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            {loading ? <ProductSkeletonText length={7} /> : <ProductFilters filters={queryParams} onChange={handleFiltersChange} />}
                            
                        </Paper>
                    </Grid>

                    <Grid item className={classes.right}>

                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                            <FilterViewer filters={queryParams} onChange={setNewFilters} />
                            {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList}/>}
                            <Pagination className={classes.center} 
                                        color="primary" 
                                        count={Math.ceil(pagination.total.data / pagination.limit)}
                                        page={pagination.page} 
                                        onChange={handlePageChange}
                                        >
                            </Pagination>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;