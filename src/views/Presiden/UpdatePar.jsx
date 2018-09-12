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
  UncontrolledAlert,
  Alert
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { postApi } from "../../middleware/api";

class UpdatePar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nama_parpol: "",
      visible: false
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state.nama_parpol);
  }

  onHandleChangePost(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state.nama_parpol);
  }

  async onHandleSubmit() {
    const { nama_parpol } = this.state;
    try {
      var { status } = await postApi("/add-parpol", this.state);
      this.setState({ showAlert: false });
      console.log(status);
    } catch (e) {
      this.setState({ showAlert: true });
      console.log(e);
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
      return <Redirect to="/presiden/list-parpol" />;
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
          Update Partai Politik
        </h3>
        <Form>
          <FormGroup style={{ paddingTop: "30px" }} row>
            <Label for="nama_parpol" sm={2}>
              Nama Parpol
            </Label>
            <Col sm={{ size: 6, order: 2 }}>
              <Input
                name="nama_parpol"
                id="nama_parpol"
                onChange={e => this.onHandleChangePost(e)}
                placeholder="Masukkan Nama Partai Politik"
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

export default UpdatePar;
