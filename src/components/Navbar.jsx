import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/notes">Notes</NavLink>
    </div>
  );
};

export default Navbar;
