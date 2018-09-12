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
import { fetchApi, postApi } from "../../middleware/api.js";
import { Redirect } from "react-router-dom";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

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
      nama_parpol:"",
      waiting: false,
      alertVisible: false
    };
    this.onHandleDelete = this.onHandleDelete.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.handlFetch = this.handlFetch.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onQuery = this.onQuery.bind(this);
    this.onHanldeUpdate = this.onHanldeUpdate.bind(this);
  }

  async onHanldeUpdate(idPresiden) {
    this.props.history.push({
      pathname: "/presiden/updatepar",
      state: { idPresiden }
    });
  }

  async handlFetch() {
    const userData = await fetchApi("/get-all-parpol");
    //console.log(userData);
    // res.json(userData);
    this.setState({ dataParpol: userData.data });
  }

  async componentDidMount() {
    this.handlFetch();
  }

  toggleAlert() {
    this.setState({
      alertVisible: !this.state.alertVisible
    });
  }

  async onHandleDelete(idParpol) {
    this.toggleAlert();
    console.log(idParpol);

    var { status } = await postApi("/delete-parpol", { id: idParpol });

    console.log(status);

    if (status === 200) {
      this.handlFetch();
    } else {
      console.error("status", status);
    }
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

  // async componentDidMount() {
  //   const userData = await fetchApi("/get-all-parpol");
  //   // console.log(userData);
  //   // res.json(userData);
  //   this.setState({ dataParpol: userData.data });
  // }

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
                      {this.state.dataParpol.map((item, i) => (
                          <tr>
                            {<td>{i + 1}</td>}
                            {<td>{item.nama_parpol}</td>}
                            {
                              <td scope="row">
                                <Button
                                  color="primary"
                                  className="icon-pencil"
                                  size="sm"
                                  onClick={() => this.onHanldeUpdate(item._id)}
                                  style={{ marginRight: "10px" }}
                                />
                                <Button
                                  onClick={this.toggleAlert}
                                  color="danger"
                                  className="icon-trash"
                                  size="sm"
                                />
                              </td>
                            }
                            <Modal
                              isOpen={this.state.alertVisible}
                              toggle={this.toggleAlert}
                              className={"modal-sm " + this.props.className}
                            >
                              <ModalHeader toggle={this.toggleSmall}>
                                Peringatan
                              </ModalHeader>
                              <ModalBody>
                                Anda yakin ingin menghapus kandidat tersebut ?
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="primary"
                                  onClick={() => this.onHandleDelete(item._id)}
                                >
                                  Ya
                                </Button>{" "}
                                <Button
                                  color="secondary"
                                  onClick={this.toggleAlert}
                                >
                                  Tidak
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </tr>
                        ))}
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
