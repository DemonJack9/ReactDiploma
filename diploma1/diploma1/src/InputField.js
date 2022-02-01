import React from "react";

class InputField extends React.Component {
  render() {
    return (
      <div className="dinputField">
        <input
          className="dinput"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(val) => this.props.onChange(val.target.value)}
        />
      </div>
    );
  }
}

export default InputField;
