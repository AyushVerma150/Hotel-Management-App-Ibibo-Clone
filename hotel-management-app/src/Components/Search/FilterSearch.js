import React, { useEffect, useState } from 'react';
import
{
    FormControlLabel,
    Checkbox,

} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { filterHotels } from 'Components/Hotel/HotelSlice';
import { updateAppliedFilters } from 'Components/Hotel/HotelSlice';
import CheckBoxControl from 'UI/CheckBoxControl';
import styles from 'Components/Search/Search.module.css';

const FilterSearch = () =>
{

    const dispatch = useDispatch();
    // const filters = useState( state => state.hotel.hotelFilters );
    const applyFilters = useSelector( state => state.hotel.appliedFilters );
    useEffect( () =>
    {
        dispatch( filterHotels( applyFilters ) );
    }, [applyFilters] );


    return (
        <div className={styles.divStyle}>
            <strong style={{ color: "black" }}>Filters</strong>
            <div className={styles.filterBox}>
                <CheckBoxControl
                    name="internet"
                    label="internet"
                    changed={() =>
                    {
                        dispatch( updateAppliedFilters( { name: "internet" } ) );
                    }}
                    checked={applyFilters.internet}
                />
            </div>
            <div className={styles.filterBox}>
                <CheckBoxControl
                    name="breakfast"
                    label="Free Breakfast"
                    changed={() =>
                    {
                        dispatch( updateAppliedFilters( { name: "breakfast" } ) );
                    }}
                    checked={applyFilters.breakfast}
                />
            </div>

            <div className={styles.filterBox}>
                <CheckBoxControl
                    name="cancellation"
                    label="Cancellation Available"
                    changed={() =>
                    {
                        dispatch( updateAppliedFilters( { name: "cancellation" } ) );
                    }}
                    checked={applyFilters.cancellation}
                />
            </div>

            <div className={styles.filterContainer}>
                <label><strong>Select Price Range</strong></label>
                <br />
                <CheckBoxControl
                    class={styles.display}
                    name="veryLowPrice"
                    label="Upto ₹2000"
                    changed={() =>
                    {
                        dispatch( updateAppliedFilters( { name: "veryLowPrice", minPrice: 0, maxPrice: 2000 } ) );
                    }}
                    checked={applyFilters.veryLowPrice}
                />
                <CheckBoxControl
                    class={styles.display}
                    name="lowPrice"
                    label="₹2001 - ₹4000"
                    changed={() =>
                    {
                        dispatch( updateAppliedFilters( { name: "lowPrice", minPrice: 2001, maxPrice: 4000 } ) );
                    }}
                    checked={applyFilters.lowPrice}
                />
                <CheckBoxControl
                    class={styles.display}
                    name="mediumPrice"
                    label="₹4001 - ₹6000"
                    changed={() =>
                    {
                        dispatch( updateAppliedFilters( { name: "mediumPrice", minPrice: 4001, maxPrice: 6000 } ) );
                    }}
                    checked={applyFilters.mediumPrice}
                />
                <CheckBoxControl
                    class={styles.display}
                    name="highPrice"
                    label="₹6001 - ₹8000"
                    changed={() =>
                    {
                        dispatch( updateAppliedFilters( { name: "highPrice", minPrice: 6001, maxPrice: 8000 } ) );
                    }}
                    checked={applyFilters.highPrice}
                />
                <CheckBoxControl
                    class={styles.display}
                    name="veryHighPrice"
                    label="₹8001 and Above"
                    changed={() =>
                    {
                        dispatch( updateAppliedFilters( { name: "veryHighPrice", minPrice: 8001, maxPrice: 50000 } ) );
                    }}
                    checked={applyFilters.veryHighPrice}
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
                                // setApplyFilters( prevFilter => (
                                //     {
                                //         ...prevFilter,
                                //         veryHighRating: !prevFilter.veryHighRating
                                //     }
                                // ) )
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
                                // setApplyFilters( prevFilter => (
                                //     {
                                //         ...prevFilter,
                                //         highRating: !prevFilter.highRating
                                //     }
                                // ) )
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
                                // setApplyFilters( prevFilter => (
                                //     {
                                //         ...prevFilter,
                                //         mediumRating: !prevFilter.mediumRating
                                //     }
                                // ) )
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
                                // setApplyFilters( prevFilter => (
                                //     {
                                //         ...prevFilter,
                                //         lowRating: !prevFilter.lowRating
                                //     }
                                // ) )
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
                                dispatch( updateAppliedFilters( { name: "motel" } ) );
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
                                dispatch( updateAppliedFilters( { name: "hotel" } ) );
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
                                dispatch( updateAppliedFilters( { name: "villa" } ) );
                            }
                        } name="" />}
                    label="Villa"
                />

            </div>
            {/* <Button
                style={{
                    color: "white",
                    backgroundColor: "rgb(255, 109, 56)",
                    height: "50px",
                    width: "200px",
                    borderRadius: "20px",
                }}
            >Apply Filters</Button> */}
        </div>
    );
}

export default FilterSearch;