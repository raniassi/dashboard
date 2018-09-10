import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  CardGroup,
  FormGroup,
  Label
} from "reactstrap";
import Widget04 from "../../views/Widgets/Widget04";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { fetchApi } from "../../middleware/api";
import { postApi } from "../../middleware/api";
import { tokenAuth } from "../../middleware/cookies-manager";
import DateTimePicker from "react-datetime-picker";
import { AppSwitch } from "@coreui/react";
import swal from "sweetalert";

var moment = require("moment");
var dateNow = moment();
const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

const header = [
  { title: "Username", prop: "username", sortable: true, filterable: true },
  { title: "Name", prop: "realname", sortable: true },
  {
    title: "Name Uppercased",
    prop: "realnameuppercase",
    cell: row => row.realname.toUpperCase()
  },
  { title: "Location", prop: "location" },
  { title: "Last Updated", prop: "date", sortable: true }
];

const body = [
  {
    username: "i-am-billy",
    realname: "Billy",
    location: "Mars",
    date: moment()
      .subtract(1, "days")
      .format("Do MMMM YYYY")
  }
];

const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return moment(columnValue, "Do MMMM YYYY").valueOf();
  }
};

const customLabels = {
  first: "<<",
  last: ">>",
  prev: "<",
  next: ">",
  show: "Display",
  entries: "rows",
  noResults: "There is no data to be displayed"
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      SumOfVoters: 0,
      votingStatus: false,
      votingStatusid: "",
      sengketaStatus: false,
      sengketaStatusid: "",
      startDateTimeVote: "",
      endDateTimeVote: ""
    };
    this.updateTimeStatus = this.updateTimeStatus.bind(this);
    this.onStatusVoteChange = this.onStatusVoteChange.bind(this);
    this.onStatusVoteChangeButton = this.onStatusVoteChangeButton.bind(this);
    this.onStatusSengketaChange = this.onStatusSengketaChange.bind(this);
    this.onStatusSengketaChangeButton = this.onStatusSengketaChangeButton.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  async componentWillMount() {
    var banyakPemilih = 0;
    var User = {};
    try {
      var a = 0;
      User = await fetchApi("/get-all-users");
      console.log("users1 ", User);
      if (User.status === 500) {
        User = await fetchApi("/get-all-users");
        console.log("users2 ", User);
      }
      if (User.status === 200) {
        for (let index = 0; index < User.data.length; index++) {
          if (User.data[index].isVoted !== false) {
            a = a + 1;
          }
        }
      }
      this.setState({
        SumOfVotersChoose: a
      });
    } catch (err) {
      console.log(a);
    }
    try {
      const Pemilih = await fetchApi("/get-all-ktp");
      banyakPemilih = Pemilih.data.length;
      this.setState({
        SumOfVoters: banyakPemilih
      });
    } catch (err) {
      console.log(err);
      console.log(banyakPemilih);
    }
    try {
      const statusResult = await fetchApi("/get-status-vote");
      const data = statusResult.data;
      console.log(data[0].timeStart);
      if (data.length !== 0) {
        this.setState({
          votingStatusid: data[0]._id,
          votingStatus: data[0].status,
          votingStatusButton: data[1].status,
          votingStatusidButton: data[1]._id,
          sengketaStatusid: data[3]._id,
          sengketaStatus: data[3].status,
          sengketaStatusButton: data[2].status,
          sengketaStatusidButton: data[2]._id,
          startDateTimeVote: new Date(data[0].timeStart),
          endDateTimeVote: new Date(data[0].timeEnd)
        });
      } else {
        console.log("tidak ada data");
      }
    } catch (err) {
      console.log(err);
    }
  }
  //ubah status votingnya
  async onStatusVoteChange(id) {
    var id = id;
    var status = "";
    if (this.state.votingStatus === true) {
      var status = false;
    } else {
      var status = true;
    }
    if (this.state.votingStatusButton === true) {
      const result = await postApi("/update-status", { id, status });
      if (result.status === 200) {
        await swal({
          title: "Yeay, Berhasil!",
          text: "Status berhasil Diubah!",
          icon: "success"
        });
        this.setState({
          votingStatus: !this.state.votingStatus
        });
      } else {
        await swal({
          title: "Oops, Kesalahan!",
          text:
            "Masih ada waktu yang belum diatur, jangan biarkan waktu kosong!",
          icon: "warning"
        });
      }
    }
  }

  // ubah tombol paniknya
  async onStatusVoteChangeButton(id) {
    var id = id;
    var status = "";
    if (this.state.votingStatusButton === true) {
      var status = false;
    } else {
      var status = true;
    }

    const result = await postApi("/update-status", { id, status });
    if (result.status === 200) {
      this.setState({
        votingStatusButton: !this.state.votingStatusButton
      });
      console.log("berhasil");
    } else {
      console.log("tidak berhasil");
    }
  }

  //ubah status sengketanya
  async onStatusSengketaChange(id) {
    var id = id;
    var status = "";
    if (this.state.sengketaStatus === true) {
      var status = false;
    } else {
      var status = true;
    }
    if (this.state.sengketaStatusButton === true) {
      const result = await postApi("/update-status", { id, status });
      if (result.status === 200) {
        await swal({
          title: "Yeay, Berhasil!",
          text: "Status berhasil Diubah!",
          icon: "success"
        });
        this.setState({
          sengketaStatus: !this.state.sengketaStatus
        });
      } else {
        await swal({
          title: "Oops, Kesalahan!",
          text:
            "Masih ada waktu yang belum diatur, jangan biarkan waktu kosong!",
          icon: "warning"
        });
      }
    }
  }

  // ubah tombol panik sengketanya
  async onStatusSengketaChangeButton(id) {
    var id = id;
    var status = "";
    if (this.state.sengketaStatusButton === true) {
      var status = false;
    } else {
      var status = true;
    }

    const result = await postApi("/update-status", { id, status });
    if (result.status === 200) {
      this.setState({
        sengketaStatusButton: !this.state.sengketaStatusButton
      });
      console.log("berhasil");
    } else {
      console.log("tidak berhasil");
    }
  }

  onChangeVoteStatusStart = startDateTimeVote =>
    this.setState({ startDateTimeVote });
  onChangeVoteStatusEnd = endDateTimeVote => this.setState({ endDateTimeVote });

  async updateTimeStatus(id, start, end, keterangan) {
    if (start !== "" && end !== "") {
      if (
        moment(end).isAfter(start) === true &&
        moment(dateNow).isAfter(start) === false
      ) {
        console.log("id vote ", id);

        const result = await postApi("/update-time-status", { id, start, end });
        console.log(result);

        if (result.status === 200) {
          await swal({
            title: "Yeay, Berhasil",
            text: "Waktu berhasil diatur",
            icon: "success"
          });
        } else {
          console.log("gagal");
        }
      } else {
        await swal({
          title: "Oops, Kesalahan",
          text: "Waktu mulai harus kecil sebelum tanggal berakhir ",
          icon: "warning"
        });
      }
    } else {
      await swal({
        title: "Oops, Kesalahan!",
        text: "Masih ada waktu yang belum diatur, jangan biarkan waktu kosong!",
        icon: "warning"
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <CardGroup className="mb-3">
          <Widget04
            icon="icon-people"
            color="info"
            header={String(this.state.SumOfVoters)}
            value="100"
          >
            Total Pemilih
          </Widget04>
          <Widget04
            icon="icon-user-follow"
            color="success"
            header={
              String(
                Math.round(
                  (this.state.SumOfVotersChoose / this.state.SumOfVoters) * 100
                )
              ) + "%"
            }
            value={String(
              Math.round(
                (this.state.SumOfVotersChoose / this.state.SumOfVoters) * 100
              )
            )}
          >
            Pemilih Menggunakan Hak Pilih
          </Widget04>
          {this.state.votingStatus === true ? (
            <Widget04
              icon="fa fa-pencil-square-o"
              color="success"
              header="Aktif"
              value="100"
            >
              Status Voting
            </Widget04>
          ) : (
            <Widget04
              icon="fa fa-pencil-square-o"
              color="danger"
              header="Tidak aktif"
              value="100"
            >
              Status Voting
            </Widget04>
          )}
          {this.state.sengketaStatus === true ? (
            <Widget04
              icon="fa fa-pencil-square-o"
              color="success"
              header="Aktif"
              value="100"
            >
              Status Hasil Sengketa
            </Widget04>
          ) : (
            <Widget04
              icon="fa fa-pencil-square-o"
              color="danger"
              header="Tidak aktif"
              value="100"
            >
              Status Hasil Sengketa
            </Widget04>
          )}
        </CardGroup>
        <Row>
          <Col>
            <Card>
              <CardHeader className="bg-primary">
                <h4>Pengaturan Mulai dan Berhenti Voting</h4>
                <p> Voting status</p>
              </CardHeader>
              <CardBody className="text-center ">
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="ccnumber">
                        Masukan Waktu Mulai dan berhenti:
                      </Label>
                      <br />
                      <DateTimePicker
                        name="StartVote"
                        onChange={this.onChangeVoteStatusStart}
                        value={this.state.startDateTimeVote}
                        required={true}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <strong>Hingga</strong>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <DateTimePicker
                        name="EndVote"
                        onChange={this.onChangeVoteStatusEnd}
                        value={this.state.endDateTimeVote}
                        required={true}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {console.log(this.state.startDateTimeVote)}
                    {console.log(this.state.endDateTimeVote)}
                    <FormGroup>
                      <Button
                        className="btn-pill btn btn-primary btn-block"
                        onClick={() =>
                          this.updateTimeStatus(
                            this.state.votingStatusid,
                            this.state.startDateTimeVote,
                            this.state.endDateTimeVote,
                            "voting"
                          )
                        }
                      >
                        Masukan
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                      <i className="fa fa-warning" /> Tombol aktifkan & non
                      aktifkan secara langsung{" "}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs="2" sm="2">
                    <AppSwitch
                      className={"mx-1"}
                      checked={this.state.votingStatusButton}
                      variant={"3d"}
                      outline={"alt"}
                      color={"success"}
                      label
                      onClick={() =>
                        this.onStatusVoteChangeButton(
                          this.state.votingStatusidButton
                        )
                      }
                      dataOn={"\u2713"}
                      dataOff={"\u2715"}
                    />
                  </Col>
                  <Col xs="8" sm="8" style={{ marginRight: "-2.5em" }}>
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                      <i className="fa fa-hand-o-left" /> On/Off Switch Status
                      <br /> On/Off Status <i className="fa fa-hand-o-right" />
                    </span>
                  </Col>
                  <Col xs="1" sm="1">
                    {this.state.votingStatusButton === true ? (
                      <AppSwitch
                        className={"mx-1"}
                        checked={this.state.votingStatus}
                        variant={"3d"}
                        outline={"alt"}
                        color={"success"}
                        label
                        onClick={() =>
                          this.onStatusVoteChange(this.state.votingStatusid)
                        }
                      />
                    ) : (
                      <AppSwitch
                        className={"mx-1"}
                        checked={this.state.votingStatus}
                        variant={"3d"}
                        outline={"alt"}
                        color={"success"}
                        label
                        onClick={() =>
                          this.onStatusVoteChange(this.state.votingStatusid)
                        }
                        disabled
                      />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader className="bg-warning">
                <h4>Pengaturan Hasil Sengketa</h4>
                <p> Status Hasil Sengketa</p>
              </CardHeader>
              <CardBody className="text-center ">
                <Row>
                  <Col>
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                      <i className="fa fa-warning" /> Tombol aktifkan & non
                      aktifkan secara langsung{" "}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs="2" sm="2">
                    <AppSwitch
                      className={"mx-1"}
                      checked={this.state.sengketaStatusButton}
                      variant={"3d"}
                      outline={"alt"}
                      color={"success"}
                      label
                      onClick={() =>
                        this.onStatusSengketaChangeButton(
                          this.state.sengketaStatusidButton
                        )
                      }
                      dataOn={"\u2713"}
                      dataOff={"\u2715"}
                    />
                  </Col>
                  <Col xs="8" sm="8" style={{ marginRight: "-2.5em" }}>
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                      <i className="fa fa-hand-o-left" /> On/Off Switch Status
                      <br /> On/Off Status <i className="fa fa-hand-o-right" />
                    </span>
                  </Col>
                  <Col xs="1" sm="1">
                    {this.state.sengketaStatusButton === true ? (
                      <AppSwitch
                        className={"mx-1"}
                        checked={this.state.sengketaStatus}
                        variant={"3d"}
                        outline={"alt"}
                        color={"success"}
                        label
                        onClick={() =>
                          this.onStatusSengketaChange(this.state.sengketaStatusid)
                        }
                      />
                    ) : (
                      <AppSwitch
                        className={"mx-1"}
                        checked={this.state.sengketaStatus}
                        variant={"3d"}
                        outline={"alt"}
                        color={"success"}
                        label
                        onClick={() =>
                          this.onStatusSengketaChange(this.state.sengketaStatusid)
                        }
                        disabled
                      />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
