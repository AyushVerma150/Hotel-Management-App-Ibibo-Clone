import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "Components/Hotel/Hotel.module.css";
import { Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchDisplay from "Components/Hotel/SearchDisplay";
import FilterSearch from "Components/Search/FilterSearch";
import { fetchAllHotels } from "Components/Hotel/HotelSlice";
import CardComponent from "UI/CardComponent";
const SearchedHotels = ({ match }, props) => {
  const dispatch = useDispatch();
  const hotelImages = [
    "https://cdn1.goibibo.com/voy_ing/t_g/106925c06e9911e7bdee025f77df004f.jpg",
    "https://cdn1.goibibo.com/voy_ing/t_g/5a89674e15ab11eaa7340242ac110003.jpg",
    "https://cdn1.goibibo.com/voy_ing/t_g/e63a316e83d911ea96850242ac110005.jpg",
    "https://cdn1.goibibo.com/voy_ing/t_g/81ad700a81ee11e486f9daf4768ad8d9.jfif",
  ];
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
      {/* <div style={{ width: "100%", backgroundColor: "dodgerblue", height: "100px" }}>
            Filtered Search
        </div> */}
      <div className={styles.leftHalf}>
        <FilterSearch />
      </div>
      <div className={styles.rightHalf}>
        <div className={styles.displayBlock}>
          {hotels.map((hotel) => {
            return (
              <Link
                to={`/hotels/${hotel.name}`}
                style={{ textDecoration: "none" }}
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
                                alt="alternative text"
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
                            style={{ height: "300px", border: "none" }}
                            cardTitle={[
                              { heading: "Name", para: hotel.name },
                              {
                                heading: "Locate on Map",
                                para: hotel.location,
                                icon: <i class="fas fa-map-marked-alt"></i>,
                              },
                              {
                                heading: "Landmark",
                                para: hotel.landmark,
                                icon: <i class="fas fa-monument"></i>,
                              },
                              {
                                heading: "Type",
                                para: hotel.type,
                                icon: <i class="fas fa-hotel"></i>,
                              },
                            ]}
                          />
                        </div>
                        <div
                          style={{
                            right: "0",
                            backgroundColor: "yellow",
                            width: "50%",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          <CardComponent
                            style={{ height: "300px", border: "none" }}
                            cardTitle={[
                              { heading: "Pricing Start At : ", para: "" },
                              {
                                heading: "Original Price",
                                para: hotel.startPrice,
                                icon: <i class="fas fa-rupee-sign"></i>,
                              },
                              {
                                heading: "Dicount Price",
                                para: hotel.discountPrice,
                                icon: <i class="fas fa-rupee-sign"></i>,
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
