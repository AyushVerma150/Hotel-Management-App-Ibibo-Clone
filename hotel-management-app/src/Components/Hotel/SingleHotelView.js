import React, { useEffect, useState } from 'react';
import { Card, Carousel, Button } from 'react-bootstrap';
import styles from 'Components/Hotel/Hotel.module.css';
import { Link } from 'react-scroll';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { fetchHotelWithRooms, fetchHotelReviews, setHotelSelected } from 'Components/Hotel/HotelSlice';
import CardComponent from 'UI/CardComponent';

const SingleHotelView = ( { match } ) =>
{

    const history = useHistory();

    const { hotelName } = match.params;
    let roomsCount = null;
    const hotelWithRoom = useSelector( state => state.hotel.hotelWithRooms );
    const currentHotelReviews = useSelector( state => state.hotel.currentHotelReviews );
    const filteredSearch = useSelector( state => state.hotel.filteredSearch );
    const guests = filteredSearch.adults + filteredSearch.children;
    const rooms = filteredSearch.rooms;
    const minGuestsInRoom = guests / rooms;
    const hotel = useSelector( state => state.hotel.hotels.find( hotel => hotel.name === hotelName ) );
    let roomComponent = null;
    let reviewComponent = null;
    const dispatch = useDispatch();

    const handleSelectRoom = ( roomInfo ) =>
    {
        let hotelInfo =
        {
            ...hotelWithRoom,
            ...roomInfo,
            ...filteredSearch
        }
        dispatch( setHotelSelected( hotelInfo ) );
        history.push( "/checkout" );
    }

    useEffect( () =>
    {
        dispatch( fetchHotelWithRooms( { hotelId: hotel.id } ) );
        dispatch( fetchHotelReviews( { hotelId: hotel.id } ) );
    }, [] );
    const hotelImages = [
        "https://cdn1.goibibo.com/voy_ing/t_g/106925c06e9911e7bdee025f77df004f.jpg",
        "https://cdn1.goibibo.com/voy_ing/t_g/5a89674e15ab11eaa7340242ac110003.jpg",
        "https://cdn1.goibibo.com/voy_ing/t_g/e63a316e83d911ea96850242ac110005.jpg",
        "https://cdn1.goibibo.com/voy_ing/t_g/81ad700a81ee11e486f9daf4768ad8d9.jfif"
    ];
    const roomImages = [
        "https://cdn1.goibibo.com/voy_ing/t_fs/7036681c138a11ea9e570242ac110003.jpg",
        "https://cdn1.goibibo.com/voy_ing/t_fs/7067c4c0138a11eaba540242ac110002.jpg",
        "https://cdn1.goibibo.com/voy_ing/t_fs/7070e762138a11eaa6430242ac110004.jpg"
    ];

    let roomsAvailable = [];
    if ( hotelWithRoom.rooms )
    {
        console.log( "Minimum Room Capacity is" + minGuestsInRoom );
        roomsAvailable = hotelWithRoom.rooms.filter( room => 
        {
            if ( room.capacity >= minGuestsInRoom )
                return true;
            else return false;
        }
        );
    }



    if ( roomsAvailable.length >= 1 )
    {
        roomsCount = roomsAvailable.length;
        roomComponent = roomsAvailable.map( room =>
        {
            return <div style={{
                backgroundColor: "transparent",
                color: "black",
                display: "flex",
                border: "2px solid rgb(255, 109, 56)",
                marginBottom: "0px"
            }
            }>
                <div style={{ left: "0", backgroundColor: "white" }}>
                    <Carousel fade style={{ width: "275px", height: "275px" }}>
                        {
                            roomImages.map( ( image ) =>
                            {
                                return <Carousel.Item >
                                    <img
                                        className={styles.CarouselDisplayImage}
                                        src={image}
                                    />
                                </Carousel.Item>
                            } )
                        }
                    </Carousel>
                </div>
                <div style={{ right: "0", width: "120%", height: "300px", backgroundColor: "white" }}>
                    <div style={{ display: "flex", width: "100%", border: "none", outline: "none" }}>



                        <div style={{ left: "0", width: "50%", border: "none", outline: "none" }}>

                            <CardComponent
                                style={{ height: "300px", border: "none", color: "black" }}
                                cardTitle={[
                                    { heading: "Room Information", para: "" },
                                    { heading: "Type", para: room.type },
                                    { heading: "Capacity", para: room.capacity },
                                    { heading: "Bed Size", para: room.bedSize },
                                    { heading: "Area", para: room.area }
                                ]}
                            />

                            {/* <Card style={{ height: "300px", border: "none" }}>
                                <Card.Body>
                                    <Card.Title>
                                        <strong style={{
                                            fontFamily: "Poppins",
                                        }}>Room Information</strong>
                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                            <strong style={{ fontFamily: "Poppins" }}>Type</strong>
                                            <p
                                                style={{
                                                    fontFamily: "Poppins",
                                                    color: "black"
                                                }}>{room.type}</p>
                                        </div>
                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-map-marked-alt"></i> Capacity</strong>
                                            <p style={{ fontFamily: "Poppins" }}>{room.capacity}</p>
                                        </div>

                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-monument"></i> Bed Size</strong>
                                            <p style={{ fontFamily: "Poppins", color: "black" }}>{room.bedSize}</p>
                                        </div>

                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-hotel"></i> Area</strong>
                                            <p style={{ fontFamily: "Poppins" }}>{room.area}</p>
                                        </div>
                                    </Card.Title>
                                </Card.Body>
                            </Card> */}
                        </div>


                        <div style={{ right: "0", width: "50%", border: "none", outline: "none", marginLeft: "10px" }}>
                            <Card style={{ height: "300px", border: "none" }}>
                                <Card.Body>
                                    <Card.Title>
                                        <strong style={{
                                            fontFamily: "Poppins",
                                        }}>Pricing Information</strong>
                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{
                                            color: "black",
                                            display: "block",
                                            fontSize: "1rem",
                                            height: "120px",
                                        }}>
                                            <p>Pricing Starts At</p>
                                            <p>Original Price: <strong><s><i class="fas fa-rupee-sign"></i>{room.price}</s></strong></p>
                                            <p>Discount Price: <strong><i class="fas fa-rupee-sign"></i>{room.discountPrice}</strong></p>
                                        </div>

                                    </Card.Title>
                                    <Card.Title>

                                        <Button
                                            onClick={() =>
                                            {
                                                handleSelectRoom( room );
                                            }
                                            }
                                            style={{
                                                backgroundColor: "rgb(255, 109, 56)",
                                                border: "none",
                                                outline: "none",
                                                height: "60px",
                                                width: "50%",
                                                borderRadius: "10px",
                                            }}>
                                            <strong>Select Room</strong>
                                        </Button>



                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div >
        } );
    }
    else
    {
        roomComponent = "No rooms Available with such requirements";
    }

    if ( currentHotelReviews )
    {

        reviewComponent = currentHotelReviews.map( review =>
        {

            return <div style={{ width: "100%", border: "1px solid black", marginTop: "2px" }}>
                <div style={{
                    display: "flex",
                    padding: "10px"
                }}>
                    <img src={review.user.userImage} alt="BigCo Inc. logo" style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "10px",
                    }} />
                    <label style={{
                        height: "20px",
                        marginLeft: "10px"
                    }}> <strong>{review.user.userName}</strong></label>
                </div>
                <br />
                <div style={{
                    display: "block", padding: "5px"
                }}>
                    <p style={{ textAlign: "left" }}>{review.description}</p>
                    <p style={{ textAlign: "left" }}><strong>Rating : </strong>{review.rating} / 5</p>
                </div>
            </div>
        } )


    }


    const hotelPolicies = [
        "It is mandatory for guests to present valid photo identification at the time of check-in.",
        "In case of bookings where payment is charged directly at the resort, we need your Credit Card details to guarantee the booking. The booking confirmation is subject to successful validation of your Credit Card by the resort. Goibibo will not charge your card however, the resort reserves the right to charge a part or full amount before the check-in.",
        "The primary guest checking in to the resort must be at least 18 years of age. If your child requires additional bedding and/or breakfast options, please book them as an adult to ensure the correct room configuration. You will be notified of any additional costs resulting from individual resort policies regarding children staying with parents and age range allowed.",
        "The standard check-in time is 2 PM and the standard check-out time is 12 PM. After booking you will be sent an email confirmation with resort phone number. You can contact the resort directly for early check-in or late check-out. Early check-in or late check-out is subject to availability and may be chargeable by The Tubkaak Krabi Boutique Resort.",
        "The room tariff includes all taxes. The amount paid for the room does not include charges for optional services and facilities (such as room service, mini bar, snacks or telephone calls). These will be charged by the resort at the time of check-out from the resort.",
        "Selective offers of Goibibo will not be valid on cancellation or modification of a booking.",
        "Number of modifications possible on a booking will be on the discretion of Goibibo.",
    ]



    return (
        <div style={{ backgroundColor: "transparent", marginTop: "20px" }}>
            <div style={{
                borderRadius: "10px",
                backgroundColor: "transparent",
                display: "flex",
                marginLeft: "120px",
                marginBottom: "10px",
                marginRight: "100px",
                boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

            }}
            >
                <div style={{ left: "0", width: "60%", backgroundColor: "transparent", borderRadius: "10px" }}>
                    <Carousel fade >
                        {
                            hotelImages.map( ( image ) =>
                            {
                                return <Carousel.Item>
                                    <img
                                        style={{ height: "400px", width: "700px", borderRadius: "10px" }}
                                        src={image}
                                    />
                                </Carousel.Item>
                            } )
                        }
                    </Carousel>
                </div>
                <div style={{ right: "0", width: "30%", height: "400px", textAlign: "left", backgroundColor: "transparent" }}>


                    <div style={{ display: "flex", width: "120%" }}>
                        <div style={{ left: "0", width: "50%" }}>
                            <Card style={{
                                border: "0px",
                                marginTop: "20px",
                                backgroundColor: "transparent",
                                borderRadius: "10px",
                                width: "100%"
                            }}>
                                <Card.Body>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem" }}>
                                            <strong style={{ fontFamily: "Poppins" }}>Name</strong>
                                            <p style={{ fontFamily: "Poppins" }}>{hotel.name}</p>
                                        </div>
                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem" }}>
                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-map-marked-alt"></i> Locate On Map</strong>
                                            <p style={{ fontFamily: "Poppins" }}>{hotel.location}</p>
                                        </div>

                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem" }}>
                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-monument"></i> Landmark</strong>
                                            <p style={{ fontFamily: "Poppins" }}>{hotel.landmark}</p>
                                        </div>

                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem" }}>
                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-hotel"></i> Type</strong>
                                            <p style={{ fontFamily: "Poppins" }}>{hotel.type}</p>
                                        </div>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                        <div style={{ right: "0", width: "50%" }}>
                            <Card style={{
                                border: "0px",
                                marginTop: "20px",
                                backgroundColor: "transparent",
                                borderRadius: "10px",
                                width: "100%"
                            }}>
                                <Card.Body>
                                    <Card.Title>
                                        <div style={{
                                            display: "block",
                                            fontSize: "1rem",
                                            color: "green",
                                            backgroundColor: "#f7f6eb",
                                            height: "30px",
                                            width: "120%",
                                            textAlign: "center",
                                            display: "block",
                                            fontSize: "1rem",
                                            color: "green",
                                            padding: "5px",
                                            marginLeft: "-20px",
                                            borderRadius: "10px",
                                            boxShadow: "0 4px 7x 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 0.9)"
                                        }}>
                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-utensils"></i> Free Breakfast</strong>
                                        </div>
                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{
                                            backgroundColor: "#f7f6eb",
                                            height: "30px",
                                            width: "120%",
                                            textAlign: "center",
                                            display: "block",
                                            fontSize: "1rem",
                                            color: "dodgerblue",
                                            padding: "5px",
                                            marginLeft: "-20px",
                                            borderRadius: "10px",
                                            boxShadow: "0 2px 4x 0 rgba(0, 0, 0, 2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                                        }}>
                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-wifi"></i> Internet/Wifi</strong>
                                        </div>

                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{
                                            display: "block",
                                            fontSize: "1rem",
                                            height: "120px",
                                            width: "120%",
                                            backgroundColor: "#f7f6eb",
                                            padding: "10px",
                                            marginLeft: "-20px",
                                            borderRadius: "10px"
                                        }}>
                                            <p>Pricing Starts At</p>
                                            <p>Original Price: <strong><s><i class="fas fa-rupee-sign"></i>{hotel.discountPrice}</s></strong></p>
                                            <p>Discount Price: <strong><i class="fas fa-rupee-sign"></i>{hotel.startPrice}</strong></p>
                                        </div>
                                    </Card.Title>
                                    <Card.Title>
                                        <div style={{ display: "block", fontSize: "1rem" }}>
                                            <Button style={{
                                                backgroundColor: "rgb(255, 109, 56)",
                                                border: "none",
                                                outline: "none",
                                                height: "60px",
                                                width: "120%",
                                                borderRadius: "10px",
                                                marginLeft: "-20px",
                                                borderRadius: "4px"
                                            }}>
                                                <Link to="roomSection" spy={true} smooth={true}>
                                                    <strong>View {roomsCount} Room Options <i class="fas fa-angle-down"></i></strong>
                                                </Link>

                                            </Button>
                                        </div>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>


            <br />
            <div style={{
                borderRadius: "10px",
                backgroundColor: "transparent",
                width: "80%",
                display: "block",
                marginLeft: "150px",
                marginBottom: "10px",
                textAlign: "center",
                boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}>
                <div id="roomSection">
                    <label style={{
                        fontSize: "1.5rem",
                        marginTop: "20px",
                        fontFamily: "Poppins"
                    }}><strong>Room Options</strong></label>
                </div>
                {
                    roomComponent
                }
            </div >
            <br />
            <div style={{
                borderRadius: "10px",
                backgroundColor: "transparent",
                width: "80%",
                display: "block",
                marginLeft: "150px",
                marginBottom: "10px",
                textAlign: "center",
                boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}>
                <div>
                    <label style={{
                        fontSize: "1.5rem",
                        marginTop: "20px",
                        fontFamily: "Poppins"
                    }}><strong>Guest Reviews and Rating</strong></label>
                    {
                        reviewComponent
                    }
                    <Button style={{
                        backgroundColor: "rgb(255, 109, 56)",
                        border: "none",
                        outline: "none",
                        width: "20%",
                        height: "60px",
                        borderRadius: "4px",
                        marginTop: "10px",
                        marginBottom: "10px"
                    }}>
                        <strong>Load More</strong>
                    </Button>
                </div>

            </div>

            <br />
            <div style={{
                borderRadius: "10px",
                backgroundColor: "transparent",
                width: "80%",
                display: "block",
                marginLeft: "150px",
                marginBottom: "10px",
                textAlign: "center",
                boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}>
                <div>
                    <label style={{
                        fontSize: "1.5rem",
                        marginTop: "20px",
                        fontFamily: "Poppins"
                    }}><strong>Hotel Policies</strong></label>
                </div>
                <div style={{ textAlign: "left", padding: "20px" }}>
                    {
                        hotelPolicies.map( policy =>
                        {
                            return <div style={{ width: "100%" }}>
                                <p><i class="fa fa-check-circle" aria-hidden="true"></i>  {policy}</p>
                            </div>
                        } )
                    }
                </div>

            </div>

            <div style={{
                borderRadius: "10px",
                backgroundColor: "transparent",
                width: "80%",
                display: "block",
                marginLeft: "150px",
                marginBottom: "10px",
                textAlign: "center",
                boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}>


                {/* <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                /> */}
            </div>
        </div >
    );
};


export default SingleHotelView;