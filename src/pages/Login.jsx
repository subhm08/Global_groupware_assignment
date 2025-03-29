import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState({ "email": true, "password": true });
  const [formValue, setFormValue] = useState({ "email": "", "password": "" });

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: formValue[field] == "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://reqres.in/api/login", formValue)
      localStorage.setItem("token", res.data.token);
      toast.success("Successfully Login!!!")
      setTimeout(() => {
        navigate("/users");
      }, 3000);

    }
    catch (error) {
      toast.error("User not Found!!!")
    }
  }

  return (
    <div className='bg-blue-100 flex justify-center items-center w-screen h-screen'>
      <div className='bg-white  w-1/2 shadow rounded-lg'>
        <h1 className='text-3xl font-bold text-white  text-center bg-blue-500 px-4 py-2 rounded-t-lg font-mono'>Sign In</h1>
        <ToastContainer />
        <form className='flex flex-col p-10'>

          <label hidden={isFocused.email} className='text-lg font-bold ' >Email:</label>
          <input type="text"
            placeholder={isFocused.email ? "Email" : ""}
            className="p-2 outline-none  border-b border-gray-400 focus:border-b-2 focus:border-blue-500"
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            value={formValue.email}
            onChange={(e) => { setFormValue({ ...formValue, email: e.target.value }) }}
          />

          <label hidden={isFocused.password} className='text-lg font-bold mt-4'>Password:</label>
          <input type="password"
            placeholder={isFocused.password ? "Password" : ""}
            className={`p-2 outline-none  border-b border-gray-400 focus:border-b-2 focus:border-blue-500 ${isFocused.password && 'mt-4'}`}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
            value={formValue.password}
            onChange={(e) => { setFormValue({ ...formValue, password: e.target.value }) }}
          />

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 "
            onClick={handleSubmit}
          >
            Login
          </button>

        </form>
      </div>

    </div>
  )
}

export default Login