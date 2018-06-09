import * as React from "react";

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleToggle(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.props.onCreate(this.state.value);
      this.setState({
        value: ""
      });
    }
  }

  handleOnChange(e) {
    this.props.onClick(this.props.id, e.target.checked);
  }

  render() {
    return (
      <div>
        <input
          id={`checkbox-${this.props.id}`}
          type="checkbox"
          value={this.props.done ? "false" : "true"}
          onChange={this.handleOnChange}
          checked={this.props.done}
        />
        <label htmlFor={`checkbox-${this.props.id}`}>{this.props.text}</label>
      </div>
    );
  }
}

export default Item;
