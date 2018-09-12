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

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPresiden: [],
      alertVisible: false
    };
    this.onHandleDelete = this.onHandleDelete.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.handlFetch = this.handlFetch.bind(this);
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

  toggleAlert() {
    this.setState({
      alertVisible: !this.state.alertVisible
    });
  }

  // async componentDidMount() {
  //   const userData = await fetchApi("/get-all-presiden");
  //   //console.log(userData);
  //   // res.json(userData);
  //   this.setState({ dataPresiden: userData.data });
  // }

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
      return <Redirect to="/hasil/newhasil" />;
    }
  };

  onHandleDelete(itemToBeDeleted) {
    var newItems = this.state.dataPresiden.filter(item => {
      return item != itemToBeDeleted;
    });
    this.setState({ dataPresiden: newItems });
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
            <Row>
              <Col sm={{ size: 10, order: 2 }}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify" /> List Hasil Sengketa
                  </CardHeader>
                  <CardBody>
                    <Table
                      striped
                      onHandleDelete={this.onHandleDelete.bind(this)}
                    >
                      {this.renderRedirect()}
                      <thead>
                        <tr>
                          <th scope="col">No. Urut</th>
                          <th scope="col">Nama Pasangan Calon</th>
                          <th scope="col">Hasil Akhir</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataPresiden.map((item, i) => (
                          <tr>
                            {<td>{item.no_urut}</td>}
                            {
                              <td>
                                {item.nama_presiden}-{item.nama_wakil}
                              </td>
                            }
                            {<td>{item.final}</td>}
                            {
                              <td scope="row">
                                <Button
                                  color="primary"
                                  className="icon-pencil"
                                  size="sm"
                                  style={{ marginRight: "10px" }}
                                  onClick={this.setRedirect}
                                />
                                <Button
                                  onClick={this.onHandleDelete.bind(this, item)}
                                  color="danger"
                                  className="icon-trash"
                                  size="sm"
                                />
                              </td>
                            }
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
