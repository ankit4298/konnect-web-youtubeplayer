import React,{useState} from 'react';
import './App.css';
import InitScreen from './screens/InitScreen';

if (process.env.REACT_APP_APP_MODE == 'production') {
  console.log = console.warn = console.error = () => {};
}

function App() {
  return (
    <InitScreen />
  );
}

export default App;
