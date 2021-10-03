import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import UserContext from "../context/UserContext";
import { signInUser } from "../services/firebaseServices";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://play.google.com/store/apps/details?id=com.konnect_client"
        target="_blank"
      >
        KonnectX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    height: '100px',
    width: '100px'
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    color: "red",
  },
}));
export default function SignInScreen() {
  const classes = useStyles();

  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");

  const [err_username, setErrorUname] = useState(false);
  const [err_password, setErrPassword] = useState(false);
  const [err_text, setErrText] = useState("");

  const userContext = useContext(UserContext);

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setUname(value.trim());
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(value.trim());
  };

  const handleLogin = async (e) => {
    let _erruname = false;
    let _errpass = false;

    if (uname == null || uname == "") {
      _erruname = true;
      setErrorUname(_erruname);
    } else {
      _erruname = false;
      setErrorUname(_erruname);
    }
    if (password == null || password == "") {
      _errpass = true;
      setErrPassword(_errpass);
      setErrText("Please enter Password");
    } else {
      _errpass = false;
      setErrPassword(_errpass);
    }

    if (_erruname || _errpass) {
      return;
    }

    const { user, error } = await signInUser(uname, password);
    if (error != null) {
      setErrPassword(true);
      if (error.code == "auth/wrong-password") {
        setErrText("Authentication Failed: Invalid Email adress or Password");
      }
      return;
    }

    if (user != null) {
      userContext.setCtxFirebaseUser(user);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.avatar} src={logo} alt="Brand Logo" />
        <Typography component="h1" variant="h5">
          KonnectX
        </Typography>
        <Typography variant="caption" display="block">
          Sign In with Konnect Account
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={uname}
            onChange={handleUsernameChange}
          />
          <span className={classes.errorText}>
            {err_username ? "Please enter Email Address" : null}
          </span>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className={classes.errorText}>
            {err_password ? err_text : null}
          </span>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link
                href="https://play.google.com/store/apps/details?id=com.konnect_client"
                target="_blank"
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
