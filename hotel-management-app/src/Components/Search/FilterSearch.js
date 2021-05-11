import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterHotels } from "Components/Hotel/HotelSlice";
import { updateAppliedFilters } from "Components/Hotel/HotelSlice";
import CheckBoxControl from "UI/CheckBoxControl";

import styles from "Components/Search/Search.module.css";
import otherConstants from "Constants/OtherConstants";

const FilterSearch = () => {
  const dispatch = useDispatch();

  const priceRange = [
    {
      name: otherConstants.veryLowPrice,
      label: otherConstants.veryLowPriceRange,
      minPrice: otherConstants.veryLowPriceData.min,
      maxPrice: otherConstants.veryLowPriceData.max,
    },
    {
      name: otherConstants.lowPrice,
      label: otherConstants.lowPriceRange,
      minPrice: otherConstants.lowPriceData.min,
      maxPrice: otherConstants.lowPriceData.max,
    },
    {
      name: otherConstants.mediumPrice,
      label: otherConstants.mediumPriceRange,
      minPrice: otherConstants.mediumPriceData.min,
      maxPrice: otherConstants.mediumPriceData.max,
    },
    {
      name: otherConstants.highPrice,
      label: otherConstants.highPriceRange,
      minPrice: otherConstants.highPriceData.min,
      maxPrice: otherConstants.highPriceData.max,
    },
    {
      name: otherConstants.veryHighPrice,
      label: otherConstants.veryHighPriceRange,
      minPrice: otherConstants.veryHighPriceData.min,
      maxPrice: otherConstants.veryHighPriceData.max,
    },
  ];

  const ratingsRange = [
    {
      name: otherConstants.veryHighRating,
      label: otherConstants.veryHighRatingLabel,
    },
    {
      name: otherConstants.highRating,
      label: otherConstants.highRatingLabel,
    },
    {
      name: otherConstants.mediumRating,
      label: otherConstants.mediumRatingLabel,
    },
    {
      name: otherConstants.lowRating,
      label: otherConstants.lowRatingLabel,
    },
  ];

  const hotelType = [
    {
      name: otherConstants.typeHotel,
    },
    { name: otherConstants.typeMotel },
    {
      name: otherConstants.typeVilla,
    },
  ];

  const applyFilters = useSelector((state) => state.hotel.appliedFilters);
  useEffect(() => {
    dispatch(filterHotels(applyFilters));
  }, [applyFilters, dispatch]);

  return (
    <div className={styles.divStyle}>
      {/* This Section Allows User to filter Hotels According to his applied Fillters */}

      <strong className={styles.colorBlack}>Filters</strong>
      <div className={styles.filterBox}>
        <CheckBoxControl
          name={otherConstants.internetAmenity}
          label={otherConstants.internetAmenity}
          changed={() => {
            dispatch(
              updateAppliedFilters({ name: otherConstants.internetAmenity })
            );
          }}
          checked={applyFilters.internet}
        />
      </div>
      <div className={styles.filterBox}>
        <CheckBoxControl
          name={otherConstants.breakfastAmenity}
          label={otherConstants.breakfastAmenity}
          changed={() => {
            dispatch(
              updateAppliedFilters({ name: otherConstants.breakfastAmenity })
            );
          }}
          checked={applyFilters.breakfast}
        />
      </div>

      <div className={styles.filterBox}>
        <CheckBoxControl
          name={otherConstants.cancellationAmenity}
          label={otherConstants.cancellationAmenity}
          changed={() => {
            dispatch(
              updateAppliedFilters({ name: otherConstants.cancellationAmenity })
            );
          }}
          checked={applyFilters.cancellation}
        />
      </div>

      <div className={styles.filterContainer}>
        <label>
          <strong>Select Price Range</strong>
        </label>
        <br />

        {priceRange.map((pricing) => {
          return (
            <CheckBoxControl
              class={styles.display}
              name={pricing.name}
              label={pricing.label}
              changed={() => {
                dispatch(
                  updateAppliedFilters({
                    name: pricing.name,
                    minPrice: pricing.minPrice,
                    maxPrice: pricing.maxPrice,
                  })
                );
              }}
              checked={applyFilters[pricing.name]}
            />
          );
        })}
      </div>
      <div className={styles.filterContainer}>
        <lable>
          <strong>Select Hotel Rating</strong>
        </lable>
        <br />
        {ratingsRange.map((rating) => {
          return (
            <CheckBoxControl
              class={styles.display}
              name={rating.name}
              label={rating.label}
              changed={() => {
                dispatch(
                  updateAppliedFilters({
                    name: rating.name,
                  })
                );
              }}
              checked={applyFilters[rating.name]}
            />
          );
        })}
      </div>
      <div className={styles.filterContainer}>
        <lable>
          <strong>Select Hotel Type</strong>
        </lable>

        <br />
        {hotelType.map((type) => {
          return (
            <CheckBoxControl
              class={styles.display}
              name={type.name}
              label={type.name}
              changed={() => {
                dispatch(
                  updateAppliedFilters({
                    name: type.name,
                  })
                );
              }}
              checked={applyFilters[type.name]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilterSearch;
