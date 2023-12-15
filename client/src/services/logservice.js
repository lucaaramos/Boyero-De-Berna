import axios from 'axios';

export default function login({email,password}){
    const config = {
        method: "POST",
        baseURL: `${process.env.REACT_APP_URI_API}/user/login`,
        data: {
          email,
          password
        },
        };
        return axios(config).then(res=>{
                return {
                        token:res.data.token,
                        user:res.data.result
                }
        })
}
