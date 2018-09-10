import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { tokenAuth } from "../../../middleware/cookies-manager";
import { postApi } from "../../../middleware/api.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      statusLogin: ""
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmitLogin = this.onHandleSubmitLogin.bind(this);
  }

  onHandleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state.username);
  }

  async onHandleSubmitLogin() {
    const { username, password } = this.state;
    const res = await postApi("/login-admin", this.state);
    console.log(res);
    if (res.status === 200) {
      tokenAuth.setCookies(res.data.data.token, res.data.data.admin);
      return this.props.history.push("/dashboard");
    }

    this.setState({ statusLogin: "Data yang Anda masukkan salah!" });
  }

  render() {
    const { username, password } = this.state;
    const isEnabled = username.length > 0 && password.length > 0;
    console.log(isEnabled);
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <div
                      className="text-center"
                      style={{ color: "red", paddingBottom: "10px" }}
                    >
                      {this.state.statusLogin}
                    </div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onChange={e => this.onHandleChange(e)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        onChange={e => this.onHandleChange(e)}
                        name="password"
                        id="password"
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4"
                          disabled={!isEnabled}
                          color="primary"
                          onClick={this.onHandleSubmitLogin}
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + "%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Selamat Datang di Laman Admin!</h2>
                      <img
                        className="img-fluid"
                        src="KPU.png"
                        alt=""
                        style={{ width: "200px", paddingTop: "20px" }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
