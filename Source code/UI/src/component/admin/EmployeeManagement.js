import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Modal, Button, Form, Table, Pagination } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Sidebar";
import { baseUrl } from "../../constants";

const EmployeeManagement = () => {
  const [Managers, setManagers] = useState([]);
  const [managerID, setManagerID] = useState("");
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const designations = [
    "Software developer",
    "Senior Software developer",
    "Manager",
    "Senior Manager",
    "Database Architect",
  ];
  const departments = ["HR", "IT", "Development", "Finance"];
  const pageSize = 10;

  useEffect(() => {
    fetchEmployees();
    fetchUsers();
    fetchManagers();
  }, [page]);

  const fetchManagers = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/Manager`);
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching Managers:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5173/api/EmployeeInformation`
      );
      setEmployees(response.data);
      setTotalPages(Math.ceil(response.data.length / pageSize));
    } catch (error) {
      console.error("Error fetching employee data", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5173/api/Employee`);
      setUsers(response.data);
      console.log("Users", response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleShowModal = (employee = {}) => {
    debugger;
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEmployee({});
  };

  const handleSave = async () => {
    try {
      currentEmployee.managerID = managerID;
      if (currentEmployee.id) {
        await axios.put(
          `http://localhost:5173/api/EmployeeInformation/${currentEmployee.id}`,
          currentEmployee
        );
      } else {
        await axios.post(`http://localhost:5173/api/EmployeeInformation`, {
          ...currentEmployee,
          employeeID: currentEmployee.employeeID,
          role: 1,
        });
      }
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving employee data", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      try {
        await axios.delete(
          `http://localhost:5173/api/EmployeeInformation/${id}`
        );
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const retrunManagerName = (empId) => {
    const manager = employees.find((employee) => employee.employeeID === empId);
    if (manager !== null && manager !== undefined)
      return Managers.find((x) => x.managerID == manager.managerID)
        ?.managerName;
        else
        return "No Manager";
  };

  const renderTableRows = () => {
    const startIndex = (page - 1) * pageSize;
    const selectedEmployees = employees.slice(
      startIndex,
      startIndex + pageSize
    );

    return selectedEmployees.map((employee, index) => (
      <tr key={employee.employeeID}>
        <td>{index + 1}</td>
        <td>
          {users.find((user) => user.employeeID === employee.employeeID)?.name}
        </td>
        <td>{retrunManagerName(employee.employeeID)}</td>
        <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
        <td>{employee.designation}</td>
        <td>{employee.department}</td>

        <td>
          <Button variant="warning" onClick={() => handleShowModal(employee)}>
            Edit
          </Button>{" "}
          <Button variant="danger" onClick={() => handleDelete(employee.id)}>
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  const renderPagination = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
        <div className="main-content">
          <div className="container mt-5">
            <Button
              className="mb-3"
              variant="primary"
              onClick={() => handleShowModal()}
            >
              Add Information
            </Button>
            <Table className="table-hover table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Manager</th>
                  <th>Joining Date</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </Table>
            {renderPagination()}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentEmployee.employeeID ? "Edit Employee" : "Add Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmployeeID">
              <Form.Label>User</Form.Label>
              <Form.Control
                as="select"
                name="employeeID"
                value={currentEmployee.employeeID || ""}
                onChange={handleInputChange}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.employeeID} value={user.employeeID}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formManager">
              <Form.Label>Manager</Form.Label>
              <Form.Control
                as="select"
                name="ManagerID"
                value={managerID || ""}
                onChange={(e) => setManagerID(e.target.value)}
              >
                <option value="">Select Manager</option>
                {Managers.map((manager) => (
                  <option key={manager.managerID} value={manager.managerID}>
                    {manager.managerName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formJoiningDate">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="date"
                name="joiningDate"
                value={
                  currentEmployee.joiningDate
                    ? new Date(currentEmployee.joiningDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                as="select"
                name="designation"
                value={currentEmployee.designation || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Designation</option>
                {designations.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                name="department"
                value={currentEmployee.department || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSalary" style={{ display: "none" }}>
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                // value={currentEmployee.salary || ""}
                value={0}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeManagement;
