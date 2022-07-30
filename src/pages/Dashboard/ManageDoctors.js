import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../component/Shared/Loading/Loading';
import DeleteConfirmation from './DeleteConfirmation';
import Doctor from './Doctor';

const ManageDoctors = () => {
  const [deleteDoctor, setDeleteDoctor] = useState(null);
    const { data: doctors, isLoading, refetch } = useQuery(["doctors"], () =>
    fetch("https://pure-savannah-52177.herokuapp.com/doctorsRoute/doctors",{
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then((res) =>
      res.json()
    )
  );
  if(isLoading){
    return <Loading/>
  }
    return (
        <div>
            <h2 className="text-2xl">Manage Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-white">
              <th>Sl No:</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Speciality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              doctors?.map((doctor, index)=><Doctor key={doctor._id} setDeleteDoctor={setDeleteDoctor} doctor={doctor} index={index} />)
            }
          </tbody>
        </table>
      </div>
      {
        deleteDoctor && <DeleteConfirmation setDeleteDoctor={setDeleteDoctor} refetch={refetch} deleteDoctor={deleteDoctor} />
      }
        </div>
    );
};

export default ManageDoctors;