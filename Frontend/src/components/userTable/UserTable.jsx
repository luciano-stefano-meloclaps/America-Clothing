import React, { useState, useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserShield,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SearchBarUser from "../searchBarUser/SearchBarUser";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const navigate = useNavigate();

  const onClickAddUser = () => {
    navigate("/add-user");
  };

  const onClickUpdateUser = (userId) => {
    navigate(`/update-user/${userId}`);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FontAwesomeIcon icon={faUserShield} />;
      case "client":
        return <FontAwesomeIcon icon={faUser} />;
      case "employee":
        return <FontAwesomeIcon icon={faUserTie} />;
      default:
        return null;
    }
  };

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/User");
      if (Array.isArray(response.data)) {
        setUsers(response.data);
        setFilteredUsers(response.data); // Inicializar los usuarios filtrados
      } else {
        throw new Error("La respuesta no es un array");
      }
    } catch (error) {
      console.error("No se pudieron cargar los usuarios.", error);
    }
  };

  // Polling effect
  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
    // const intervalId = setInterval(fetchUsers, 5000); // Polling every 5 seconds

    // return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleSearch = (filters) => {
    const { name, lastName, email } = filters;
    const newFilteredUsers = users.filter((user) => {
      return (
        (!name || user.name.toLowerCase().includes(name.toLowerCase())) &&
        (!lastName ||
          user.lastName.toLowerCase().includes(lastName.toLowerCase())) &&
        (!email || user.email.toLowerCase().includes(email.toLowerCase()))
      );
    });
    setFilteredUsers(newFilteredUsers);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  const handleClear = () => {
    setFilteredUsers(users); // Limpiar los filtros
    setCurrentPage(1); // Resetear a la primera página al limpiar
  };

  // Lógica de paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentStart = indexOfFirstUser + 1;
  const currentEnd = Math.min(indexOfLastUser, filteredUsers.length);

  return (
    <div className="table-responsive p-3">
      <div className="mb-3">
        <Button variant="primary" onClick={onClickAddUser}>
          Añadir Usuario
        </Button>
      </div>

      <SearchBarUser onSearch={handleSearch} onClear={handleClear} />
      {currentUsers.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h4>No tenemos resultados para tu búsqueda.</h4>
          <p>Por favor, intentá con otros filtros.</p>
        </Alert>
      ) : (
        <>
          <h5 className="text-info">
            Mostrando usuarios del {currentStart} al {currentEnd} &nbsp; &nbsp;
            Total: {filteredUsers.length}
          </h5>
          <Table striped bordered hover variant="dark" className="align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Modificar</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{indexOfFirstUser + index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      onClick={() => onClickUpdateUser(user.id)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                  <td>
                    {getRoleIcon(user.usertype)} {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "primary" : "outline-primary"}
                onClick={() => setCurrentPage(index + 1)}
                className="mx-1"
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
