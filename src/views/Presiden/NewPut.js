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
import { postApi } from "../../middleware/api";

class NewPut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            no_urut: "",
            nama_presiden: "",
            nama_wakil: "",
            img: "",
            statusPost: ""
          };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    onHandleChange(e) {
        this.setState({
          [e.target.id]: e.target.value
        });
        console.log(this.state.no_urut);
      }

      onHandleChangePost(e) {
        this.setState({
          [e.target.id]: e.target.value
        });
        console.log(this.state.nama_presiden);
      }

    async onHandleSubmit() {
        const { no_urut, nama_presiden, nama_wakil, img } = this.state;
        try {
          var { status } = await postApi("/add-presiden", this.state);
          this.setState({ showAlert: false });
          console.log(status);
        } catch (e) {
          this.setState({ showAlert: true });
          console.log(e);
        }
        if (status === 200) {
          this.setState({statusPost: "Data yang Anda masukkan salah!"
          });
        }
      }

  render() {
    return (
      <div>
        <h3
          style={{
            borderBottom: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: "#808080",
            color: "#404040"
          }}
        >
          Posting Pasangan Calon
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
            <Label for="exampleFile" sm={2}>
              Gambar
            </Label>
            <Col sm={10}>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
                Pilih gambar profil dari pasangan calon.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button style={{ marginBottom: "20px" }} color="primary" onClick={this.onHandleSubmit}>
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default NewPut;
