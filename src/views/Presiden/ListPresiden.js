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
import { postApi } from "../../middleware/api.js";
import { Redirect } from "react-router-dom";

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
      dataPresiden: []
    };
    this.onHandleDelete = this.onHandleDelete.bind(this);
  }

  async componentDidMount() {
    const userData = await fetchApi("/get-all-presiden");
    //console.log(userData);
    // res.json(userData);
    this.setState({ dataPresiden: userData.data });
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

  async onHandleDelete(itemToBeDeleted) {
    const {
      no_urut,
      vote,
      nama_presiden,
      nama_wakil,
      id_parpol,
      img, 
      final
    } = this.state;
    
      try { 
        var { status } = await postApi("/delete-presiden", this.state);
        this.setState({ showAlert: false });
        //console.log(status);
      } catch (e) {
        this.setState({ showAlert: true });
        //console.log(e);
      }
      if (status === 200) {
        this.setState({
          visible: true
        });
      }
      var newItems = this.state.dataPresiden.filter(item => {
      return item != itemToBeDeleted;
    });
    this.setState({ dataPresiden: newItems });
    // console.log(id_parpol);
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
                    <Table
                      striped
                      onHandleDelete={this.onHandleDelete.bind(this)}
                    >
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
                                  style={{ marginRight: "10px" }}
                                />
                                <Button
                                  onClick={this.onHandleDelete.bind(this)}
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
