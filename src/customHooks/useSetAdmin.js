import { useEffect, useState } from "react";
const useSetAdmin = (user) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    fetch(`https://pure-savannah-52177.herokuapp.com/doctorsRoute/admin/${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.admin) {
            setAdminLoading(false)
          setIsAdmin(result.admin);
        }
      });
  }, [user]);
  
  return [isAdmin, adminLoading];
};

export default useSetAdmin;
