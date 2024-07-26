import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './studentdata.css';

const Display = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [userData, setUserData] = useState({
    id: "", name: "", age: "", grade: "", subjects: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getAllUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/students');
      setUsers(res.data);
      setFilterUsers(res.data);
    } catch (error) {
      console.error('There was an error fetching the users:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getAllUsers();
  };

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(search)
    );
    setFilterUsers(filteredUsers);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/students/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      setFilterUsers(updatedUsers);
    } catch (error) {
      console.error('There was an error deleting the student:', error);
    }
  };

  const handleAddData = () => {
    setUserData({ id: "", name: "", age: "", grade: "", subjects: "" });
    setIsModalOpen(true);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: name === "subjects" ? value.split(',').map(subject => subject.trim()) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.id) {
        await axios.patch(`http://localhost:3001/students/${userData.id}`, userData);
        console.log("User data updated:", userData);
      } else {
        await axios.post("http://localhost:3001/students", userData);
        console.log("New user data added:", userData);
      }
      closeModal();
      setUserData({ id: "", name: "", age: "", grade: "", subjects: "" });
    } catch (error) {
      console.error('There was an error submitting the data:', error);
    }
  };

  const handleUpdate = (user) => {
    setUserData(user);
    setIsModalOpen(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filterUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterUsers.length / itemsPerPage);

  return (
    <div>
      <div className='flex'>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
        <button onClick={handleAddData}>Add Data</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.grade}</td>
              <td>{user.subjects}</td>
              <td>
                <button onClick={() => handleUpdate(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}
      {isModalOpen &&
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <h1>Student Record</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={userData.name} onChange={handleData} required />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" value={userData.age} onChange={handleData} required />
              </div>
              <div className="form-group">
                <label htmlFor="grade">Current Grade</label>
                <input type="text" id="grade" name="grade" value={userData.grade} onChange={handleData} required />
              </div>
              <div className="form-group">
                <label htmlFor="subjects">Subject</label>
                <input type="text" id="subjects" name="subjects" value={userData.subjects} onChange={handleData} required />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
};

export default Display;
