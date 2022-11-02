import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PersonIcon from "@mui/icons-material/Person";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../images/logo.png";
import useStyles from "../styles/NavSidebar";
import "./NavSidebar.css";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#fff",
    color: "white",
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiTypography-body1": {
        fontFamily: "Montserrat !important",
    },
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        height: "100vh",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        fontFamily: "Montserrat",
        backgroundColor: "rgb(129,192,96)",
        color: "white",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme();

const NavSidebar = (props) => {
    const {auth, user} = useAuth()
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        history.push("/");
    };


    useEffect(() => {
        if (!auth && !user) {
            history.push("/");
        }
    }, []);

    const handleListClick = (url) => {
        history.push(url);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: "24px", // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            // color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {/**Dashboard */}
                        </Typography>
                        <div className={classes.logoutBtnDiv}>
                            <button
                                className={classes.logoutBtn}
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: [1],
                        }}
                    >
                        <div className="sidebar-logo">
                            <img src={logo}></img>
                            <p>
                                Directory
                                Pitampura
                            </p>
                        </div>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon className={classes.closeDrawer} />
                        </IconButton>
                    </Toolbar>
                    <Divider />

                    <List className={classes.listDiv}>
                        <ListItem
                            button
                            className={
                                props.location.pathname.includes("/users")
                                    ? classes.selectedList
                                    : ""
                            }
                            onClick={() => handleListClick("/users")}
                        >
                            <ListItemIcon>
                                {props.location.pathname.includes("/users") ? (
                                    <PersonIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                ) : (
                                    <PersonIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                        <ListItem
                            button
                            className={
                                props.location.pathname.includes("/adds")
                                    ? classes.selectedList
                                    : ""
                            }
                            onClick={() => handleListClick("/adds")}
                        >
                            <ListItemIcon>
                                {props.location.pathname.includes(
                                    "/allvideos"
                                ) ? (
                                    <OndemandVideoIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                ) : (
                                    <OndemandVideoIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Adds" />
                        </ListItem>
                        {/* <ListItem
                            button
                            className={
                                props.location.pathname.includes("/dashboard")
                                    ? classes.selectedList
                                    : ""
                            }
                            onClick={() => handleListClick("/dashboard")}
                        >
                            <ListItemIcon>
                                {props.location.pathname.includes(
                                    "/dashboard"
                                ) ? (
                                    <DashboardIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                ) : (
                                    <DashboardIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>

                        <ListItem
                            button
                            className={
                                props.location.pathname.includes("/playlist")
                                    ? classes.selectedList
                                    : ""
                            }
                            onClick={() => handleListClick("/playlist")}
                        >
                            <ListItemIcon>
                                {props.location.pathname.includes(
                                    "/playlist"
                                ) ? (
                                    <SubscriptionsIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                ) : (
                                    <SubscriptionsIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Playlists" />
                        </ListItem>
                        <ListItem
                            button
                            className={
                                props.location.pathname.includes("/category")
                                    ? classes.selectedList
                                    : ""
                            }
                            onClick={() => handleListClick("/category")}
                        >
                            <ListItemIcon>
                                {props.location.pathname.includes(
                                    "/category"
                                ) ? (
                                    <CategoryIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                ) : (
                                    <CategoryIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Category" />
                        </ListItem>

                        <ListItem
                            button
                            className={
                                props.location.pathname.includes("/blogs")
                                    ? classes.selectedList
                                    : ""
                            }
                            onClick={() => handleListClick("/blogs")}
                        >
                            <ListItemIcon>
                                {props.location.pathname.includes("/blogs") ? (
                                    <ArticleIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                ) : (
                                    <ArticleIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Blogs" />
                        </ListItem>

                        <ListItem
                            button
                            className={
                                props.location.pathname.includes("/query")
                                    ? classes.selectedList
                                    : ""
                            }
                            onClick={() => handleListClick("/query")}
                        >
                            <ListItemIcon>
                                {props.location.pathname.includes("/query") ? (
                                    <ContactSupportIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                ) : (
                                    <ContactSupportIcon
                                        style={{
                                            color: "white",
                                            fontSize: "1.8rem",
                                        }}
                                    />
                                )}
                            </ListItemIcon>
                            <ListItemText primary="Query Form" />
                        </ListItem> */}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            props.location.pathname.includes("/add")
                                ? "#fff"
                                : theme.palette.grey[100],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    {props.children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default NavSidebar;
