import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../AdminLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    dateOfHire: '',
    phone: '',
    salary: 0,
    bonuses: 0,
    benefits: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/employees', employeeData);
      console.log('Employee created:', response.data);
      toast.success('Employee created successfully!');
    } catch (error) {
      console.error('Error creating employee:', error);
      toast.error('Error creating employee.');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">First Name</label>
            <input type="text" name="firstName" value={employeeData.firstName} onChange={handleChange} className="form-input mt-1 block w-full" required />
          </div>
          <div>
            <label className="block mb-1">Last Name</label>
            <input type="text" name="lastName" value={employeeData.lastName} onChange={handleChange} className="form-input mt-1 block w-full" required />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" name="email" value={employeeData.email} onChange={handleChange} className="form-input mt-1 block w-full" required />
          </div>
          <div>
            <label className="block mb-1">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={employeeData.dateOfBirth} onChange={handleChange} className="form-input mt-1 block w-full" />
          </div>
          <div>
            <label className="block mb-1">Date of Hire</label>
            <input type="date" name="dateOfHire" value={employeeData.dateOfHire} onChange={handleChange} className="form-input mt-1 block w-full" />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input type="text" name="phone" value={employeeData.phone} onChange={handleChange} className="form-input mt-1 block w-full" />
          </div>
          <div>
            <label className="block mb-1">Salary</label>
            <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} className="form-input mt-1 block w-full" />
          </div>
          <div>
            <label className="block mb-1">Bonuses</label>
            <input type="number" name="bonuses" value={employeeData.bonuses} onChange={handleChange} className="form-input mt-1 block w-full" />
          </div>
          <div>
            <label className="block mb-1">Benefits</label>
            <textarea name="benefits" value={employeeData.benefits} onChange={handleChange} className="form-textarea mt-1 block w-full" rows="3"></textarea>
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <input type="text" name="role" value={employeeData.role} onChange={handleChange} className="form-input mt-1 block w-full" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Employee</button>
        </form>
        <ToastContainer />
      </div>
    </AdminLayout>
  );
};

export default CreateEmployee;
