import { FormHelperText } from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
};

function PasswordField(props) {
     const {form, name , label , disable} = props;
     const {errors} = form;
     const hasError =  errors[name];

     const [showPassword , setShowPassword] = useState(false);

     const toggleShowPassword = () => {
         setShowPassword(x => !x)
     }

    return (
        <FormControl error={!!hasError} margin="normal" fullWidth variant="outlined">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Controller
            name={name}
            control={form.control}
            as={OutlinedInput}
            id={name}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            disable={disable}
            label={label}
          />

          <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
        </FormControl>
        
    );
}

export default PasswordField;