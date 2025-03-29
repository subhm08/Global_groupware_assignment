import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`).then((res) => setUser(res.data.data));
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      toast.success("User updated successfully!");
      navigate("/users");
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Edit User</h2>
      <form onSubmit={updateUser} className="bg-white p-6 shadow-md rounded-md w-80">
        <input type="text" placeholder="First Name" className="border p-2 w-full mb-2" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
        <input type="text" placeholder="Last Name" className="border p-2 w-full mb-2" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
        <input type="email" placeholder="Email" className="border p-2 w-full mb-4" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <button className="bg-blue-500 text-white w-full p-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
