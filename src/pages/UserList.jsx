import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${page}`)
    .then((res) => {
      setUsers(res.data.data)
      setTotalPages(res.data.total_pages)
    });
  }, [page]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      toast.success("User deleted!");
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  const closeEditModal = () => setEditUser(null);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${editUser.id}`, formData);
      toast.success("User updated!");
      setUsers(users.map(user => (user.id === editUser.id ? { ...user, ...formData } : user)));
      closeEditModal();
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br from-gray-900 to-gray-700 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-8 text-white">User List</h2>
      <ToastContainer/>
      {
        users.length>0?
        (
          <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition ${editUser ? 'blur-md' : ''}`}>
        {users.map((user) => (
          <div key={user.id} className="bg-white/10 backdrop-blur-md p-6 shadow-lg rounded-xl text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto border-4 border-blue-400" />
            <h3 className="text-lg font-semibold mt-3 text-white">{user.first_name} {user.last_name}</h3>
            <p className="text-gray-300">{user.email}</p>

            <div className="flex justify-center mt-4 space-x-3">
              <button onClick={() => openEditModal(user)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                Edit
              </button>
              <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
               Delete
              </button>
            </div>
          </div>
        ))}
      </div>
          </>
        ):
        (
          <div className="bg-white/10 backdrop-blur-md p-6 shadow-lg rounded-xl text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"> 
            <h2 className="text-2xl font-bold text-white">No users found!</h2>
          </div>
        )
      }
      <div className="flex justify-center mt-8 space-x-4">
        <button 
          className={`px-6 py-2 rounded-md font-semibold transition ${page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`} 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}
        >
          ⬅️ Previous
        </button>
        <button 
          className={`px-6 py-2 rounded-md font-semibold transition ${page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`} 
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next ➡️
        </button>
      </div>

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-30 backdrop-blur-md p-4">
          
          <div className="bg-white/30 backdrop-blur-lg border border-white/30 w-full max-w-md p-6 rounded-lg shadow-2xl text-white">
            <h3 className="text-2xl font-bold mb-4 ">Edit User</h3>
            <input
              type="text"
              className="w-full px-4 py-2 border border-white/50 bg-white/10 text-white rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border border-white/50 bg-white/10 text-white rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
            <input
              type="email"
              className="w-full px-4 py-2 border border-white/50 bg-white/10 text-white rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div className="flex justify-end space-x-3 mt-4">
              <button onClick={closeEditModal} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
