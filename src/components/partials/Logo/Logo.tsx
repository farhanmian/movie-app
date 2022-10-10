import React from "react";
import styles from "./Logo.module.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MuiStyles = {
  logo: {
    fontFamily: "Bungee, cursive",
    fontSize: 26,
    cursor: "pointer",
  },
};

const Logo = () => {
  return (
    <Link to={"/"} className={styles.link}>
      <Typography variant="h6" color="#fff" sx={MuiStyles.logo}>
        MbOX
      </Typography>
    </Link>
  );
};

export default Logo;
