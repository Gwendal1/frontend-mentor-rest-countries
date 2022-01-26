import React from 'react';
import "./Header.scss"

export default function Header({props}) {
  return (
  <div className="header">
      <h1>Where in the world ?</h1>
      <button onClick={props}>Dark Mode</button>
  </div>
  );
}
