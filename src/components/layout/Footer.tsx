import React from "react";
import styles from "./Footer.module.css";
import { Typography } from "@mui/material";
import Logo from "../partials/Logo/Logo";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Typography variant="caption" color="primary">
        Copyright &#169; all rights reserved
      </Typography>
    </footer>
  );
};

export default Footer;
