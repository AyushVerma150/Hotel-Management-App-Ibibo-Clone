import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'Components/Hotel/Hotel.module.css';
import { Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchDisplay from 'Components/Hotel/SearchDisplay';
import FilterSearch from 'Components/Search/FilterSearch';
import { fetchAllHotels } from 'Components/Hotel/HotelSlice';
const SearchedHotels = ( { match }, props ) =>
{
    const dispatch = useDispatch();
    const hotelImages = [
        "https://cdn1.goibibo.com/voy_ing/t_g/106925c06e9911e7bdee025f77df004f.jpg",
        "https://cdn1.goibibo.com/voy_ing/t_g/5a89674e15ab11eaa7340242ac110003.jpg",
        "https://cdn1.goibibo.com/voy_ing/t_g/e63a316e83d911ea96850242ac110005.jpg",
        "https://cdn1.goibibo.com/voy_ing/t_g/81ad700a81ee11e486f9daf4768ad8d9.jfif"
    ];
    const searchFilters = useSelector( state => state.hotel.filteredSearch );

    useEffect( () =>
    {
        dispatch( fetchAllHotels() );

    }, [] );

    const hotels = ( useSelector( state => state.hotel.hotels.filter( ( hotel ) =>
    {
        return hotel.name === searchFilters.searchText || hotel.state === searchFilters.searchText || hotel.landmark === searchFilters.searchText;
    }
    ) ) );

    return ( <section className={styles.section}>
        <SearchDisplay />
        {/* <div style={{ width: "100%", backgroundColor: "dodgerblue", height: "100px" }}>
            Filtered Search
        </div> */}
        <div className={styles.leftHalf}>
            <FilterSearch />
        </div>
        <div className={styles.rightHalf}>
            <div style={{ display: "block" }}>
                {
                    hotels.map( hotel =>
                    {
                        return <div style={{ marginLeft: "150px" }}>
                            <div style={{
                                width: "80%",
                                display: "flex",
                                marginLeft: "150px",
                                marginBottom: "10px",
                                boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            }}
                                className={styles.hotelListingDiv}
                            >
                                <div style={{ left: "0", width: "40%" }}>
                                    <Carousel fade style={{ width: "275px", height: "275px" }}>
                                        {
                                            hotelImages.map( ( image ) =>
                                            {
                                                return <Carousel.Item>
                                                    <img
                                                        className={styles.CarouselDisplayImage}
                                                        src={image}
                                                    />
                                                </Carousel.Item>
                                            } )
                                        }
                                    </Carousel>
                                </div>
                                <div style={{ right: "0", width: "60%", height: "300px" }}>
                                    <div style={{ display: "flex", width: "100%", border: "none", outline: "none" }}>


                                        <div style={{ left: "0", width: "50%", border: "none", outline: "none" }}>

                                            <Card style={{ height: "300px", border: "none" }}>
                                                <Card.Body>
                                                    <Card.Title>
                                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                            <strong style={{ fontFamily: "Poppins" }}>Name</strong>
                                                            <Link to={`/hotels/${ hotel.name }`}
                                                                style={{ textDecoration: "none" }}
                                                            >
                                                                <p
                                                                    style={{
                                                                        fontFamily: "Poppins",
                                                                        color: "black"
                                                                    }}>{hotel.name}</p></Link>
                                                        </div>
                                                    </Card.Title>
                                                    <Card.Title>
                                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-map-marked-alt"></i> Locate On Map</strong>
                                                            <p style={{ fontFamily: "Poppins" }}>{hotel.location}</p>
                                                        </div>

                                                    </Card.Title>
                                                    <Card.Title>
                                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-monument"></i> Landmark</strong>
                                                            <p style={{ fontFamily: "Poppins" }}>{hotel.landmark}</p>
                                                        </div>

                                                    </Card.Title>
                                                    <Card.Title>
                                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-hotel"></i> Type</strong>
                                                            <p style={{ fontFamily: "Poppins" }}>{hotel.type}</p>
                                                        </div>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div style={{ right: "0", backgroundColor: "yellow", width: "50%", border: "none", outline: "none" }}>

                                            <Card style={{ height: "300px", border: "none" }}>
                                                <Card.Body>
                                                    <Card.Title>
                                                        <div style={{
                                                            color: "black",
                                                            display: "block",
                                                            fontSize: "1rem",
                                                            height: "120px",
                                                            width: "120%",
                                                            padding: "10px",
                                                            marginLeft: "-20px",
                                                            borderRadius: "10px"
                                                        }}>
                                                            <p>Pricing Starts At</p>
                                                            <p>Original Price: <strong><s><i class="fas fa-rupee-sign"></i>{hotel.startPrice}</s></strong></p>
                                                            <p>Discount Price: <strong><i class="fas fa-rupee-sign"></i>{hotel.discountPrice}</strong></p>
                                                        </div>

                                                    </Card.Title>
                                                    {/* <Card.Title>
                                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-monument"></i> Landmark</strong>
                                                            <p style={{ fontFamily: "Poppins" }}>{hotel.landmark}</p>
                                                        </div>

                                                    </Card.Title>
                                                    <Card.Title>
                                                        <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                            <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-hotel"></i> Type</strong>
                                                            <p style={{ fontFamily: "Poppins" }}>{hotel.type}</p>
                                                        </div>
                                                    </Card.Title> */}
                                                </Card.Body>
                                            </Card>













                                        </div>
                                    </div>




                                    {/* <Card style={{ border: "0px", marginTop: "20px" }}>
                                        <Card.Body>
                                            <Card.Title>
                                                <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                    <strong style={{ fontFamily: "Poppins" }}>Name</strong>
                                                    <Link to={`/hotels/${ hotel.name }`}
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontFamily: "Poppins",
                                                                color: "black"
                                                            }}>{hotel.name}</p></Link>
                                                </div>
                                            </Card.Title>
                                            <Card.Title>
                                                <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                    <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-map-marked-alt"></i> Locate On Map</strong>
                                                    <p style={{ fontFamily: "Poppins" }}>{hotel.location}</p>
                                                </div>

                                            </Card.Title>
                                            <Card.Title>
                                                <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                    <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-monument"></i> Landmark</strong>
                                                    <p style={{ fontFamily: "Poppins" }}>{hotel.landmark}</p>
                                                </div>

                                            </Card.Title>
                                            <Card.Title>
                                                <div style={{ display: "block", fontSize: "1rem", color: "black" }}>
                                                    <strong style={{ fontFamily: "Poppins" }}><i class="fas fa-hotel"></i> Type</strong>
                                                    <p style={{ fontFamily: "Poppins" }}>{hotel.type}</p>
                                                </div>
                                            </Card.Title>
                                        </Card.Body>
                                    </Card> */}
                                </div>
                            </div>
                        </div>
                    } )
                }
            </div >
        </div>
    </section >





    );
};

export default SearchedHotels;