import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../component/Shared/Loading/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_57msieEJ1KP1lE1knSx1q7zs00kmtdUwh3");

const Payment = () => {
  const { id } = useParams();
  const url = `https://pure-savannah-52177.herokuapp.com/doctorsRoute/payment/${id}`;
  const { data: appointment, isLoading } = useQuery(["appointment", id], () =>
    fetch(url, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  console.log(appointment);
  return (
    <div>
      <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <p className="text-success font-bold">
            Hello, {appointment?.patientName}
          </p>
          <h2 className="card-title">Pay for {appointment?.treatment}</h2>
          <p>
            Your Appointment: {appointment?.date} at {appointment?.slot}
          </p>
          <p>please pay ${appointment?.price}</p>
        </div>
      </div>
      <div className="card w-50 flex-shrink-0 max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm appointment={appointment} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
