import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import auth from "../../firebase.config";

const MyAppointments = () => {
  const [user] = useAuthState(auth);
  const [appointments, setAppointments] = useState([]);
  const navigate= useNavigate();
  useEffect(() => {
    fetch(`https://pure-savannah-52177.herokuapp.com/doctorsRoute/booking?patient=${user?.email}`,{
      method: 'GET',
      headers:{
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((res) => {
        if(res.status === 401 || res.status === 403){
          signOut(auth)
          navigate('/', {replace: true})
          localStorage.removeItem('accessToken');
        }
        return res.json();
      })
      .then((data) => setAppointments(data));
  }, [user, navigate]);
  return (
    <div>
      <h2>My Appointments: {appointments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-white">
              <th>Sl No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Appointment Name</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} >
                <th>{index + 1}</th>
                <th>{appointment.patientName}</th>
                <td>{appointment.date}</td>
                <td>{appointment.treatment}</td>
                <td>{appointment.slot}</td>
                <td>
                  {
                    (appointment.price && !appointment.paid) && <Link to={`/dashboard/payment/${appointment._id}`} className='btn btn-sm btn-primary'>pay {appointment.price}</Link>
                  }
                  {
                    (appointment.price && appointment.paid) && <p className="text-xl text-success">Paid</p>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
