import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

import { signInUser } from "../services/firebaseServices";
export default function SignInScreen() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");

  const [err_username, setErrorUname] = useState(false);
  const [err_password, setErrPassword] = useState(false);
  const [err_text, setErrText] = useState("");

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
      setErrText("Please enter Password.");
    } else {
      _errpass = false;
      setErrPassword(_errpass);
    }

    if (_erruname || _errpass) {
      return;
    }

    const {user, error} = await signInUser(uname, password);
    if (error != null) {
      setErrPassword(true);
      setErrText(error.message);
      return;
    }
  };

  return (
    <div styles="padding:20px">
      LOGIN SCREEN
      <br />
      <FormControl error={err_username} variant="outlined">
        <InputLabel htmlFor="component-outlined-uname">Username</InputLabel>
        <OutlinedInput
          id="component-outlined-uname"
          value={uname}
          onChange={handleUsernameChange}
          label="Username"
        />
        <FormHelperText id="component-outlined-uname">
          {err_username ? "Please enter username" : null}
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl error={err_password} variant="outlined">
        <InputLabel htmlFor="component-outlined-pass">Password</InputLabel>
        <OutlinedInput
          id="component-outlined-pass"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          label="Password"
        />
        <FormHelperText id="component-outlined-pass">
          {err_password ? err_text : null}
        </FormHelperText>
      </FormControl>
      <br />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}
