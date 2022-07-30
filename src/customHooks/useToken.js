import { useEffect, useState } from "react";
const useToken=user=>{
    const [token, setToken] = useState('');
    useEffect(()=>{
        const email = user?.user?.email;
        const currentUser = {email: email};
        if(email){
            fetch(`https://pure-savannah-52177.herokuapp.com/doctorsRoute/user/${email}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data=>{
                const token = data.accessToken;
                localStorage.setItem('accessToken', token)
                setToken(token)
            })
        }
    },[user])
    return[token];
}

export default useToken;