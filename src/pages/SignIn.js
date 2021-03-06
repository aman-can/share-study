import { useRef, useState } from "react";
import {
    Avatar,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    Alert,
    useMediaQuery,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import logo from "../images/banner.png";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useMounted from "../hooks/useMounted";

export default function SignIn() {
    const { signin } = useAuth();
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [guest, setGuest] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("info");
    const [alertMessage, setAlertMessage] = useState("");
    const mounted = useMounted();

    console.log(guest);

    const handleGuest = e => {
        setGuest(e.target.value);
        emailRef.current.value = e.target.value;
        passwordRef.current.value = "zzzzzzzz";
    };

    const validate = () => {
        let temp = {};

        temp.email = emailRef.current.value
            ? /^.+@.+.\.+/.test(emailRef.current.value)
                ? ""
                : "Email is not valid"
            : "Provide a Email id";

        temp.password = passwordRef.current.value
            ? /.{8,}$/.test(passwordRef.current.value)
                ? ""
                : "Password must has atleast 8 characters"
            : "Provide a password";

        setErrors({
            ...temp,
        });

        return Object.values(temp).every(x => x === "");
    };

    const handleAlert = (severity, message) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            signin(emailRef.current.value, passwordRef.current.value)
                .then(() => {
                    history.push("/");
                })
                .catch(err => handleAlert("error", err.message))
                .finally(() => mounted.current && setIsSubmitting(false));
        }
    };

    return (
        <div
            style={{
                display: "flex",
                height: "95vh",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Container fixed component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Avatar src={logo} sx={{ m: 1 }} />
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {alertMessage && (
                        <Alert
                            variant="filled"
                            sx={{ m: 1 }}
                            severity={alertSeverity}
                            children={alertMessage}
                        />
                    )}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 3, width: "100%" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    size={breakpoint ? "small" : "medium"}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    inputRef={emailRef}
                                    {...(errors.email && {
                                        error: true,
                                        helperText: errors.email,
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size={breakpoint ? "small" : "medium"}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    inputRef={passwordRef}
                                    {...(errors.password && {
                                        error: true,
                                        helperText: errors.password,
                                    })}
                                />
                            </Grid>
                        </Grid>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={isSubmitting}>
                            Sign In
                        </LoadingButton>
                        <FormControl fullWidth variant="filled">
                            <InputLabel id="demo-simple-select-label">
                                Guest Sign In
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={guest}
                                onChange={handleGuest}>
                                <MenuItem value={"student1@gmail.com"}>
                                    student 1
                                </MenuItem>
                                <MenuItem value={"student2@gmail.com"}>
                                    student 2
                                </MenuItem>
                                <MenuItem value={"teacher1@gmail.com"}>
                                    teacher 1
                                </MenuItem>
                            </Select>
                            <FormHelperText>
                                Select any user any click the sign in button
                            </FormHelperText>
                        </FormControl>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    variant="body2"
                                    onClick={() => {
                                        history.push("/forgot-password");
                                    }}>
                                    {"Forgot password?"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    variant="body2"
                                    onClick={() => {
                                        history.push("/signup");
                                    }}>
                                    {"Need an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
