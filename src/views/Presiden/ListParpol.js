import React, { Component } from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table,
  Row,
  Card,
  CardHeader,
  CardBody 
} from "reactstrap";
import { fetchApi } from "../../middleware/api.js";
import { Redirect } from "react-router-dom";

function UserRow(props) {
  const user = props.user;
  console.log(props);

  return (
    <tr>
      <th scope="row">{props.index + 1}</th>
      {<td>{user.nama_parpol}</td>}
      <th scope="row">
        <Button
          color="primary"
          className="icon-pencil"
          size="sm"
          style={{ marginRight: "10px" }}
        />
        <Button color="danger" className="icon-trash" size="sm" />
      </th>
    </tr>
  );
}

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataParpol: [],
      waiting: false
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.onQuery = this.onQuery.bind(this);
  }

  onConfirm(e) {
    const { onClick } = this.props;
    e.preventDefault();
    this.setState({ waiting: false }, onClick);
  }

  onQuery(e) {
    e.preventDefault();
    this.setState({ waiting: true });

    setTimeout(() => {
      this.setState({ waiting: false });
    }, 1000);
  }

  async componentDidMount() {
    const userData = await fetchApi("/get-all-parpol");
   // console.log(userData);
    // res.json(userData);
    this.setState({ dataParpol: userData.data });
  }

  state = {
    redirect: false
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/presiden/newpar" />;
    }
  };

  render() {
    // const userList = this.state.dataUser.filter((user) => user.id < 10)
    //console.log(this.state.dataParpol);
    if (this.state.dataParpol && this.state.dataParpol < 1) {
      return "Loading";
    }

    return (
      <div>
        <Row>
          <Col>
            {this.renderRedirect()}
            <Button
              style={{ marginBottom: "20px" }}
              color="info"
              onClick={this.setRedirect}
            >
              Tambah List Baru
            </Button>
            <Row>
              <Col sm={{ size: 8, order: 2 }}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify" /> List Partai Politik
                  </CardHeader>
                  <CardBody>
                    <Table striped>
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">Nama Partai Politik</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataParpol.map((user, index) => {
                          {
                            // console.log(index);
                          }
                          return (
                            <UserRow key={index} index={index} user={user} />
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Example;
