import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Cart from "./cart";
import Profile from "./profile";
import { SearchBar, SearchBarMini } from "./search";
import { MenuBig, MenuMini } from "./menu";
import { Logo, LogoMini } from "./logo";

function Header() {
  return (
    <AppBar sx={{ backgroundColor: "#CB997E", position: "sticky" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <MenuMini />
          <LogoMini />
          <MenuBig />
          <SearchBar />
          <SearchBarMini />
          <Cart />
          <Profile />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
