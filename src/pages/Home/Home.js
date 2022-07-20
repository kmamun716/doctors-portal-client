import React from 'react';
import Banner from '../../component/Home/Banner';
import Info from '../../component/Home/Info';
import MakeAppointment from '../../component/Home/MakeAppointment';
import Service from '../../component/Home/Service';
import Testimonials from '../../component/Home/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Info/>
            <Service/>
            <MakeAppointment/>
            <Testimonials/>
        </div>
    );
};

export default Home;