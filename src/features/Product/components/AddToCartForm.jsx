import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import QuantityField from '../../../components/form-control/QuantityField';


AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm(props) {
    const schema = yup.object().shape({
       quantity: yup.number().required('Không được bỏ trống ô này').min(1, 'Số lượng mua không thể nhỏ hơn 1').typeError('Vui lòng nhập chữ số !'),
    });
    
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });
    const handleSubmit = async (values) => {
        const {onSubmit} = props;
        if(onSubmit) {
            await onSubmit(values);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}> 
            <QuantityField name="quantity" label="Quantity" form={form} />

            <Button
                type="submit" 
                variant="contained" 
                color="primary"
                size="large" 
                style={{width: '250px' , marginTop: '15px'}}
                 
                >
                Thêm Vào Giỏ Hàng
           </Button>
        </form>
    );
}

export default AddToCartForm;