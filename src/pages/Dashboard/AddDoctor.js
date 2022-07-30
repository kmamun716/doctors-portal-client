import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Loading from "../../component/Shared/Loading/Loading";

const AddDoctor = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  const { data: services, isLoading } = useQuery(["services"], () =>
    fetch("https://pure-savannah-52177.herokuapp.com/doctorsRoute/services").then((res) =>
      res.json()
    )
  );
  const imageStorageKey = '1b6521bd0bd67a12328f7f6c0e209344';
  const onSubmit = async (data) => {
    const formData = new FormData();
    const image = data.photo[0];
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    formData.append('image', image)
    fetch(url,{
      method: 'POST',
      body: formData
    })
    .then(res=>res.json())
    .then(result=>{
      if(result.success){
        const imgUrl = result.data.url;
        const doctor = {
          name: data.name,
          email: data.email,
          speciality: data.specialization,
          img: imgUrl
        }

        //add doctor to database
        fetch("https://pure-savannah-52177.herokuapp.com/doctorsRoute/addDoctor",{
          method: 'POST',
          headers:{
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(doctor)
        })
        .then(res=>res.json())
        .then(doctorsData=>{
          if(doctorsData.insertedId){
            navigate('/dashboard/manage-doctor',{replace: true})
            toast.success(`Doctor ${doctor.name} added successfully`);
            reset()
          } else {
            toast.error('Failed to Add the Doctor')
          }
        })
      }
    })
  };
  if(isLoading){
    return <Loading/>
  }
  return (
    <div>
      <h2 className="text-2xl">Add a new doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-black">Name:</span>
          </label>
          <input
            {...register("name", {
              required: "Name is Required",
            })}
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-red-500">{errors.name?.message}</p>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-black">Email:</span>
          </label>
          <input
            {...register("email", {
              required: "Email Address is required",
            })}
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-black">Specialization:</span>
          </label>
        <select {...register("specialization")} className="select w-full max-w-xs">
          {
            services?.map(service=><option key={service._id} value={service.name}>{service.name}</option>)
          }
        </select>
          {errors.specialization?.type === "required" && (
            <p className="text-red-500">Doctors Service is required</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-black">Photo:</span>
          </label>
          <input
            {...register("photo", {
              required: "Photo is Required",
            })}
            type="file"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-red-500">{errors.name?.message}</p>
        </div>

        <input
          className="btn btn-outline btn-accent w-full max-w-xs mt-4"
          type="submit"
          value="Add Doctor"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
