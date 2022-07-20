import React, { useState } from 'react';
import AppointmentBanner from '../../component/Appointment/AppointmentBanner';
import AvailableAppointments from '../../component/Appointment/AvailableAppointments';

const Appointment = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner date={date} setDate={setDate}/>
            <AvailableAppointments date={date}/>
        </div>
    );
};

export default Appointment;