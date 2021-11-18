import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import categoryApi from '../../../../API/categoryApi'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '10px 0 20px 20px'
    },

    menu: {
        listStyle: 'none'
    },

    item: {
        padding: '4px 0',
        cursor: 'pointer', 
        transition: 'all 0.25s linear',

        '&:hover': {
            color: '#1976d2'
        }
    },

}))
FilterByCategory.propTypes = {
    onChange: PropTypes.func,

};

function FilterByCategory({onChange}) {

    const [categoryList , setCategoryList] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        (async () => {
            try {
                const response = await categoryApi.getAll();
                const list = response.data;
                setCategoryList(list.map(x => ({
                    id: x.id,
                    name: x.name,
                    
                })));
            } catch (error) {
                console.log('Failed to fetch category list' , error);
            }

        })()
    }, [])

    const handleCategoryClick = (category) => {
        if(onChange) {
            onChange(category.id)
            console.log(category.id)
        }
    }
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2" >DANH MỤC SẢN PHẨM</Typography>

            <ul className={classes.menu}>
                {categoryList.map(category => 
                    <li className={classes.item}
                      key={category.id} 
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.name}
                    </li>
                )}
            </ul>
        </Box>
    );
}

export default FilterByCategory;