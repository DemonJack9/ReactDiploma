import React from "react";

class DisplayTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };

    this.callAPI = this.callAPI.bind(this);
    this.callAPI();
  }

  callAPI() {
    //fetch data from API
    //TODO make this works
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
          <td>
            <button className="btn">Remove</button>
          </td>
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
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{tb_data}</tbody>
        </table>
      </div>
    );
  }
}

export default DisplayTable;
