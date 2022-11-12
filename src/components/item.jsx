import React, { Component } from 'react';
// export default function Item({ smallimg }) {
//   return (
//     <li class="gallery-item">
//       <img src={smallimg} alt="" />
//     </li>
//   );
// }

export default class Item extends Component {
  handleClick = () => {
    this.props.onClick(this.props.largeimg);
  };
  render() {
    return (
      <li class="gallery-item" onClick={this.handleClick}>
        <img src={this.props.smallimg} alt="" />
      </li>
    );
  }
}
