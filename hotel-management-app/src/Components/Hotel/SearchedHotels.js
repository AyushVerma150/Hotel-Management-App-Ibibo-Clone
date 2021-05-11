import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "Components/Hotel/Hotel.module.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchDisplay from "Components/Hotel/SearchDisplay";
import FilterSearch from "Components/Search/FilterSearch";
import { fetchAllHotels } from "Components/Hotel/HotelSlice";
import CardComponent from "UI/CardComponent";
import otherConstants from "Constants/OtherConstants";

const SearchedHotels = ({ match }, props) => {
  const dispatch = useDispatch();
  const hotelImages = otherConstants.hotelImages;
  const searchFilters = useSelector((state) => state.hotel.filteredSearch);

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, []);

  const hotels = useSelector((state) =>
    state.hotel.hotels.filter((hotel) => {
      return (
        hotel.name === searchFilters.searchText ||
        hotel.state === searchFilters.searchText ||
        hotel.landmark === searchFilters.searchText
      );
    })
  );

  return (
    <section className={styles.section}>
      <SearchDisplay />
      <div className={styles.leftHalf}>
        <FilterSearch />
      </div>
      <div className={styles.rightHalf}>
        <div className={styles.displayBlock}>
          {hotels.map((hotel) => {
            return (
              <Link
                to={`/hotels/${hotel.name}`}
                className={styles.textDecoration}
              >
                <div className={styles.marginLeft}>
                  <div className={styles.hotelListingDiv}>
                    <div className={styles.carouselDiv}>
                      <Carousel fade className={styles.carouselStyle}>
                        {hotelImages.map((image) => {
                          return (
                            <Carousel.Item>
                              <img
                                className={styles.CarouselDisplayImage}
                                src={image}
                                alt={otherConstants.imageAlt}
                              />
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    </div>
                    <div className={styles.contentDiv}>
                      <div className={styles.cardStyling}>
                        <div className={styles.locationDiv}>
                          <CardComponent
                            className={styles.priceInfoDiv}
                            cardTitle={[
                              {
                                heading: otherConstants.hotelName,
                                para: hotel.name,
                              },
                              {
                                heading: otherConstants.hotelLocation,
                                para: hotel.location,
                                icon: otherConstants.locationIcon,
                              },
                              {
                                heading: otherConstants.landmark,
                                para: hotel.landmark,
                                icon: otherConstants.landmarkIcon,
                              },
                              {
                                heading: otherConstants.hotelType,
                                para: hotel.type,
                                icon: otherConstants.hotelIcon,
                              },
                            ]}
                          />
                        </div>
                        <div className={styles.cardComponentDiv}>
                          <CardComponent
                            className={styles.priceInfoDiv}
                            cardTitle={[
                              { heading: otherConstants.pricingInfo },
                              {
                                heading: otherConstants.originalPrice,
                                para: hotel.startPrice,
                                icon: otherConstants.ruppeeIcon,
                              },
                              {
                                heading: otherConstants.discountPrice,
                                para: hotel.discountPrice,
                                icon: otherConstants.discountPrice,
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchedHotels;
