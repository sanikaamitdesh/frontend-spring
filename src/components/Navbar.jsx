import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

const Navbar = () => {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-content">
        <span className="logo">College Document System</span>
        <ul className="nav-links">
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/">Home</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/about">About</Link>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
