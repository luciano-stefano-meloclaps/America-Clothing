import React from "react";
import { Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faUserTie, faUser, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * UserListView - Displays a read-only table of all users
 * @param {Array} users - Array of user objects from the API context
 */
const UserListView = ({ users = [] }) => {

  const getUserTypeInfo = (usertype) => {
    switch (usertype) {
      case "admin":
        return { icon: faUserShield, label: "Administrador", variant: "warning" };
      case "employee":
        return { icon: faUserTie, label: "Empleado", variant: "info" };
      case "client":
        return { icon: faUser, label: "Cliente", variant: "secondary" };
      default:
        return { icon: faUser, label: "Usuario", variant: "secondary" };
    }
  };

  return (
    <div className="table-responsive p-3">
      <Table striped bordered hover variant="dark" className="align-middle text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Tipo de Usuario</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const typeInfo = getUserTypeInfo(user.usertype);
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td className="text-start">{user.name} {user.lastName}</td>
                <td>{user.phoneNumber || "-"}</td>
                <td>
                  <Badge bg={user.state ? "success" : "danger"}>
                    <FontAwesomeIcon icon={user.state ? faCheckCircle : faTimesCircle} className="me-1" />
                    {user.state ? "Habilitado" : "Deshabilitado"}
                  </Badge>
                </td>
                <td style={{ width: "200px" }}>
                  <Badge bg={typeInfo.variant} className="p-2 w-100">
                    <FontAwesomeIcon icon={typeInfo.icon} className="me-2" />
                    {typeInfo.label}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

UserListView.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      lastName: PropTypes.string,
      phoneNumber: PropTypes.string,
      state: PropTypes.bool.isRequired,
      usertype: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserListView;
