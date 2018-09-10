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

class NewPres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      no_urut: "",
      nama_presiden: "",
      nama_wakil: "",
      id_parpol: "",
      img: "",
      statusPost: "",
      dataParpol: [],
      visible: false
    };
    this.onHandleChangePost = this.onHandleChangePost.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  onHandleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state.no_urut);
  }

  async handleUpload(event) {
    const formData = new FormData();
    console.log(event.target.files[0]);
    const filePhoto = event.target.files[0];
    if (filePhoto) {
      this.setState({img:filePhoto.name});
      // this.setState({ isUploading: true });
      console.log(filePhoto);
      formData.append("photos", filePhoto);
      // const result = await axios.post(`${API_ROOT}/upload-photo`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      const result = await postApi("/upload-photo", formData, {
        "Content-Type": "multipart/form-data"
     
      });
      

      console.log(result);

      // /**
      //  * Get Fullsize photo
      //  */
      // const splitExtension = result.data.split('.');
      // const getFullSizePhoto = `${splitExtension[0]}-full.${splitExtension[1]}`;
      // this.setState({ photo: getFullSizePhoto });
    }
  }

  onHandleChangePost(e) {
    //console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
    //console.log(this.state.nama_presiden);
  }

  async componentDidMount() {
    const userData = await fetchApi("/get-all-parpol");
    //console.log(userData);
    // res.json(userData);
    this.setState({ dataParpol: userData.data });
  }

  async onHandleSubmit() {
    const { no_urut, nama_presiden, nama_wakil, id_parpol, img } = this.state;
    //console.log(id_parpol);
    
    try {
      var { status } = await postApi("/add-presiden", this.state);
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

  //Halaman List Presiden
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
      return <Redirect to="/presiden/list-presiden" />;
    }
  };

  render() {
    const { photos } = this.state;
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
                name="no_urut"
                id="no_urut"
                onChange={e => this.onHandleChangePost(e)}
                placeholder="Masukkan Nomor Urut dari Pasangan Calon"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="nama_presiden" sm={2}>
              Nama Calon Presiden
            </Label>
            <Col sm={10}>
              <Input
                name="nama_presiden"
                id="nama_presiden"
                onChange={e => this.onHandleChangePost(e)}
                placeholder="Masukkan Nama Calon Presiden"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="nama_wakil" sm={2}>
              Nama Calon Wakil Presiden
            </Label>
            <Col sm={10}>
              <Input
                name="nama_wakil"
                id="nama_wakil"
                onChange={e => this.onHandleChangePost(e)}
                placeholder="Masukkan Nama Calon Wakil Presiden"
              />
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
            <Label for="exampleFile" sm={2}>
              Gambar
            </Label>
            <Col sm={10}>
              <input
                accept="image/*"
                id="raised-button-file"
                type="file"
                name="photos"
                onChange={this.handleUpload}
              />

              <FormText color="muted">
                Pilih gambar profil dari pasangan calon.
              </FormText>
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

export default NewPres;
