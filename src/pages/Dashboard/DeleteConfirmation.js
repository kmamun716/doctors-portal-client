import React from "react";
import { toast } from 'react-toastify';

const DeleteConfirmation = ({deleteDoctor, refetch, setDeleteDoctor}) => {
    const {_id, name} = deleteDoctor;
    const handleDelete = id =>{
        fetch(`https://pure-savannah-52177.herokuapp.com/doctorsRoute/doctor/${id}`,{
            method:'DELETE',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.deletedCount){
                toast.success(`Dr. ${name} is deleted`)
                setDeleteDoctor(null)
                refetch()
            }else {
                toast.error('there have may some problem')
            }
        })
      }
  return (
    <div>

      <input type="checkbox" id="delet-confirmation-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">
            are you sure you want to delete Dr. {name}?
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
          <label htmlFor="delet-confirmation-modal" onClick={()=>handleDelete(_id)} className="btn btn-error btn-sm">Confirm</label>
            <label htmlFor="delet-confirmation-modal" className="btn btn-info btn-sm">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
