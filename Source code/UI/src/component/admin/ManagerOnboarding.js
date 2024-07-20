import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import { Modal, Button, Form, Table, Pagination } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { baseUrl } from "../../constants";

const ManagerOnboarding = () => {
  const [Managers, setManagers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentManager, setCurrentManager] = useState({
    managerID: 0,
    managername: "",
    password: "",
    email: "",
    phoneNo: "",
    role: 3,
  });
  const [editing, setEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/Manager`);
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching Managers:", error);
    }
  };

  const handleShowModal = (Manager) => {
    debugger
    setCurrentManager(
      Manager
        ? Manager
        : { ManagerID: 0, managername: "", password: "", email: "", phoneNo: "", role: 3   }
    );
    setEditing(!!Manager);
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
          `${baseUrl}api/Manager/${currentManager.managerID}`,
          currentManager
        );
      } else {
        await axios.post(`${baseUrl}api/Manager`, currentManager);
      }
      fetchManagers();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving Manager:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this Manager?")) {
      try {
        await axios.delete(`${baseUrl}api/Manager/${id}`);
        fetchManagers();
      } catch (error) {
        console.error("Error deleting Manager:", error);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastManager = currentPage * itemsPerPage;
  const indexOfFirstManager = indexOfLastManager - itemsPerPage;
  const currentManagers = Managers.slice(
    indexOfFirstManager,
    indexOfLastManager
  );
  const totalPages = Math.ceil(Managers.length / itemsPerPage);

  return (
    <>
      <Header />
      <div className="sidebar-container">
        <Sidebar />
        <div className="main-content">
          <div className="container mt-4">
            <Button variant="primary" onClick={() => handleShowModal(null)}>
              Onboard Manager
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
                {currentManagers.map((manager, index) => (
                  <tr key={manager.managerID}>
                    <td>{index + 1}</td>
                    <td>{manager.managerName}</td>
                    <td>{manager.email}</td>
                    <td>{manager.phoneNo}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleShowModal(manager)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(manager.managerID)}
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
            {editing ? "Edit Manager" : "Add Manager"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentManager.managerName}
                onChange={(e) =>
                  setCurrentManager({
                    ...currentManager,
                    managerName: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={currentManager.password}
                onChange={(e) =>
                  setCurrentManager({
                    ...currentManager,
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
                value={currentManager.email}
                onChange={(e) =>
                  setCurrentManager({
                    ...currentManager,
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
                value={currentManager.phoneNo}
                onChange={(e) =>
                  setCurrentManager({
                    ...currentManager,
                    phoneNo: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editing ? "Save Changes" : "Add Manager"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManagerOnboarding;
