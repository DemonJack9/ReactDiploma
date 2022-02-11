import React from "react";

const days = {
  "0": "Monday",
  "1": "Tuesday",
  "2": "Wednesday",
  "3": "Thursday",
  "4": "Friday",
  "5": "Saturday",
};

const studentGroups = {
  "0": "TAW-1",
  "1": "TAW-2",
  "2": "TI-11",
  "3": "TI-21",
  "4": "TI-31",
  "5": "TI-41",
};

class DisplayTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      faculties: [],
      groups: [],
      selectedDay: "Monday",
      selectedGroup: "TAW-1",
      selectedFaculty: "Information Technology",
    };

    this.callAPI = this.callAPI.bind(this);
    this.changeFaculty = this.changeFaculty.bind(this);
    this.callAPI();
  }

  componentDidMount() {
    this.setState({
      faculties: [
        {
          name: "Information Technology",
          groups: ["TAW-1", "TAW-2", "TI-11", "TI-21", "TI-31", "TI-41"],
        },
        {
          name: "Economics",
          groups: ["EC1", "EC2", "EC3"],
        },
        {
          name: "Medicine",
          groups: ["MED-1", "MED-2", "MED-3"],
        },
      ],
      groups: ["TAW-1", "TAW-2", "TI-11", "TI-21", "TI-31", "TI-41"],
    });
  }

  handleChangeOnDay = (e) => {
    const dayId = e.target.value;
    const dayText = days[dayId];
    this.setState({ selectedDay: dayText });
  };

  changeFaculty(event) {
    this.setState({ selectedFaculty: event.target.value });

    this.setState({
      groups: this.state.faculties.find(
        (cntry) => cntry.name === event.target.value
      ).groups,
    });

    const stats = this.state.faculties.find(
      (cntry) => cntry.name === this.state.selectedFaculty
    ).groups;
    this.setState({
      groups: stats.find((stat) => stat.name === event.target.value).groups,
    });
  }

  changeGroup = (e) => {
    this.setState({ selectedGroup: e.target.value });
  };

  writeRequest() {
    console.log(this.state.selectedDay);
    console.log(this.state.selectedGroup);
    console.log(this.state.selectedFaculty);
  }

  callAPI() {
    //fetch data from API
    fetch(
      "https://cors-anywhere.herokuapp.com/http://dummy.restapiexample.com/api/v1/employees",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          list: data.data,
        });
      });
  }

  render() {
    let tb_data = this.state.list.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.employee_name}</td>
          <td>{item.emplotee_salary}</td>
          <td>{item.employee_age}</td>
        </tr>
      );
    });
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>{tb_data}</tbody>
        </table>
        <div className="outer">
          <select
            value={this.selectedDay}
            onChange={this.handleChangeOnDay}
            style={{ width: "20%" }}
          >
            <option value="0">Monday</option>
            <option value="1">Tuesday</option>
            <option value="2">Wednesday</option>
            <option value="3">Thursday</option>
            <option value="4">Friday</option>
            <option value="5">Saturday</option>
          </select>
          <select
            value={this.state.selectedFaculty}
            onChange={this.changeFaculty}
            style={{ width: "20%" }}
          >
            {this.state.faculties.map((e, key) => {
              return <option key={key}>{e.name}</option>;
            })}
          </select>
          <select style={{ width: "20%" }} onChange={this.changeGroup}>
            {this.state.groups.map((e, key) => {
              return <option key={key}>{e}</option>;
            })}
          </select>
          <button
            style={{ width: "15%" }}
            className="dbtn"
            onClick={() => this.writeRequest()}
          >
            SEND
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayTable;
