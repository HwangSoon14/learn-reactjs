import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

const useStyles = makeStyles(theme => ({
    root:{
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        margin: '10px 0',
        listStyleType: 'none',
        padding: 0,
        '& > li': {
            margin: 0,
            padding: '7px'
        }
    },
     
}))

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'FreeShippp !',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: filters => {},
        onToggle: (filters) => {
            const newFilters = {...filters};
            if(newFilters.isFreeShip) {
                delete newFilters.isFreeShip;
            }
            else {
                newFilters.isFreeShip = true;
            }

            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: () => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.isPromotion;
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 3,
        getLabel: (filters) => {
            if(filters.salePrice_lte && filters.salePrice_gte && filters.salePrice_lte === 25000000)
            return `Từ ${filters.salePrice_gte} trở lên` 
            else if(filters.salePrice_lte && filters.salePrice_gte) 
            return `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}` 
            return '';
        },// salePrice_gte: 0, salePrice_lte: 0,
        isActive: () => true,
        isVisible: filters => filters.salePrice_gte && filters.salePrice_lte,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.salePrice_lte;
            delete newFilters.salePrice_gte;
            return newFilters;
        },
        onToggle: () => {},
    },
]

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterViewer({filters = {} , onChange = null}) {
    const classes = useStyles();

    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters));
    } , [filters])
    return (
        <Box component="ul" className={classes.root}>
            {visibleFilters.map(x => (
                <li key={x.id}>
                    <Chip 
                      label={x.getLabel(filters)}
                       color={x.isActive(filters) ? 'primary' : 'default'}
                       clickable={!x.isRemovable}
                       onClick={x.isRemovable ? null : () => {
                            if(!onChange) return;

                            const newFilters = x.onToggle(filters);
                            onChange(newFilters);
                       }}
                       onDelete={x.isRemovable ? () => {
                           if(!onChange) return;

                           const newFilters = x.onRemove(filters);
                           onChange(newFilters);
                       } : null}
                     />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;