import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from 'Components/Hotel/Hotel.module.css';
import { Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import
{
    FormControlLabel,
    FormControl,
    FormLabel,
    FormGroup,
    Checkbox,
    Button,
    Box
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { RHFInput } from "react-hook-form-input";

const HotelList = ( { match } ) =>
{
    const { destinationName } = match.params;
    const hotels = useSelector( state => state.hotel.hotels.filter( hotel => hotel.state === destinationName ) );
    const [applyFilters, setApplyFilters] = useState(
        {
            breakfast: false,
            internet: false,
            cancellation: false,
            veryLowPrice: false,
            lowPrice: false,
            mediumPrice: false,
            highPrice: false,
            veryHighPrice: false,
            veryHighRating: false,
            highRating: false,
            mediumRating: false,
            lowRating: false,
            hotel: false,
            motel: false,
            villa: false
        }
    );
    return (
        <section className={styles.section}>
            <div className={styles.leftHalf}>
                {/* <div style={{
                    textAlign: "center",
                    marginTop: "15px",
                    display: "block",
                    backgroundColor: "transparent",
                    width: "200%",
                    padding: "10px",
                    marginLeft: "180px",
                    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}>
                    <strong style={{ color: "black" }}>Filters</strong>
                    <div style={{
                        backgroundColor: "#f7f6eb",
                        height: "50px",
                        textAlign: "center",
                        display: "block",
                        fontSize: "0.75rem",
                        color: "black",
                        padding: "5px",
                        borderRadius: "10px",
                        marginBottom: "3px",
                        boxShadow: "0 4px 8x 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}>
                        <FormControlLabel
                            control={<Checkbox checked={applyFilters.internet} onChange={() =>
                            {
                                setApplyFilters( prevFilter => (
                                    {
                                        ...prevFilter,
                                        internet: !prevFilter.internet
                                    }
                                ) )
                            }



                            } name="internet" />}
                            label="Wifi/Internet"
                        />
                    </div>

                    <div style={{
                        backgroundColor: "#f7f6eb",
                        height: "50px",
                        textAlign: "center",
                        display: "block",
                        fontSize: "0.75rem",
                        color: "black",
                        padding: "5px",
                        marginBottom: "3px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8x 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}>
                        <FormControlLabel
                            control={<Checkbox checked={applyFilters.breakfast} onChange={
                                () =>
                                {
                                    setApplyFilters( prevFilter => (
                                        {
                                            ...prevFilter,
                                            breakfast: !prevFilter.breakfast
                                        }
                                    ) )
                                }
                            } name="breakfast" />}
                            label="Free Breakfast"
                        />
                    </div>

                    <div style={{
                        backgroundColor: "#f7f6eb",
                        height: "50px",
                        textAlign: "center",
                        display: "block",
                        fontSize: "0.75rem",
                        color: "black",
                        padding: "5px",
                        marginBottom: "3px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8x 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={applyFilters.cancellation}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                cancellation: !prevFilter.cancellation
                                            }
                                        ) )
                                    }
                                } name="cancellation" />}
                            label="Cancellation Available"
                        />
                    </div>

                    <div style={{
                        backgroundColor: "#f7f6eb",
                        textAlign: "left",
                        display: "block",
                        fontSize: "0.75rem",
                        color: "black",
                        padding: "5px",
                        marginBottom: "3px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8x 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}>
                        <lable><strong>Select Price Range</strong></lable>
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.veryLowPrice}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                veryLowPrice: !prevFilter.veryLowPrice
                                            }
                                        ) )
                                    }
                                } name="veryLowPrice" />}
                            label="Upto ₹2000"
                        />
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.lowPrice}
                                onChange={() =>
                                {
                                    setApplyFilters( prevFilter => (
                                        {
                                            ...prevFilter,
                                            lowPrice: !prevFilter.lowPrice
                                        }
                                    ) )
                                }

                                } name="lowPrice" />}
                            label="₹2001 - ₹4000"
                        />
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.mediumPrice}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                mediumPrice: !prevFilter.mediumPrice
                                            }
                                        ) )
                                    }
                                } name="mediumPrice" />}
                            label="₹4001 - ₹6000
                            "
                        />

                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.highPrice}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                highPrice: !prevFilter.HighPrice
                                            }
                                        ) )
                                    }
                                } name="highPrice" />}
                            label="₹6001 - ₹8000"
                        />
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.veryHighPrice}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                veryHighPrice: !prevFilter.veryHighPrice
                                            }
                                        ) )
                                    }
                                } name="veryHighPrice" />}
                            label="₹8000+"
                        />
                    </div>
                    <div style={{
                        backgroundColor: "#f7f6eb",
                        textAlign: "left",
                        display: "block",
                        fontSize: "0.75rem",
                        color: "black",
                        padding: "5px",
                        marginBottom: "3px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8x 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}>
                        <lable><strong>Select Hotel Rating</strong></lable>
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.veryHighRating}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                veryHighRating: !prevFilter.veryHighRating
                                            }
                                        ) )
                                    }
                                } name="4.5+" />}
                            label="4.5+"
                        />
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.highRating}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                highRating: !prevFilter.highRating
                                            }
                                        ) )
                                    }
                                } name="" />}
                            label="4+"
                        />
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.mediumRating}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                mediumRating: !prevFilter.mediumRating
                                            }
                                        ) )
                                    }
                                } name="" />}
                            label="3.5+"
                        />
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.lowRating}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                lowRating: !prevFilter.lowRating
                                            }
                                        ) )
                                    }
                                } name="" />}
                            label="3+"
                        />
                    </div>


                    <div style={{
                        backgroundColor: "#f7f6eb",
                        textAlign: "left",
                        display: "block",
                        fontSize: "0.75rem",
                        color: "black",
                        padding: "5px",
                        marginBottom: "3px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8x 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}>
                        <lable><strong>Select Hotel Type</strong></lable>
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.motel}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                motel: !prevFilter.motel
                                            }
                                        ) )
                                    }
                                } name="" />}
                            label="Motel"
                        />

                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.hotel}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                hotel: !prevFilter.hotel
                                            }
                                        ) )
                                    }
                                } name="" />}
                            label="Hotel"
                        />
                        <FormControlLabel
                            style={{ display: "block" }}
                            control={<Checkbox
                                checked={applyFilters.villa}
                                onChange={
                                    () =>
                                    {
                                        setApplyFilters( prevFilter => (
                                            {
                                                ...prevFilter,
                                                villa: !prevFilter.villa
                                            }
                                        ) )
                                    }
                                } name="" />}
                            label="Villa"
                        />

                    </div>
                    <Button
                        style={{
                            color: "white",
                            backgroundColor: "rgb(255, 109, 56)",
                            height: "50px",
                            width: "200px",
                            borderRadius: "20px",
                        }}
                    >Apply Filters</Button>
                </div> */}
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
                                    marginBottom: "10px",
                                    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                                }}
                                    className={styles.hotelListingDiv}
                                >
                                    <div style={{ left: "0", width: "40%" }}>
                                        <Carousel fade style={{ width: "275px", height: "275px" }}>
                                            {
                                                hotel.hotelImages.map( ( image ) =>
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
                                        <Card style={{ border: "0px", marginTop: "20px" }}>
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
                                                        <p style={{ fontFamily: "Poppins" }}>{hotel.hotelType}</p>
                                                    </div>
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
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


export default HotelList;