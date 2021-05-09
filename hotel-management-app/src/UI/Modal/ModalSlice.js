//lib imports
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice(
    {
        name: "modal",
        //Adding a pizza id for storing whose toppings are being added
        initialState: {
            value: false,
        },
        reducers:
        {
            //show modal stores the pizza id for customization
            showModal: ( state, action ) =>
            {
                state.value = true;
            },
            hideModal: ( state ) =>
            {
                state.value = false;
            }
        }
    }
);

export const { showModal, hideModal } = modalSlice.actions;
export const getModalState = ( state ) => state.modal.value;
export default modalSlice.reducer;