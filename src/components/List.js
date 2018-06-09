import Item from "./Item";
import * as React from "react";

class List extends React.Component {
  render() {
    if (this.props.items.length === 0) {
      return null;
    }

    return (
      <div>
        <strong>{this.props.title}</strong>
        {this.props.items.map(item => (
          <Item
            key={item.id}
            id={item.id}
            text={item.text}
            done={item.done}
            onClick={this.props.onItemClick}
          />
        ))}
      </div>
    );
  }
}

export default List;
