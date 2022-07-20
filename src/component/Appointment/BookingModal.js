import { format } from "date-fns";
import React from "react";

const BookingModal = ({ treatment, setTreatment, date }) => {
  const { _id, name, slots } = treatment;
  const handleBooking=event=>{
    event.preventDefault();
    const slot = event.target.slot.value;
    setTreatment(null)
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
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />
            <select name="slot" className="select select-bordered w-full max-w-xs">
              {
                slots.map(slot=><option value={slot} key={slot}>{slot}</option>)
              }
            </select>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              placeholder="Your Valid Email"
              name="email"
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
