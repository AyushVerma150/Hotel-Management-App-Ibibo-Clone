import React from "react";
import otherConstants from "Constants/OtherConstants";
import styles from "Components/Hotel/Hotel.module.css";

const HotelPolicy = () => {
  const hotelPolicies = otherConstants.hotelPolicies;
  return (
    <div>
      {hotelPolicies.map((policy) => {
        return (
          <div classname={styles.policyinnerdiv}>
            <p>
              {otherConstants.checkIcon} {policy}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HotelPolicy;
