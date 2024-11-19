import React, { useEffect, useState } from 'react';
import {  deleteUser } from '../utils/api';
import './index.css'

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    const url = 'http://localhost:5000/users'
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await fetch(url, options)
  const data = await response.json()
  console.log(data)
  setUsers(data)
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await deleteUser(id);
      alert(result.message)
      setUsers(users.filter((user) => user._id !== id));
    } catch {
      setError('Failed to delete user. Please try again.');
    }
  };

  return (
    <center>
      <button onClick={onEdit}>Add User</button>
      {error && <p className="error">{error}</p>}
      {users.length > 0 ? (<table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>):(<p>No Users List, To Display The User Details Add user</p>)}
    </center>
  );
};

export default UserList;
