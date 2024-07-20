import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import { Modal, Button, Form, Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";

const EmployeeOnboarding = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    employeeID: 0,
    name: "",
    password: "",
    email: "",
    phoneNo: "",
    role: 1,
  });
  const [editing, setEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5173/api/Employee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleShowModal = (employee) => {
    debugger
    setCurrentEmployee(
      employee
        ? employee
        : { employeeID: 0, name: "", password: "", email: "", phoneNo: "", role: 1 }
    );
    setEditing(!!employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `http://localhost:5173/api/Employee/${currentEmployee.employeeID}`,
          currentEmployee
        );
      } else {
        await axios.post("http://localhost:5173/api/Employee", currentEmployee);
      }
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5173/api/Employee/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  return (
    <>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
        <div className="main-content">
          <div className="container mt-4">
            <Button variant="primary" onClick={() => handleShowModal(null)}>
              Onboard Employee
            </Button>
            <Table className="table table-hover table-bordered table-striped mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee, index) => (
                  <tr key={employee.employeeID}>
                    <td>{index + 1}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNo}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleShowModal(employee)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(employee.employeeID)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber + 1}
                  active={pageNumber + 1 === currentPage}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? "Edit Employee" : "Add Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentEmployee.name}
                onChange={(e) =>
                  setCurrentEmployee({
                    ...currentEmployee,
                    name: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={currentEmployee.password}
                onChange={(e) =>
                  setCurrentEmployee({
                    ...currentEmployee,
                    password: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentEmployee.email}
                onChange={(e) =>
                  setCurrentEmployee({
                    ...currentEmployee,
                    email: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNo">
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="text"
                value={currentEmployee.phoneNo}
                onChange={(e) =>
                  setCurrentEmployee({
                    ...currentEmployee,
                    phoneNo: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editing ? "Save Changes" : "Add Employee"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployeeOnboarding;
