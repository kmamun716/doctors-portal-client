import React from "react";
import cavity from "../../assets/images/cavity.png";
import floride from "../../assets/images/fluoride.png";
import whitening from "../../assets/images/whitening.png";
import ServiceComponent from "./ServiceComponent";

const Service = () => {
  const services = [
    {
      _id: 1,
      img: floride,
      title: "Fluoride Treatment",
      details:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      _id: 2,
      img: cavity,
      title: "Cavity Filling",
      details:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      _id: 3,
      img: whitening,
      title: "Teeth Whitening",
      details:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
  ];
  return (
    <div className="my-28">
      <div className="text-center">
        <h3 className="text-primary text-xl font-bold uppercase">
          Our Services
        </h3>
        <h2 className="text-4xl">Services We Provide</h2>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((serv) => (
          <ServiceComponent key={serv._id} serv={serv} />
        ))}
      </div>
      <div className="flex">
        <div className="hero bg-banner flex-auto justify-center">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://placeimg.com/260/400/arch"
              className="max-w-sm rounded-lg shadow-2xl"
              alt=""
            />
            <div>
              <h1 className="text-5xl font-bold" style={{'color':'#3A4256'}}>Exceptional Dental Care, on Your Terms</h1>
              <p className="py-6" style={{'color':'#3A4256'}}>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page
              </p>
              <button className="btn btn-primary text-white">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
