import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import { createBooking } from 'Components/Hotel/HotelSlice';
import moment from 'moment'
import { Button } from 'react-bootstrap'

const Checkout = () =>
{

    const dispatch = useDispatch();

    const selectedHotels = useSelector( state => state.hotel.hotelSelected );
    const currentUser = useSelector( state => state.user.currentUser );
    console.log( currentUser );
    const [content, setContent] = useState( null );
    const startDate = moment( selectedHotels[0].checkIn, 'YYYY-MM-DD' );
    const endDate = moment( selectedHotels[0].checkOut, 'YYYY-MM-DD' );
    const days = endDate.diff( startDate, 'days' );
    console.log( days );
    // console.log( array.map( x => parseInt( x ) ) );
    const roomCharges = selectedHotels[0].discountPrice;
    const rooms = selectedHotels[0].rooms;
    const nightsSpent = days;
    const discount = selectedHotels[0].price - selectedHotels[0].discountPrice;
    const tax = 498;
    const bookingStatus = useSelector( state => state.hotel.bookingStatus );

    const handleCreateBooking = () =>
    {
        const bookingsData =
        {
            amount: ( ( roomCharges * days ) - discount + tax ),
            roomsBooked: rooms,
            adults: selectedHotels[0].adults,
            children: selectedHotels[0].children,
            checkIn: selectedHotels[0].checkIn,
            checkOut: selectedHotels[0].checkOut,
            primaryGuest: currentUser.userName,
            modeOfPayment: "online",
            hotelId: selectedHotels[0].id,
            userId: currentUser.id

        }

        console.log( bookingsData );
        dispatch( createBooking( bookingsData ) );
    };


    useEffect( () =>
    {
        if ( bookingStatus === "success" )
        {
            setContent( <div style={{ height: "40px", width: "50%", fontFamily: "Poppins", color: "green", marginLeft: "25%" }}><strong>Booking Made Successfully</strong></div> )
        }
        else if ( bookingStatus === "failed" )
        {
            setContent( <div style={{ height: "40px", width: "50%", fontFamily: "Poppins", color: "red", marginLeft: "25%" }}><strong>Booking Failed</strong></div> );

        }
    } )




    return (
        <div>
            {/* //outer most div */}
            <div style={{ backgroundColor: "dodgerblue", height: "300px" }}>
                {
                    content
                }
            </div>
            <div style={{ display: "flex", backgroundColor: "transparent", marginTop: "-279px" }}>
                <div style={{
                    color: "black",
                    display: "block",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    left: "0",
                    width: "60%",
                    marginLeft: "30px",
                    marginRight: "30px",
                    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}>
                    {
                        selectedHotels.map( hotel =>
                        {
                            return <Card style={{ border: "none", color: "black", boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                                <label style={{ fontFamily: "Poppins", fontSize: "1.2rem", padding: "5px" }}><strong>Hotel Info</strong></label>
                                <hr style={{ backgroundColor: "gray" }} />
                                <Card.Body>
                                    <Card.Img
                                        style={{ height: "200px", width: "50%" }}
                                        src="https://cdn1.goibibo.com/voy_ing/t_g/81ad700a81ee11e486f9daf4768ad8d9.jfif"
                                        alt="not available" />
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                            <strong style={{ fontFamily: "Poppins" }}>Name</strong>
                                            <p
                                                style={{
                                                    fontFamily: "Poppins",
                                                    color: "black"
                                                }}>{hotel.name}</p>
                                        </div>
                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-map-marked-alt"></i> Locate On Map</strong>
                                            <p style={{ fontFamily: "Poppins" }}>{hotel.location}</p>
                                        </div>

                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "flex", fontSize: "1rem", color: "black" }}>
                                            <div style={{ left: "0", width: "20%" }}>
                                                <strong style={{ fontFamily: "Poppins" }}> Check In</strong>
                                                <p style={{ fontFamily: "Poppins" }}>{hotel.checkIn}</p>
                                            </div>
                                            <div style={{ right: "0", width: "20%" }}>
                                                <strong style={{ fontFamily: "Poppins" }}>Check Out</strong>
                                                <p style={{ fontFamily: "Poppins" }}>{hotel.checkOut}</p>
                                            </div>
                                            <div style={{ right: "0", width: "20%" }}>
                                                <strong style={{ fontFamily: "Poppins" }}>Guests</strong>
                                                <p style={{ fontFamily: "Poppins" }}>{hotel.adults + hotel.children + " Guests " + " | " + hotel.rooms + " Room"}</p>
                                            </div>
                                        </div>

                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                            <strong style={{ fontFamily: "Poppins" }}> Room Selected</strong>
                                            <p style={{ fontFamily: "Poppins" }}>{hotel.type + " " + "x" + hotel.rooms}</p>
                                        </div>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        } )
                    }
                </div>
                <div style={{
                    height: "300px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    right: "0",
                    width: "30%",
                    marginLeft: "10px",
                    marginRight: "30px",
                    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}>

                    <Card style={{ border: "none", color: "black" }}>
                        <label style={{ fontFamily: "Poppins", fontSize: "1.2rem", padding: "5px" }}><strong>Price Summary</strong></label>
                        <hr style={{ backgroundColor: "gray" }} />
                        <Card.Body>
                            <Card.Title>
                                <div style={{ display: "flex", fontSize: "1rem", color: "black" }}>
                                    <div style={{ left: "0", width: "80%" }}>
                                        <strong style={{ fontFamily: "Poppins" }}>Room Charges ({rooms + " rooms x " + nightsSpent + " nights"})</strong>

                                    </div>
                                    <div style={{ right: "0", width: "20%" }}>
                                        <strong style={{ fontFamily: "Poppins" }}>{"Rs. " + ( roomCharges * nightsSpent )}</strong>
                                    </div>
                                </div>

                            </Card.Title>
                            <Card.Title>
                                <div style={{ display: "flex", fontSize: "1rem", color: "black" }}>
                                    <div style={{ left: "0", width: "80%" }}>
                                        <strong style={{ fontFamily: "Poppins" }}>Discount</strong>

                                    </div>
                                    <div style={{ right: "0", width: "20%" }}>
                                        <strong style={{ fontFamily: "Poppins" }}>{"Rs. " + discount}</strong>
                                    </div>
                                </div>

                            </Card.Title>
                            <Card.Title>
                                <div style={{ display: "flex", fontSize: "1rem", color: "black" }}>
                                    <div style={{ left: "0", width: "80%" }}>
                                        <strong style={{ fontFamily: "Poppins" }}>Taxes and Fees</strong>

                                    </div>
                                    <div style={{ right: "0", width: "20%" }}>
                                        <strong style={{ fontFamily: "Poppins" }}>{"Rs. " + "498"}</strong>
                                    </div>
                                </div>

                            </Card.Title>
                            <hr />
                            <Card.Title>
                                <div style={{ display: "flex", fontSize: "1rem", color: "black" }}>
                                    <div style={{ left: "0", width: "80%" }}>
                                        <strong style={{ fontFamily: "Poppins" }}>Pay Now</strong>

                                    </div>
                                    <div style={{ right: "0", width: "20%" }}>
                                        <strong style={{ fontFamily: "Poppins" }}>{"Rs. " + ( ( roomCharges * nightsSpent ) - discount + tax )}</strong>
                                    </div>
                                </div>

                            </Card.Title>
                            <Card.Title>
                                <Button

                                    onClick={
                                        () =>
                                        {
                                            handleCreateBooking();
                                        }
                                    }

                                    style={{
                                        marginLeft: "25%",
                                        border: "none",
                                        outline: "none",
                                        color: "white",
                                        backgroundColor: "rgb(255, 109, 56)",
                                        height: "50px",
                                        width: "200px",
                                        borderRadius: "10px",
                                    }}
                                >Create Booking</Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default Checkout;