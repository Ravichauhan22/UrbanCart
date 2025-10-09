import { useState, useEffect } from "react";
import{useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";



  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    } 
  }, [navigate, userInfo, redirect]); 





  return (
    <div>

      <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[ 4rem ] mt-[5rem]"> 
        <h1 className="text-2xl font-semibold mb-4">Sign IN</h1>


        <form className= "container w-[40rem]">
        <div className ="my-[2rem]">
          <label
       htmlFor="email" 
       className="block text-sm font-medium text-black "
       >
        Email Address
        </label>  

      <input 
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter email"
      className="mt-1 p-2 border rounded w-full"
      /> 
           </div>
            <div className ="my-[2rem]">
          <label
       htmlFor="Password" 
       className="block text-sm font-medium text-black "
       >
        Password
        </label>  

      <input 
      type="Password"
      id="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter Password"
      className="mt-1 p-2 border rounded w-full"
      /> 
           </div>

           <button disabled={isLoading}
                    type="submit"
                   className="bg-blue-500 text-white px-4 py-2 rounded-cursor-pointer my-[1rem] ">{isLoading ? "Signing In..." : "Sign In"}
           </button>   

           {isLoading && <Loader />}
           </form> 
           <div className="mt-4">
            <p className="text-whte">
            New Customer?{' '}
            <Link to ={redirect ? `/register?redirect=${redirect}` : '/register'} 
            className="text-blue-500 hover:underline">Regster</Link>
            </p>  
            </div>
        </div> 
      </section>
    </div>
  );
};

export default Login;