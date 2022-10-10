import React, { useEffect } from "react";
import styles from "./Nav.module.css";
import { InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppContext } from "../../store/context/context";
import { useLocation } from "react-router-dom";
import Logo from "../partials/Logo/Logo";

const MuiStyles = {
  input: {
    backgroundColor: "rgba(255,255,255,.05)",
    // border: "1px solid #fff",
    width: "30rem",
    borderRadius: 4,
    fontWeight: "300",
    color: "#ccc",

    "> div": {
      color: "#fff",
      fontWeight: "300",
      flexDirection: "row-reverse",

      "> fieldset": {
        borderRadius: 4,
        borderColor: "#ccc",
      },

      ":hover > fieldset": {
        borderColor: "#fff !important",
      },
    },
  },
};

const Nav = () => {
  const { pathname } = useLocation();
  const id = pathname.replace("/movie/", "");
  const ctx = useAppContext();

  useEffect(() => {
    if (!id) return;
    ctx?.setSearchValue("");
  }, [id]);

  return (
    <nav className={styles.nav}>
      <div className={styles.innerContainer}>
        <Logo />
        <TextField
          placeholder="Search"
          variant="outlined"
          sx={MuiStyles.input}
          size="small"
          onChange={(e) => {
            ctx?.setSearchValue(e.target.value);
          }}
          value={ctx?.searchValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" fontSize="large" />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </nav>
  );
};

export default Nav;
