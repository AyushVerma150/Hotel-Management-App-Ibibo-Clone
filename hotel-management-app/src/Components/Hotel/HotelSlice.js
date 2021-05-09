import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    hotels: [],
    status: null,
    error: null,
    filteredSearch: null,
    children: [],
    filtersEnabled: false,
    appliedFilters: {
        amenitiesAdded: false,
        breakfast: false,
        internet: false,
        cancellation: false,
        veryLowPrice: false,
        lowPrice: false,
        mediumPrice: false,
        highPrice: false,
        veryHighPrice: false,
        price: false,
        veryHighRating: false,
        highRating: false,
        mediumRating: false,
        lowRating: false,
        hotel: false,
        motel: false,
        villa: false,
        minPriceRange: null,
        maxPriceRange: null,
        amenities: [],
    },
    hotelWithRooms: [],
    currentHotelReviews: [],
    hotelSelected: [],
    stayStartDay: null,
    stayEndDay: null,
    bookingsMade: [],
    bookingStatus: false,
    destinations: [
        {
            name: "Chandigarh",
            image: "https://cdn1.goibibo.com/voy_ing/t_g/New_dWeb_Homepage_Chandigarh-1581426962.jpg"
        },
        {
            name: "Ooty",
            image: "https://cdn1.goibibo.com/voy_ing/t_g/New_dWeb_Homepage_Ooty-1581430518.jpg"
        },
        {
            name: "Dehradun",
            image: "https://cdn1.goibibo.com/voy_ing/t_g/New_dWeb_Homepage_Dehradun-1581456133.jpg"
        },
        {
            name: "Munnar",
            image: "https://cdn1.goibibo.com/voy_ing/t_g/New_dWeb_Homepage_Munnar-1581456447.jpg"
        },
        {
            name: "Agra",
            image: "https://cdn1.goibibo.com/voy_ing/t_g/New_dWeb_Homepage_Agra-1581430387.jpg"
        },
        {
            name: "Mysore",
            image: "https://cdn1.goibibo.com/voy_ing/t_g/New_dWeb_Homepage_Mysore-1581427823.jpg"
        },
        {
            name: "Pondicherry",
            image: "https://cdn1.goibibo.com/voy_ing/t_g/New_dWeb_Homepage_Pondicherry-1581427907.jpg"
        }
    ]
};

export const fetchAllHotels = createAsyncThunk( 'hotel/fetchAllHotels',
    async ( values ) =>
    {
        try
        {
            const result = await axios
                .get( 'http://localhost:8080/admin/fetchAllHotels', values );
            return result.data.data;
        }
        catch ( err )
        {
            throw new Error( "request denied" );
        }

    } );

export const filterHotels = createAsyncThunk( 'hotel/filterHotels',
    async ( values ) =>
    {
        try
        {
            const result = await axios
                .post( 'http://localhost:8080/admin/filterHotels', values );
            return result.data.data;
        }
        catch ( err )
        {
            throw new Error( "request denied" );
        }

    } );


export const fetchHotelReviews = createAsyncThunk( 'hotel/fetchHotelReviews',
    async ( values ) =>
    {
        try
        {
            const result = await axios
                .post( 'http://localhost:8080/admin/fetchReviews', values );
            return result.data.data;
        }
        catch ( err )
        {
            throw new Error( "request denied" );
        }

    } );




export const createBooking = createAsyncThunk( 'hotel/createBooking',
    async ( values ) =>
    {
        alert( JSON.stringify( values ) );
        try
        {
            const result = await axios
                .post( 'http://localhost:8080/admin/createBooking', values );
            return result.data.data;
        }
        catch ( err )
        {
            throw new Error( "request denied" );
        }

    } );





export const fetchHotelWithRooms = createAsyncThunk( 'hotel/fetchHotelWithRooms',
    async ( values ) =>
    {
        try
        {
            const result = await axios
                .post( 'http://localhost:8080/admin/fetchRooms', values );
            return result.data.data;
        }
        catch ( err )
        {
            throw new Error( "request denied" );
        }

    } );



export const hotelSlice = createSlice(
    {
        name: "hotel",
        initialState,
        reducers:
        {
            setFilterSearchSlice: ( state, action ) =>
            {
                state.filteredSearch = action.payload;
            },
            setChildrenReducer: ( state, action ) =>
            {
                state.children = action.payload;
            },
            updateSearchText: ( state, action ) =>
            {
                state.filteredSearch.searchText = action.payload.text;
            },
            updateAdults: ( state, action ) =>
            {
                state.filteredSearch.adults += 1;
            },
            updateRooms: ( state, action ) =>
            {
                state.filteredSearch.rooms += 1;
            },
            updateAppliedFilters: ( state, action ) =>
            {
                state.filtersEnabled = true;
                const name = action.payload.name;
                if ( name === "veryLowPrice" || name === "lowPrice" || name === "mediumPrice" || name === "highPrice" || name === "veryHighPrice" )
                {
                    //resetState
                    state.appliedFilters.veryLowPrice = false;
                    state.appliedFilters.lowPrice = false;
                    state.appliedFilters.mediumPrice = false;
                    state.appliedFilters.highPrice = false;
                    state.appliedFilters.veryHighPrice = false;
                    state.appliedFilters.minPriceRange = null;
                    state.appliedFilters.maxPriceRange = null;

                    //Add Price Range
                    state.appliedFilters.price = true;
                    const minPrice = action.payload.minPrice;
                    const maxPrice = action.payload.maxPrice;
                    state.appliedFilters[name] = !state.appliedFilters[name];
                    state.appliedFilters.minPriceRange = minPrice;
                    state.appliedFilters.maxPriceRange = maxPrice;
                }
                else if ( name === "breakfast" || name === "internet" || name === "cancellation" )
                {

                    if ( state.appliedFilters[name] )
                    {
                        for ( let i = 0; i < state.appliedFilters.amenities.length; i++ )
                        {

                            if ( state.appliedFilters.amenities[i] === name )
                            {

                                state.appliedFilters.amenities.splice( i, 1 );
                                state.appliedFilters[name] = false;
                            }

                        }

                        if ( !state.appliedFilters.amenities )
                        {
                            state.appliedFilters.amenitiesAdded = true;
                        }
                        else if ( state.appliedFilters.amenities.length < 1 )
                        {
                            state.appliedFilters.amenitiesAdded = false;

                        }
                    }
                    else if ( state.appliedFilters.amenities.length < 1 )
                    {
                        state.appliedFilters[name] = !state.appliedFilters[name];
                        state.appliedFilters.amenities.push( name );
                        state.appliedFilters.amenitiesAdded = true;
                    }
                    else
                    {
                        if ( !state.appliedFilters.amenities.includes( name ) )
                        {
                            state.appliedFilters.amenities.push( name );
                            state.appliedFilters[name] = !state.appliedFilters[name];
                            state.appliedFilters.amenitiesAdded = true;
                        }

                    }

                }
                else
                {
                    state.appliedFilters[name] = !state.appliedFilters[name];
                }



            },
            setHotelSelected: ( state, action ) =>
            {
                state.hotelSelected.push( action.payload );
            },
            setStayDates: ( state, action ) =>
            {
                state.stayStartDay = action.payload.start;
                state.stayEndDay = action.payload.end;
            }

        },
        extraReducers: {
            [fetchAllHotels.pending]: ( state ) =>
            {
                state.status = "loading";
            },
            [fetchAllHotels.fulfilled]: ( state, action ) =>
            {
                state.status = "success";
                state.hotels = action.payload
            },
            [fetchAllHotels.rejected]: ( state, action ) =>
            {
                state.status = "failed";
                state.error = action.payload;
            },
            [filterHotels.pending]: ( state ) =>
            {
                console.log( "[Fetching Filter Hotels ...]" );
                state.status = "loading";
            },
            [filterHotels.fulfilled]: ( state, action ) =>
            {
                state.status = "success";
                if ( state.filtersEnabled )
                {
                    state.hotels = action.payload;
                }
            },
            [filterHotels.rejected]: ( state, action ) =>
            {
                state.status = "failed";
                state.error = action.payload;
            },


            [fetchHotelWithRooms.pending]: ( state ) =>
            {
                console.log( "[Fetching Filter Hotels ...]" );
                state.status = "loading";
            },
            [fetchHotelWithRooms.fulfilled]: ( state, action ) =>
            {
                state.status = "success";
                state.hotelWithRooms = action.payload;

            },
            [fetchHotelWithRooms.rejected]: ( state, action ) =>
            {
                state.status = "failed";
                state.error = action.payload;
            },


            [fetchHotelReviews.pending]: ( state ) =>
            {
                state.status = "loading";
            },
            [fetchHotelReviews.fulfilled]: ( state, action ) =>
            {
                state.status = "success";
                state.currentHotelReviews = action.payload;

            },
            [fetchHotelReviews.rejected]: ( state, action ) =>
            {
                state.status = "failed";
                state.error = action.payload;
            },

            [createBooking.pending]: ( state ) =>
            {
                state.bookingStatus = "loading";
            },
            [createBooking.fulfilled]: ( state, action ) =>
            {
                state.bookingStatus = "success";
                state.bookingsMade = action.payload;

            },
            [createBooking.rejected]: ( state, action ) =>
            {
                state.bookingStatus = "failed";
                state.error = action.payload;
            },
        }
    }
);

export const {
    setFilterSearchSlice,
    setChildrenReducer,
    updateAdults,
    updateRooms,
    updateSearchText,
    updateAppliedFilters,
    setHotelSelected,
    setStayDates
} = hotelSlice.actions;

export default hotelSlice.reducer;