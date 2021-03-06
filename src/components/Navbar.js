import {
    Avatar,
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    MenuBookTwoTone,
    AssignmentTwoTone,
    MenuTwoTone,
    LogoutTwoTone,
    AccountBoxTwoTone,
    AssignmentTurnedInTwoTone,
    UploadFileTwoTone,
    BusinessCenterTwoTone,
    BackpackTwoTone,
    LightModeTwoTone,
    DarkModeTwoTone,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../images/banner.png";
import { useHistory, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";

const drawerWidth = 240;

function Navbar({ children, handleMode, mode }) {
    const location = useLocation();
    const currentPath = location.pathname;

    const role = useRole();
    const history = useHistory();
    const { signout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [headerTitle, setHeaderTitle] = useState("Profile");
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        const title = {
            "/student-data": "Student Data",
            "/teacher-data": "Teacher Data",
            "/view-assignment": "View Assignments",
            "/upload-assignment": "Upload Assignment",
            "/submit-assignment": "Assignments",
            "/notes": "Notes",
            "/": "Profile",
        };

        Object.keys(title).forEach(path => {
            if (currentPath === path) {
                setHeaderTitle(title[path]);
                return;
            }
        });
    }, [currentPath]);

    const drawer = (
        <div>
            <Toolbar>
                <Avatar variant="TwoTone" src={logo} />
                <Typography sx={{ ml: 2 }} variant="h6" noWrap align="right">
                    studyShare
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItemButton
                    onClick={() => {
                        setMobileOpen(false);
                        history.push("/");
                    }}
                    selected={headerTitle === "Profile" ? true : false}>
                    <ListItemIcon>
                        <AccountBoxTwoTone />
                    </ListItemIcon>
                    <ListItemText primary={"Profile"} />
                </ListItemButton>

                <>
                    {(role === "student" || role === "teacher") && (
                        <ListItemButton
                            onClick={() => {
                                setMobileOpen(false);
                                history.push("/notes");
                            }}
                            selected={headerTitle === "Notes" ? true : false}>
                            <ListItemIcon>
                                <MenuBookTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={"Notes"} />
                        </ListItemButton>
                    )}
                </>
                <>
                    {role === "student" && (
                        <ListItemButton
                            onClick={() => {
                                setMobileOpen(false);
                                history.push("/submit-assignment");
                            }}
                            selected={
                                headerTitle === "Assignments" ? true : false
                            }>
                            <ListItemIcon>
                                <AssignmentTwoTone />
                            </ListItemIcon>
                            <ListItemText primary={"Assignments"} />
                        </ListItemButton>
                    )}
                </>
                <>
                    {role === "teacher" && (
                        <>
                            <ListItemButton
                                onClick={() => {
                                    setMobileOpen(false);
                                    history.push("/upload-assignment");
                                }}
                                selected={
                                    headerTitle === "Upload Assignment"
                                        ? true
                                        : false
                                }>
                                <ListItemIcon>
                                    <UploadFileTwoTone />
                                </ListItemIcon>
                                <ListItemText primary={"Upload Assignment"} />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => {
                                    setMobileOpen(false);
                                    history.push("/view-assignment");
                                }}
                                selected={
                                    headerTitle === "View Assignments"
                                        ? true
                                        : false
                                }>
                                <ListItemIcon>
                                    <AssignmentTurnedInTwoTone />
                                </ListItemIcon>
                                <ListItemText primary={"View Assignments"} />
                            </ListItemButton>
                        </>
                    )}
                </>
                <>
                    {role === "admin" && (
                        <>
                            <ListItemButton
                                onClick={() => {
                                    setMobileOpen(false);
                                    history.push("/teacher-data");
                                }}
                                selected={
                                    headerTitle === "Teacher Data"
                                        ? true
                                        : false
                                }>
                                <ListItemIcon>
                                    <BusinessCenterTwoTone />
                                </ListItemIcon>
                                <ListItemText primary={"Teacher Data"} />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => {
                                    setMobileOpen(false);
                                    history.push("/student-data");
                                }}
                                selected={
                                    headerTitle === "Student Data"
                                        ? true
                                        : false
                                }>
                                <ListItemIcon>
                                    <BackpackTwoTone />
                                </ListItemIcon>
                                <ListItemText primary={"Student Data"} />
                            </ListItemButton>
                        </>
                    )}
                </>
                <ListItemButton onClick={async () => signout()}>
                    <ListItemIcon>
                        <LogoutTwoTone />
                    </ListItemIcon>
                    <ListItemText primary={"Log out"} />
                </ListItemButton>
            </List>
            <Divider />
            <ListItemButton onClick={handleMode}>
                <ListItemIcon>
                    {mode ? <DarkModeTwoTone /> : <LightModeTwoTone />}
                </ListItemIcon>
                <ListItemText primary={`Theme: ${mode ? "Dark" : "Light"}`} />
            </ListItemButton>
        </div>
    );

    if (
        currentPath === "/" ||
        currentPath === "/notes" ||
        currentPath === "/student-data" ||
        currentPath === "/view-assignment" ||
        currentPath === "/submit-assignment" ||
        currentPath === "/teacher-data" ||
        currentPath === "/upload-assignment"
    ) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                <CssBaseline />
                <AppBar position="fixed">
                    <Toolbar
                        sx={{
                            justifyContent: "space-between",
                        }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}>
                            <MenuTwoTone />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {headerTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}>
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        p: 3,
                    }}>
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        );
    } else return <>{children}</>;
}

export default Navbar;
