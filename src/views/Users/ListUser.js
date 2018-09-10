import React, { Component } from "react";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { fetchApi } from "../../middleware/api.js";

function UserRow(props) {
  const user = props.user;
  console.log(props);

  const getBadge = isVoted => {
    return isVoted === true ? "success" : "warning";
  };

  return (
    <tr key={user.id.toString()}>
      <th scope="row">{props.index + 1}</th>
      <td>{user.name}</td>
      {<td>{user.provinceId.province}</td>}
      {<td>{user.role === 0 ? "Admin" : "User"}</td>}
      {
        <td>
          <Badge color={getBadge(user.isVoted)}>
            {user.isVoted === true ? "Sudah Vote" : "Belum Vote"}
          </Badge>
        </td>
      }
    </tr>
  );
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: []
    };
  }

  async componentDidMount() {
    const userData = await fetchApi("/get-all-users");
    console.log(userData);
    // res.json(userData);
    this.setState({ dataUser: userData.data });
  }

  render() {
    // const userList = this.state.dataUser.filter((user) => user.id < 10)
    console.log(this.state.dataUser);

    if (this.state.dataUser < 1) {
      return "Loading";
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> List User
              </CardHeader>
              <CardBody>
                <Table striped>
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Provinsi</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dataUser.map((user, index) => {
                      {
                        console.log(index);
                      }
                      return <UserRow key={index} index={index} user={user} />;
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
