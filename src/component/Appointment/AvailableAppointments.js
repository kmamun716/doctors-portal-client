import { format } from "date-fns";
import React, { useEffect, useState } from 'react';
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointments = ({date}) => {
    const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);
    useEffect(()=>{
        fetch('services.json')
        .then(res=>res.json())
        .then(data=>setServices(data));
    },[]);
    return (
        <div>
            <h4 className="text-xl text-primary text-center">Available Appointments on : {format(date, "PP")}</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    services.map(service=><Service key={service._id} setTreatment={setTreatment} service={service} />)
                }
            </div>
            {
                treatment && <BookingModal date={date} treatment={treatment} setTreatment={setTreatment} />
            }
        </div>
    );
};

export default AvailableAppointments;