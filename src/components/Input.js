import * as React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event) {
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

  render() {
    return (
      <input
        placeholder="Type your todo here!"
        onKeyPress={this.handleKeyPress}
        onChange={this.handleChange}
        value={this.state.value}
      />
    );
  }
}

export default Input;
