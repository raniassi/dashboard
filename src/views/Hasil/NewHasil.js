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
  CardBody,
  Alert
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { postApi } from "../../middleware/api";
import { fetchApi } from "../../middleware/api.js";

const axios = require("axios");
const API_ROOT = "http://127.0.0.1:3001/api";

function UserRow(props) {
  const user = props.user;
  //console.log(props);
  return <option value={user._id}>{user.nama_parpol}</option>;
}

function UrutRow(props) {
  const user = props.user;
  //console.log(props);
  return <option value={user._id}>{user.no_urut}</option>;
  return <option value={user._id}>{user.nama_presiden}</option>;
}

function PresRow(props) {
  const user = props.user;
  //console.log(props);
  return <option value={user._id}>{user.nama_presiden}</option>;
}

function WakRow(props) {
  const user = props.user;
  //console.log(props);
  return <option value={user._id}>{user.nama_wakil}</option>;
}

class NewHasil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      no_urut: "",
      nama_presiden: "",
      nama_wakil: "",
      id_parpol: "",
      final: "",
      statusPost: "",
      dataParpol: [],
      dataPresiden: [],
      visible: false
    };
    this.onHandleChangePost = this.onHandleChangePost.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleChangePost(e) {
    //console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
    //console.log(this.state.nama_presiden);
  }

  async componentDidMount() {
    const status = await fetchApi("/get-all-parpol");
    if (status) {
      this.setState({ dataParpol: status.data });
    }
    console.log(status);
    const result = await fetchApi("/get-all-presiden");
    if (result) {
      this.setState({ dataPresiden: result.data });
    }
    console.log(result);
  }

  async onHandleSubmit() {
    const { no_urut, nama_presiden, nama_wakil, id_parpol, final } = this.state;
    //console.log(id_parpol);

    try {
      var { status } = await postApi("/update-presiden", this.state);
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
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  //Halaman Hasil Sengketa
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
      return <Redirect to="/hasil/sengketa" />;
    }
  };

  render() {
    return (
      <div>
        <Alert
          color="primary"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          fade={false}
        >
          List Parpol baru telah berhasil ditambahkan.
        </Alert>
        <h3
          style={{
            borderBottom: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: "#808080",
            color: "#404040"
          }}
        >
          Tambah Pasangan Calon
        </h3>
        <Form>
          <FormGroup style={{ paddingTop: "30px" }} row>
            <Label for="no_urut" sm={2}>
              Nomor Urut
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="no_urut"
                onChange={e => this.onHandleChangePost(e)}
                id="no_urut"
              >
                {this.state.dataPresiden.map((user, index) => {
                  {
                    //console.log(index);
                  }
                  return <UrutRow key={index} index={index} user={user} />;
                  <option />;
                })}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="nama_presiden" sm={2}>
              Nama Calon Presiden
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="nama_presiden"
                onChange={e => this.onHandleChangePost(e)}
                id="nama_presiden"
              >
                {this.state.dataPresiden.map((user, index) => {
                  {
                    //console.log(index);
                  }
                  return <PresRow key={index} index={index} user={user} />;
                  <option />;
                })}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="nama_wakil" sm={2}>
              Nama Calon Wakil Presiden
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="nama_wakil"
                onChange={e => this.onHandleChangePost(e)}
                id="nama_wakil"
              >
                {this.state.dataPresiden.map((user, index) => {
                  {
                    //console.log(index);
                  }
                  return <WakRow key={index} index={index} user={user} />;
                  <option />;
                })}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} for="exampleSelect">
              Nama Partai Politik
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="id_parpol"
                onChange={e => this.onHandleChangePost(e)}
                id="id_parpol"
              >
                {this.state.dataParpol.map((user, index) => {
                  {
                    //console.log(index);
                  }
                  return <UserRow key={index} index={index} user={user} />;
                  <option />;
                })}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} for="exampleSelect">
              Final
            </Label>
            <Col sm={10}>
              <Input
                name="final"
                id="final"
                onChange={e => this.onHandleChangePost(e)}
                placeholder="Masukkan Jumlah Hasil Sengketa"
              />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button
                style={{ marginBottom: "20px" }}
                color="primary"
                onClick={this.onHandleSubmit}
              >
                Submit
              </Button>
              {this.renderRedirect()}
              <Button
                style={{ marginBottom: "20px", marginLeft: "10px" }}
                color="danger"
                onClick={this.setRedirect}
              >
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default NewHasil;
