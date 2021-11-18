import { FormHelperText } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {  Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
};
const useStyles = makeStyles(theme => ({
  root: {},
  box: {
    maxWidth: '200px',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  text:{}

}))

function QuantityField(props) {
  const classes = useStyles();
     const {form, name , disable} = props;
     const {errors , setValue} = form;
     const hasError =  errors[name];
    return (
        <FormControl error={!!hasError} margin="normal" fullWidth variant="outlined" size="small">
        <Typography className={classes.text} mb={1} ml={1}>Số lượng</Typography>
          <Controller
            name={name}
            control={form.control}
            render={({onChange , onBlur , value , name}) => (
              <Box className={classes.box}>
               
                 <IconButton>
                  <RemoveCircleOutlineIcon onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 0)}/>
                 </IconButton>

                <OutlinedInput 
                  id={name}
                  type="number"
                  disable={disable}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <IconButton>
                  <AddCircleOutlineIcon onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}/>
                </IconButton>
              </Box>

              
            )}
          />

          <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
        </FormControl>
        
    );
}

export default QuantityField;