import React, { Component } from "react";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { fetchApi } from "../../middleware/api.js";

function UserRow(props) {
  const user = props.user;
  console.log(props);

  return (
    <tr>
      {<td>{user.no_urut}</td>}
      {
        <td>
          {user.nama_presiden} - {user.nama_wakil}
        </td>
      }
      {<td>{user.vote}</td>}
    </tr>
  );
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPresiden: []
    };
  }

  async componentDidMount() {
    const userData = await fetchApi("/get-all-presiden");
    //console.log(userData);
    // res.json(userData);
    this.setState({ dataPresiden: userData.data });
  }

  render() {
    // const userList = this.state.dataUser.filter((user) => user.id < 10)
    console.log(this.state.dataPresiden);

    if (this.state.dataPresiden < 1) {
      return "Loading";
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" md={{ size: 8 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Data Hasil Perolehan Suara
              </CardHeader>
              <CardBody>
                <Table striped>
                  <thead>
                    <tr>
                      <th scope="col">No. Urut</th>
                      <th scope="col">Pasangan Calon</th>
                      <th scope="col">Jumlah Suara</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dataPresiden.map((user, index) => {
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
