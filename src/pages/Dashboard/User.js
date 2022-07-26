import React from "react";
import { toast } from "react-toastify";

const User = ({ index, user, refetch }) => {
  const handleMakeAdmin = (email) => {
    fetch(`http://localhost:4000/doctorsRoute/user/makeAdmin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Successfully Maked an Admin");
          refetch();
        } else {
          toast.error("You dont have permission to make admin");
        }
      });
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        {user.role !== "admin" && (
          <button
            className="btn btn-xs"
            onClick={() => handleMakeAdmin(user.email)}
          >
            Make Admin
          </button>
        )}
      </td>
      <td>
        {user.role === "admin" && (
          <button className="btn btn-warning btn-xs">Remove Admin</button>
        )}
      </td>
      <td>
        <button className="btn btn-warning btn-xs">Delete User</button>
      </td>
    </tr>
  );
};

export default User;
