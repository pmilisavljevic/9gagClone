import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { logout } from "src/store/userSlice";

import { userInfo } from "src/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "src/helpers/constantsAndEnums";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/");
  }

  function handleNavigateToEditProfile() {
    setAnchorEl(null);
    navigate("/edit-profile");
  }

  function handleNavigateToRequestsToMe() {
    navigate("/requests-to-me");
  }

  function handleNavigateToMyPosts() {
    navigate("/my-posts");
  }
  function handleNavigateToMyFriends() {
    navigate("/my-friends");
  }
  const user = useSelector(userInfo);
  const dispatch = useDispatch();
  const avatar = `${URL}${user?.profilePictureUrl}`;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <img src={avatar}></img>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleNavigateToEditProfile}>
          <Avatar /> Edit Profile
        </MenuItem>
        <MenuItem onClick={handleNavigateToRequestsToMe}>
          <Avatar /> Requests To Me
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleNavigateToMyPosts}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          My Posts
        </MenuItem>
        <MenuItem onClick={handleNavigateToMyFriends}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          My Friends
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
