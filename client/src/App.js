import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const refreshUsers = () => {
    setShowForm(false); 
  };

  return (
    <div>
      <h1>User Management</h1>
      {!showForm ? (
        <UserList onEdit={handleEdit} onAdd={handleAdd} />
      ) : (
        <UserForm
          user={editingUser}
          onClose={handleCloseForm}
          onRefresh={refreshUsers}
        />
      )}
    </div>
  );
};

export default App;


