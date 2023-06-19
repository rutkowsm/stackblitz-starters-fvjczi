import React, { useState, useContext, createContext } from 'react';
import './style.css';

const UserContext = createContext();
const FilterContext = createContext();
const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState('');

  const setFilterValue = (value) => {
    setFilter(value);
  };

  return (
    <FilterContext.Provider value={{ filter, setFilterValue }}>
      {children}
    </FilterContext.Provider>
  );
};

const AddUser = () => {
  const { addUser } = useContext(UserContext);
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      addUser({ name });
      setName('');
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter name"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

const FilterUser = () => {
  const { setFilterValue } = useContext(FilterContext);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterValue(filter);
  };

  return (
    <div>
      <h2>Filter Users</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter filter"
        />
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

const UserList = () => {
  const { users } = useContext(UserContext);
  const { filter } = useContext(FilterContext);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

const GroupedUserList = () => {
  const { users } = useContext(UserContext);
  const { filter } = useContext(FilterContext);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const groupByInitials = (users) => {
    const groupedUsers = {};

    users.forEach((user) => {
      const initial = user.name.charAt(0).toUpperCase();
      if (groupedUsers[initial]) {
        groupedUsers[initial].push(user);
      } else {
        groupedUsers[initial] = [user];
      }
    });

    return groupedUsers;
  };

  const groupedUsers = groupByInitials(filteredUsers);

  return (
    <div>
      <h2>Grouped User List</h2>
      {Object.keys(groupedUsers).map((initial) => (
        <div key={initial}>
          <h3>{initial}</h3>
          <ul>
            {groupedUsers[initial].map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <FilterProvider>
        <div>
          <AddUser />
          <FilterUser />
          <UserList />
          <GroupedUserList />
        </div>
      </FilterProvider>
    </UserProvider>
  );
};

export default App;
