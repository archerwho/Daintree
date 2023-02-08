import * as React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import history from "./history";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function SearchBar() {
  const [keyword, setKeyword] = React.useState("");
  const searchSubmitHandler = (e) => {
    // e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push(`/products`);
    }
  };
  return (
    <Box sx={{ flexGrow: 0.07, display: { xs: "none", md: "flex" } }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <form onSubmit={searchSubmitHandler}>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
      </Search>
    </Box>
  );
}

export function SearchBarMini() {
  const [keyword, setKeyword] = React.useState("");
  const searchSubmitHandler = (e) => {
    // e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push(`/products`);
    }
  };
  const [anchorElSeacrch, setAnchorElSearch] = React.useState(null);

  const handleOpenSearch = (event) => {
    setAnchorElSearch(event.currentTarget);
  };

  const handleCloseSearch = () => {
    setAnchorElSearch(null);
  };
  return (
    <Box sx={{ flexGrow: 0.02, display: { xs: "flex", md: "none" } }}>
      <IconButton aria-label="search-button" onClick={handleOpenSearch}>
        <SearchIcon sx={{ color: "#F0EFEB", fontSize: 30 }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElSeacrch}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElSeacrch)}
        onClose={handleCloseSearch}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <form onSubmit={searchSubmitHandler}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
        </Search>
      </Menu>
    </Box>
  );
}
