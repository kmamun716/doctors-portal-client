import React from "react";
import clock from "../../assets/icons/clock.svg";
import marker from "../../assets/icons/marker.svg";
import phone from "../../assets/icons/phone.svg";
import InfoCard from "../Shared/SharedComponent/InfoCard";

const Info = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <InfoCard
        cardTitle="Opening Hours"
        bgClass="bg-gradient-to-r from-primary to-secondary"
        para="Lorem Ipsum is simply dummy text of the pri"
        img={clock}
      />
      <InfoCard
        cardTitle="Visit Our Location"
        bgClass="bg-info"
        para="Brooklyn, NY 10036, United States"
        img={marker}
      />
      <InfoCard
        cardTitle="Contact us now"
        bgClass="bg-gradient-to-r from-secondary to-primary"
        para="+000 123 456789"
        img={phone}
      />
    </div>
  );
};

export default Info;
