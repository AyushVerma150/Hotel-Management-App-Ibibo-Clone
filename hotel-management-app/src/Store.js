import { configureStore } from '@reduxjs/toolkit';
import HotelReducer from '../src/Components/Hotel/HotelSlice';
import ModalReducer from 'UI/Modal/ModalSlice';
import UserReducer from 'Components/User/UserSlice';
export default configureStore(
    {
        reducer:
        {
            hotel: HotelReducer,
            modal: ModalReducer,
            user: UserReducer
        }
    }
);