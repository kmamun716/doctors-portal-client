import { useQuery } from '@tanstack/react-query';
import { format } from "date-fns";
import React, { useState } from 'react';
import Loading from '../Shared/Loading/Loading';
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointments = ({date}) => {
    const [treatment, setTreatment] = useState(null);
    const formatedDate = format(date, "PP");
    

    const {data: services, isLoading, refetch} = useQuery(['available', formatedDate],()=>fetch(`http://localhost:4000/doctorsRoute/available?date=${formatedDate}`).then(res=>res.json())
    )
    if(isLoading){
        return <Loading/>
    }
    return (
        <div>
            <h4 className="text-xl text-primary text-center">Available Appointments on : {format(date, "PP")}</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
                {
                    services?.map(service=><Service key={service._id} setTreatment={setTreatment} service={service} />)
                }
            </div>
            {
                treatment && <BookingModal date={date} treatment={treatment} refetch={refetch} setTreatment={setTreatment} />
            }
        </div>
    );
};

export default AvailableAppointments;