import React from 'react';
import { Box } from '@mui/system';
import { Link } from '@mui/material';
import { NavLink , useRouteMatch} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        pading: 0,
        listStyleType: 'none',
        '& > li': {
            padding: '16px 32px'
        },
        '& > li > a': {
            textDecoration: 'none',
            color: 'black',
            fontSize: '18px',
            fontWeight: '400'
        },
        '& > li > a.active': {
            color: '#1976d2',
            borderBottom: '2px solid #1976d2',
            borderRadius: '3px',
            fontWeight: '500',
            transition: 'all 0.15s linear'
        },
    },

}))

function ProductMenu(props) {

    const classes = useStyles();
    const {url} = useRouteMatch();
    return (
        <Box component="ul" className={classes.root} mt={8}>
            <li>
                <Link component={NavLink} to={url} exact pb={0.5}>Description</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`} exact pb={0.5}>Additional Infomation</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`} exact pb={0.5}>Reviews</Link>
            </li>
        </Box>
    );
}

export default ProductMenu;