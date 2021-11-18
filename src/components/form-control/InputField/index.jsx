import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
};

function InputField(props) {
     const {form, name , label , disable} = props;
     const {errors} = form;
     const hasError =  errors[name];


    return (
        <Controller
            name={name}
            control={form.control}
            // as={TextField}

            render={({onChange, onBlur ,value , name,ref}) => (
                <TextField
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    label={label}
                    disable={disable}
                    error={!!hasError}
                    helperText = {errors[name]?.message}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                 />
            )}
            
        />
    );
}

export default InputField;