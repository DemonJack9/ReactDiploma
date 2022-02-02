import React from "react";

const days = {
  "0": "Monday",
  "1": "Tuesday",
  "2": "Wensday",
  "3": "Thurstday",
  "4": "Friday",
  "5": "Saturday",
};

const studentGroups = {
  "0": "Masterat-1",
  "1": "Masterat-2",
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
      selectedDay: "",
      selectedGroup: "",
    };

    this.callAPI = this.callAPI.bind(this);
    this.callAPI();
  }

  handleChangeOnDay = (e) => {
    const dayId = e.target.value;
    const dayText = days[dayId];
    console.log(dayText); // Do what you need to with the value here
    this.setState({ selectedDay: dayText });
  };

  handleChangeOnGroup = (e) => {
    const groupId = e.target.value;
    const groupText = studentGroups[groupId];
    console.log(groupText); // Do what you need to with the value here
    this.setState({ selectedGroup: groupText });
  };

  writeRequest() {
    console.log(this.state.selectedDay);
    console.log(this.state.selectedGroup);
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
            value={this.state.selectedDay}
            onChange={this.handleChangeOnDay}
            style={{ width: "25%" }}
          >
            <option value="0">Monday</option>
            <option value="1">Tuesday</option>
            <option value="2">Wensday</option>
            <option value="3">Thurstday</option>
            <option value="4">Friday</option>
            <option value="5">Saturday</option>
          </select>
          <select
            value={this.state.selectedGroup}
            onChange={this.handleChangeOnGroup}
            style={{ width: "25%" }}
          >
            <option value="0">Masterat-1</option>
            <option value="1">Masterat-2</option>
            <option value="2">TI-11</option>
            <option value="3">TI-21</option>
            <option value="4">TI-31</option>
            <option value="5">TI-41</option>
          </select>
          <button className="dbtn" onClick={() => this.writeRequest()}>
            SEND
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayTable;
