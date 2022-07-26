import React, { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../component/Shared/Loading/Loading";
import useToken from "../../customHooks/useToken";
import auth from "../../firebase.config";

const Register = () => {
  const [checked, setChecked] = useState(false);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user1, loading1, error1] =
    useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [token] = useToken(user || user1);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  useEffect(()=>{
    if (token) {
      navigate(from, { replace: true });
    }
  },[token,from, navigate])
  let signInErrorMessage;
  let confirmPasswordError;
  if (loading || loading1 || updating) {
    return <Loading />;
  }
  if (error || error1 || updateError) {
    const erroMessage =
      error?.message || error1?.message || updateError?.message;
    const splitErrorMessage = erroMessage.split(":");
    signInErrorMessage = <p className="text-red-500">{splitErrorMessage[1]}</p>;
  }
  const onSubmit = async (data) => {
    console.log(data);
    const { name, email, password, confirmPassword } = data;
    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
    } else {
      confirmPasswordError = <p>Password not Matched</p>;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-xl font-bold">Register Here</h2>
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
                <span className="label-text text-black">Password:</span>
              </label>
              <input
                name="password"
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-black">Confirm Password:</span>
              </label>
              <input
                name="confirmPassword"
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full max-w-xs"
              />
              <div class="form-control">
                <label class="cursor-pointer label">
                  <span class="label-text text-black">Accept Terms and Conditions</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={()=>setChecked(!checked)}
                    class="checkbox checkbox-secondary"
                  />
                </label>
              </div>
              {confirmPasswordError}
              {errors.confirmPassword?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
            </div>
            <input
              className="btn btn-outline btn-accent w-full max-w-xs mt-4"
              type="submit"
              disabled={!checked}
              value="Register"
            />
          </form>
          {signInErrorMessage}
          <p>
            Already Have Account?{" "}
            <Link className="text-primary" to="/login">
              Login Here
            </Link>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline btn-accent"
          >
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
