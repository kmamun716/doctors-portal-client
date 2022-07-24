import React, { useEffect } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../component/Shared/Loading/Loading";
import auth from "../../firebase.config";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, Euser, Eloading, Eerror] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  let signInErrorMessage;

  useEffect(()=>{    
    navigate(from, { replace: true });
  },[user, Euser, from, navigate])

  if(loading || Eloading || sending){
    return <Loading/>
  }

  if(error || Eerror || resetError){
    const erroMessage = error?.message || Eerror?.message || resetError?.message;
    const splitErrorMessage = erroMessage.split(":");
    signInErrorMessage = <p className="text-red-500">{splitErrorMessage[1]}</p>
  }
  const onSubmit = (data) => {
    const {email, password} = data;
    signInWithEmailAndPassword(email, password);
  };  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-black">Email:</span>
                </label>
                <input
                    {...register("email", { required: "Email Address is required" })}
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
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                />
                {errors.password?.type === "required" && <p className="text-red-500">Password is required</p>}
                </div>
                <input
                className="btn btn-outline btn-accent w-full max-w-xs mt-4"
                type="submit"
                value="Login"
                />
          </form>
          {signInErrorMessage}
          <p>New To Doctors Portal? <Link className="text-primary" to='/register'>Create New Account</Link></p>
          <p onClick={()=>sendPasswordResetEmail()}>Forgot Password</p>
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

export default Login;
