import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import useSetAdmin from '../../customHooks/useSetAdmin';
import auth from "../../firebase.config";
import Loading from "../Shared/Loading/Loading";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, adminLoading] = useSetAdmin(user);
  let location = useLocation();
  if(loading || adminLoading){
    return <Loading/>
  }
  if(!isAdmin){
    signOut(auth)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAdmin;
