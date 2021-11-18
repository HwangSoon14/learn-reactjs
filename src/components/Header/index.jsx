import { AccountCircle, Logout } from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Avatar, Badge, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { useState  } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Login from "../../features/Auth/components/Login";
import Register from "../../features/Auth/components/Register";
import { logout } from "../../features/Auth/userSlice";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { cartItemsCountSelector } from "../../features/Cart/selectors";
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'pointer',
  }
}));

export default function Header() {
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const history = useHistory();
  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl , setAnchorEl] = useState(null);
  const MODE = {
    LOGIN: 'login',
    REGISTER: 'register'
  }
  const [mode ,setMode] = useState(MODE.LOGIN);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }
  const handleUserClick = (e) => {
      setAnchorEl(e.currentTarget);
  }
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  }
  const handleClickCart = () => {
      history.push('/cart')
  }
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={classes.link} to="/products">
              Ez Shop
            </Link>
          </Typography>
          <NavLink className={classes.link} to="/products">
            <Button color="inherit">Product</Button>
          </NavLink>
          { !isLoggedIn && ( 
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
           )} 

           <IconButton size="large" aria-label="show 4 new mails" onClick={handleClickCart} color="inherit">
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCartRoundedIcon />
              </Badge>
        </IconButton>

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout 
        </MenuItem>
      </Menu>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        
          <HighlightOffIcon className={classes.closeBtn} onClick={handleClose}/>
        
        <DialogContent> 
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose}/>

              <Box textAlign="center">
                <Button 
                  color="primary" 
                  onClick={() => setMode(MODE.LOGIN)}
                >
                  Nếu đã có tài khoản. Đăng nhập tại đây !
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose}/>

              <Box textAlign="center">
                <Button 
                  color="primary" 
                  onClick={() => setMode(MODE.REGISTER)}
                >
                  Nếu chưa có tài khoản. Đăng ký tại đây !
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
