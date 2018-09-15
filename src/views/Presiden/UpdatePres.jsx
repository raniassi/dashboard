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
import * as qs from 'query-string';
const axios = require("axios");
const API_ROOT = "http://127.0.0.1:3001/api";

function UserRow(props) {
  const user = props.user;
  //console.log(props);
  return <option value={user._id}>{user.nama_parpol}</option>;
}

class UpdatePres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id_presiden:'',
      no_urut: "",
      nama_presiden: "",
      nama_wakil: "",
      id_parpol: "",
      img: "",
      statusPost: "",
      userData: [],
      dataParpol: [],
      visible: false
    };
    this.onHandleChangePost = this.onHandleChangePost.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  async handlFetch() {
    console.log(this.props)
    const {idpres} = qs.parse(this.props.location.search);
    console.log(idpres)
    if (idpres) {
      this.setState({id_presiden:  idpres})
      const userData = await fetchApi(
        "/get-presiden",
        idpres
      );

      

      console.log(userData.data.img)

      /**
       * TODO
       * userData lau set ke state di line 33
       * lau pecah ke masing2 misal userData.nama_wakil see dibawah ini,, lanjutin
       * and lau tempel di input2
       * see line 226
       */
      this.setState({
        no_urut: userData.data.no_urut,
        nama_presiden: userData.data.nama_presiden,
        nama_wakil: userData.data.nama_wakil,
        final: userData.data.final,
        id_parpol: userData.data.id_parpol,
        img: userData.data.img
      });
      
    }
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
      console.log(result);
      if (result.status === 200){
        setTimeout(() => {
          this.setState({ img: filePhoto.name });
        }, 500)
        

      }
      

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
    this.handlFetch();
    //console.log(userData);
    // res.json(userData);
    this.setState({ dataParpol: userData.data });
  }

  async onHandleSubmit() {
    const { no_urut, nama_presiden, nama_wakil, id_parpol, img } = this.state;
    console.log(this.state);

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

  componentWillReceiveProps(nextProps) {}

  render() {
    const { photos } = this.state;
    console.log(this.props);
    return (
      <div>
        <Alert
          color="primary"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          fade={false}
        >
          List Parpol baru telah berhasil diupdate.
        </Alert>
        <h3
          style={{
            borderBottom: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: "#808080",
            color: "#404040"
          }}
        >
          Update Pasangan Calon
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
                value={this.state.no_urut}
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
                value={this.state.nama_presiden}
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
                value={this.state.nama_wakil}
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
                value={this.state.id_parpol}
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
            {/* <p>{this.state.img}</p> */}
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

              <img src={this.state.img.includes('assets-img') ? `http://localhost:3001/${this.state.img}` : `http://localhost:3001/assets-img/${this.state.img}`}  height={200} width={300} />
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

export default UpdatePres;
