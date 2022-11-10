import React from 'react';
export default function Item({ smallimg }) {
  return (
    <li class="gallery-item">
      <img src={smallimg} alt="" />
    </li>
  );
}
