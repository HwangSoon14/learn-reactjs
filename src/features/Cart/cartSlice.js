import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: [],
    },
    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true;
        },
        hideMiniCart(state) {
            state.showMiniCart = false; 
        },
        addToCart(state,action) {
            const newItem = action.payload;
            const index = state.cartItems.findIndex(x => x.id === newItem.id);
            if(index >= 0) {
                //increase quantity
                state.cartItems[index].quantity += newItem.quantity; 
            }
            // add to cart
            else {
                state.cartItems.push(newItem)
            }
        },
        setQuantity(state, action) {
            const {id , quantity} = action.payload;
            const index = state.cartItems.findIndex(x => x.id === id);
            if(index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },
        removeFromCart(state,action) {
            const idNeedToRemove = action.payload.id;
            state.cartItems = state.cartItems.filter(x => x.id !== idNeedToRemove)
        }
    },
});
const {actions , reducer} = cartSlice;
export const {showMiniCart , hideMiniCart , setQuantity , removeFromCart , addToCart} = actions;
export default reducer;