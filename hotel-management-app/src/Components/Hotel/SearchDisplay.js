import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterSearchSlice, setChildrenReducer } from 'Components/Hotel/HotelSlice';
import { TextField } from '@material-ui/core';
import styles from 'Components/Hotel/Hotel.module.css';
import { Button } from 'react-bootstrap';
import { updateAdults, updateRooms } from 'Components/Hotel/HotelSlice';
const SearchDisplay = () =>
{
    const dispatch = useDispatch();

    const filterResults = useSelector( state => state.hotel.filteredSearch );
    const [filterSearch, setFilterSearch] = useState( filterResults );
    const [children, setChildren] = useState( useSelector( state => state.hotel.children ) );
    const [showDiv, setShowDiv] = useState( 'none' );
    const handleChange = ( e ) =>
    {
        setFilterSearch( prevFilter => (
            {
                ...prevFilter,
                [e.target.name]: e.target.value
            }
        ) );
    }





    return ( <div className={styles.searchBar}>
        <div className={styles.blockDisplay}>
            <label htmlFor="searchText">Area , Location or Landmark</label>
            <TextField
                id="searchText"
                onChange={( e ) => { handleChange( e ) }}
                name="searchText"
                defaultValue={filterSearch.searchText}
            />
        </div>
        <div style={{ left: "0", width: "30%", marginRight: "10px", color: "white" }}>
            <label htmlFor="checkIn">Check In</label>
            <br />
            <TextField
                style={{ color: "white" }}
                onChange={( e ) => { handleChange( e ) }}
                name="checkIn"
                id="date"
                type="date"
                defaultValue={filterSearch.checkIn}
                inputProps={{
                    min: filterSearch.checkIn,
                    max: filterSearch.checkOut
                }}
                variant="standard"
            />

        </div>
        <div style={{ right: "0", width: "30%" }}>
            <label htmlFor="checkOut">Check Out</label>
            <br />
            <TextField
                name="checkOut"
                onChange={( e ) => { handleChange( e ) }}
                disablePast
                id="date"
                type="date"
                defaultValue={filterSearch.checkOut}
                inputProps={{
                    min: filterSearch.checkOut
                }}
            />
        </div>
        <div className={styles.blockDisplay}>
            <label htmlFor="guests">Guests Information</label>
            <TextField
                onClick={() =>
                {
                    setShowDiv( 'block' );
                }}
                name="guests"
                value={( filterResults.adults + filterResults.children ) + " Guests In " + filterResults.rooms + " Rooms"}
            />
        </div>
        <Button
            style={{
                backgroundColor: "white",
                color: "black",
                height: "50px",
                width: "300px",
                borderRadius: "20px",
                marginRight: "20px"
            }}
            onClick={() =>
            {
                dispatch( setFilterSearchSlice( filterSearch ) );
            }}
        >Update Search</Button>

        <span>
            <div style={{
                color: "black",
                display: showDiv,
                height: "300px",
                width: "300px",
                marginTop: "74px",
                marginRight: "1px",
                backgroundColor: "white",
                boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                borderRadius: "20px"

            }}>
                <strong style={{ marginTop: "20px", marginLeft: "90px" }}>Update Guests</strong>
                <div style={{ display: "block", textAlign: "center", color: "black" }}>

                    <lable style={{ textAlign: "center" }}>Adults</lable>
                    <br />
                    <Button>-</Button>
                    <Button>{filterResults.adults}</Button>
                    <Button
                        name="incrementAdults"
                        onClick={() =>
                        {
                            dispatch( updateAdults() );
                        }
                        }
                    >+</Button>

                </div>
                <div style={{ display: "block", textAlign: "center", color: "black" }}>

                    <lable style={{ textAlign: "center" }}>Rooms</lable>
                    <br />
                    <Button>-</Button>
                    <Button>{filterResults.rooms}</Button>
                    <Button
                        onClick={() =>
                        {
                            if ( filterSearch.rooms < 8 )
                            {
                                dispatch( updateRooms() );
                            }

                        }
                        }
                    >+</Button>
                </div>
                <Button
                    style={{
                        backgroundColor: "dodgerblue",
                        color: "black",
                        height: "50px",
                        width: "150px",
                        borderRadius: "20px",
                        marginTop: "100px",
                        marginLeft: "80px"

                    }}
                    onClick={() =>
                    {
                        setShowDiv( "none" );
                    }}
                >Done</Button>
            </div>
        </span>
    </div>

    );
};

export default SearchDisplay;