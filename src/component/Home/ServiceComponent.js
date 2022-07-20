import React from "react";

const ServiceComponent = ({serv}) => {
    const {img, title, details} = serv;
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={img}
          alt={title}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{details}</p>
      </div>
    </div>
  );
};

export default ServiceComponent;
