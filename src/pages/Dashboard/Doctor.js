import React from "react";

const Doctor = ({ doctor, index, setDeleteDoctor }) => {
  const { name, img, speciality } = doctor;
  
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="w-10 rounded">
            <img src={img} alt={name} />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{speciality}</td>
      <td>
        <label htmlFor="delet-confirmation-modal" onClick={()=>setDeleteDoctor(doctor)} className="btn btn-error btn-xs">Delete doctor</label>
      </td>
    </tr>
  );
};

export default Doctor;
