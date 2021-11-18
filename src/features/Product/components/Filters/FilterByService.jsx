import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Checkbox, FormControlLabel,  Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        padding: '20px 0 10px 20px',
        borderTop: '2px solid #eee'
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin :0,
        '& > li': {
            margin: 0,
            marginTop: '5px'
        }
    },
    
}))

FilterByService.propTypes = {
    onChange: PropTypes.func,
};

function FilterByService({onChange , filters = {}}) {
    const classes = useStyles();
    // const [values , setValues] = useState({
    //     isPromotion: Boolean(filters.isPromotion), 
    //     isFreeShip: Boolean(filters.isFreeShip), 
    // })
    const handleChange = (e) => {
        if(!onChange) return;
        const {name , checked,} = e.target;
        // setValues(prev => ({
            //     ...prev,
            //     [name]: checked,
            // }))
            console.log({[name]: checked})
        onChange({[name]: checked})
    }
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DỊCH VỤ</Typography>
            <ul className={classes.list}>
                {[{value :'isPromotion' , label: 'Có Khuyến Mãi !' }, {value: 'isFreeShip' , label: 'Vận chuyển miễn phí !'}].map(service => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={Boolean(filters[service.value])}
                                onChange={handleChange}
                                name={service.value}
                                inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }   
                            label={service.label}
                        />
                    </li>
                    ))}
            </ul>
        </Box>
    );
}

export default FilterByService;