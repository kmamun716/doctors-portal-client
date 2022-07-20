import React from "react";
import chair from '../../assets/images/chair.png';

const Banner = () => {
  return (
      <div className="hero min-h-screen bg-banner">
        <div className="hero-content flex-col flex-1 lg:flex-row-reverse">
          <img
            src={chair}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="banner"
          />
          <div className="flex-1">
            <h1 className="text-5xl font-bold" style={{'color':'#3A4256'}}>Your New Smile Starts Now</h1>
            <p className="py-6" style={{'color':'#3A4256'}}>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary uppercase text-white font-bold">Get Started</button>
          </div>
        </div>
      </div>
  );
};

export default Banner;
