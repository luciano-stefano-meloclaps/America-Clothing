import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserShield,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const backup = ({ users }) => {
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FontAwesomeIcon icon={faUserShield} />;
      case "client":
        return <FontAwesomeIcon icon={faUser} />;
      case "seller":
        return <FontAwesomeIcon icon={faUserTie} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-info mb-5">Usuarios</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                {getRoleIcon(user.usertype)} {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default backup;
