import otherConstants from "Constants/OtherConstants";

//Utility Functions as per Requirements

export const enableFilterCheck = (state, action) => {
  state.filtersEnabled = true;
  const name = action.payload.name;
  if (
    name === otherConstants.veryLowPrice ||
    name === otherConstants.lowPrice ||
    name === otherConstants.mediumPrice ||
    name === otherConstants.highPrice ||
    name === otherConstants.veryHighPrice
  ) {
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
  } else if (
    name === otherConstants.breakfastAmenity ||
    name === otherConstants.internetAmenity ||
    name === otherConstants.cancellationAmenity
  ) {
    if (state.appliedFilters[name]) {
      for (let i = 0; i < state.appliedFilters.amenities.length; i++) {
        if (state.appliedFilters.amenities[i] === name) {
          state.appliedFilters.amenities.splice(i, 1);
          state.appliedFilters[name] = false;
        }
      }

      if (!state.appliedFilters.amenities) {
        state.appliedFilters.amenitiesAdded = true;
      } else if (state.appliedFilters.amenities.length < 1) {
        state.appliedFilters.amenitiesAdded = false;
      }
    } else if (state.appliedFilters.amenities.length < 1) {
      state.appliedFilters[name] = !state.appliedFilters[name];
      state.appliedFilters.amenities.push(name);
      state.appliedFilters.amenitiesAdded = true;
    } else {
      if (!state.appliedFilters.amenities.includes(name)) {
        state.appliedFilters.amenities.push(name);
        state.appliedFilters[name] = !state.appliedFilters[name];
        state.appliedFilters.amenitiesAdded = true;
      }
    }
  } else {
    state.appliedFilters[name] = !state.appliedFilters[name];
  }
};
