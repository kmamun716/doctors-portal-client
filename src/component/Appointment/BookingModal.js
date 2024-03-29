import { format } from "date-fns";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.config';

const BookingModal = ({ treatment, setTreatment, date, refetch }) => {
  const [user] = useAuthState(auth);
  const { _id, name, slots, price } = treatment;
  const formatedDate= format( date, "PP");
  const handleBooking=event=>{
    event.preventDefault();
    const slot = event.target.slot.value;
    const booking = {
      treatmentId: _id,
      treatment: name,
      date: formatedDate,
      slot,
      price,
      patient: user?.email,
      patientName: user?.displayName,
      phone: event.target.phone.value
    }
    fetch('http://localhost:4000/doctorsRoute/booking',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(booking)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.success){
        toast(`Appointment is set, ${formatedDate} at ${slot}`)
      }else{
        toast.error(`Appointment already booked, ${data.booking?.date} at ${data.booking?.slot}`)
      }
      refetch()
      setTreatment(null)
    })
  }
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-center text-secondary">
            {name}
          </h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-4 justify-items-center my-2">
            <input
              type="text"
              readOnly
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />
            <select name="slot" className="select select-bordered w-full max-w-xs">
              {
                slots.map((slot, index)=><option value={slot} key={index}>{slot}</option>)
              }
            </select>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              readOnly
              value={user?.displayName}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              placeholder="Your Valid Email"
              name="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-secondary w-full max-w-xs text-white uppercase"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
