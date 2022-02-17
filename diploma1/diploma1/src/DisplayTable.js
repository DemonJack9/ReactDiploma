import React from "react";

const days = {
  "0": "Monday",
  "1": "Tuesday",
  "2": "Wednesday",
  "3": "Thursday",
  "4": "Friday",
  "5": "Saturday",
};

class DisplayTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      faculties: [],
      groups: [],
      selectedDay: "Monday",
      selectedFaculty: "Information Technology",
      selectedGroup: "TAW-1",
    };

    this.callAPI = this.callAPI.bind(this);
    this.changeFaculty = this.changeFaculty.bind(this);
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

  async writeRequest() {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: this.state.selectedDay,
        faculty: this.state.selectedFaculty,
        group: this.state.selectedGroup,
      }),
    };
    console.log(
      JSON.stringify({
        day: this.state.selectedDay,
        faculty: this.state.selectedFaculty,
        group: this.state.selectedGroup,
      })
    );

    console.log(requestOptions);

    try {
      let res = await fetch(
        "http://localhost:8090/studyDay/get",
        requestOptions
      );

      let result = await res.json();
      console.log(result);
      this.setState({
        list: result,
      });
    } catch (e) {
      console.log("error appeared");
    }

    console.log(this.state.selectedDay);
    console.log(this.state.selectedGroup);
    console.log(this.state.selectedFaculty);
  }

  render() {
    let tb_data = this.state.list.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.time}</td>
          <td>{item.subject}</td>
          <td>{item.professor}</td>
        </tr>
      );
    });
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Professor</th>
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
