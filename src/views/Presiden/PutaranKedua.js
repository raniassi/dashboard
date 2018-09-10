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
import { Redirect } from "react-router-dom";

class Example extends Component {
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
      return <Redirect to="/presiden/newput" />;
    }
  };
  render() {
    return (
      <div>
        <Row>
          <Col>
            {this.renderRedirect()}
            <Button
              style={{ marginBottom: "20px" }}
              color="primary"
              onClick={this.setRedirect}
            >
              Tambah List Baru
            </Button>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Data Putaran Kedua
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Provinsi</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Example;
