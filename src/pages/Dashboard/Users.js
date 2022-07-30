import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../component/Shared/Loading/Loading";
import User from './User';

const Users = () => {
  const { data: users, isLoading, refetch } = useQuery(["users"], () =>
    fetch("https://pure-savannah-52177.herokuapp.com/doctorsRoute/users",{
        method:"GET",
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then((res) => res.json())
  );
  
  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div>
      <h2 className="text-2xl">All Users: {users?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-white">
              <th>Sl No:</th>
              <th>User Email</th>
              <th>Role</th>
              <th>Make Admin Section</th>
              <th>Admin Removed Section</th>
              <th>User Removed Section</th>
            </tr>
          </thead>
          <tbody>
            {
                users?.map((user, index)=><User key={index} user={user} index={index} refetch={refetch} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
