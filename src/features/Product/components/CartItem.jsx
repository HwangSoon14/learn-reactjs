import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/common';
import { removeFromCart, setQuantity } from '../../Cart/cartSlice';
CartItem.propTypes = {
    item: PropTypes.object,
};
 
const useStyles = makeStyles(theme => ({
    root: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    img: {
        width: '80px',
        height: '80px',
        borderRadius: '5px'
    },
    left: {
        display: 'flex' ,
        alignItems: 'stretch',
        flexFlow: 'row nowrap'
    },
    name: {
        display: 'inline-block',
        fontSize: '16px',
        fontWeight: '400',
        margin: '8px 0  0 25px'
    },
    originalPrice: {
        display: 'inline-block',
        color: '#8f8f97',
        textDecorationLine: 'line-through',
        fontSize: '12px',
        marginLeft: '5px'
    },
    right: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
    },
    quantity: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        padding: '3px',
    },
    borderSpan: {   
        display: 'inline-block',
        padding: '3px'
    },
    boxCircle: {
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'row nowrap',
        border: '1px solid #cfcfcf',
        borderRadius: '3px',
        cursor: 'pointer',
        margin: '0 60px'
    },
    textCircle: {
        display: 'inline-block',
        padding: '0 10px',
        margin: '0 5px',
        borderLeft: '1px solid #cfcfcf',
        borderRight: '1px solid #cfcfcf',
        cursor: 'context-menu'
    },
    handlePrice: {
        display: 'inline-block',
        color: '#fb4c53',
        fontSize: '14px',
        fontWeight: 500
    },
    garbage: {
        cursor: 'pointer',
        marginLeft: '50px'
    }
    
}))

function CartItem({item}) {
    const urlGarbage = 'https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg'
    const classes = useStyles();
    const dispatch = useDispatch();
    const thumbnailUrl = item.product.thumbnail ?
    `${STATIC_HOST}${item.product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
    const handleDecrease = () => {
        let quantity = item.quantity;
        if(quantity > 1) {
            --quantity;
        }
        const action = setQuantity({
            id: item.id,
            quantity: quantity,
        })
        dispatch(action);

    }

    const handleIncrease = () => {
        let quantity = item.quantity;
        ++quantity;
        const action = setQuantity({
            id: item.id,
            quantity: quantity,
        })
        dispatch(action);
    }
        
    const handleGarbageClick = () => {
        const idRemove = item.id;
        const action = removeFromCart({id: idRemove})
        dispatch(action);
    }
    const handlePrice = (price , quantity) => {
        return price * quantity;
    }

    return (
        <Box className={classes.root} mt={7}>
            <Box className={classes.left}>
                <img className={classes.img} src={thumbnailUrl} alt={item.product.name} />
                <span className={classes.name}>{item.product.name}</span>
            </Box>
            <Box className={classes.right}>
                    {item.product.promotionPercent > 0 
                    ?
                        <div>
                            <span style={{fontWeight: 500}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.salePrice)}</span> 
                            <span className={classes.originalPrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.originalPrice)}</span> 
                        </div>
            
                    : <span style={{fontWeight: 500 }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.originalPrice)}</span> 
                    }
                    <div className={classes.boxCircle}>
                       <RemoveIcon onClick={handleDecrease}/>
                       <span className={classes.textCircle}>{item.quantity}</span>
                       <AddIcon onClick={handleIncrease}/>
                    </div>

                    <span className={classes.handlePrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(handlePrice(item.product.salePrice, item.quantity))}</span>

                    <div className={classes.garbage} onClick={handleGarbageClick}>
                        <img src={urlGarbage} alt="garbage-img" />
                    </div>
                    {console.log(item)}
            </Box>
        </Box>
    );
}

export default CartItem;