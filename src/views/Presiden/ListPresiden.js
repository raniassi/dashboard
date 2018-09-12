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
import { postApi, fetchApi } from "../../middleware/api.js";
import { Redirect } from "react-router-dom";
// import { Alerts, Badges, Modals } from './Notifications';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no_urut: "",
      nama_presiden: "",
      nama_wakil: "",
      id_parpol: "",
      img: "",
      final: "",
      vote: "",
      dataPresiden: [],
      alertVisible: false
    };
    this.onHandleDelete = this.onHandleDelete.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.handlFetch = this.handlFetch.bind(this);
    this.onHanldeUpdate = this.onHanldeUpdate.bind(this);
  }

  async handlFetch() {
    const userData = await fetchApi("/get-all-presiden");
    //console.log(userData);
    // res.json(userData);
    this.setState({ dataPresiden: userData.data });
  }

  async componentDidMount() {
    this.handlFetch();
  }

  //Halaman Tambah List Pasangan Calon
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
      return <Redirect to="/presiden/newpres" />;
    }
  };

  async onHandleDelete(idPresiden) {
    this.toggleAlert();
    console.log(idPresiden);

    var { status } = await postApi("/delete-presiden", { id: idPresiden });

    console.log(status);

    if (status === 200) {
      this.handlFetch();
    } else {
      console.error("status", status);
    }
  }

  async onHanldeUpdate(idPresiden) {
    this.props.history.push({
      pathname: "/presiden/updatepres",
      state: { idPresiden }
    });
  }

  toggleAlert() {
    this.setState({
      alertVisible: !this.state.alertVisible
    });
  }

  render() {
    // const userList = this.state.dataUser.filter((user) => user.id < 10)
    //console.log(this.state.dataPresiden);
    if (this.state.dataPresiden && this.state.dataPresiden < 1) {
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
              <Col sm={{ size: 10, order: 2 }}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify" /> List Pasangan Calon
                  </CardHeader>
                  <CardBody>
                    <Table striped>
                      <thead>
                        <tr>
                          <th scope="col">No. Urut</th>
                          <th scope="col">Nama Calon Presiden</th>
                          <th scope="col">Nama Calon Wakil Presiden</th>
                          <th scope="col">Gambar</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataPresiden.map((item, i) => (
                          <tr>
                            {<td>{item.no_urut}</td>}
                            {<td>{item.nama_presiden}</td>}
                            {<td>{item.nama_wakil}</td>}
                            {<td>{item.img}</td>}
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
