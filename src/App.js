import './App.css';
import MainScreen from './screens/MainScreen';


if (process.env.REACT_APP_APP_MODE == 'production') {
  console.log = console.warn = console.error = () => {};
}

function App() {
  return (
    <div>
      <MainScreen/>
    </div>
  );
}

export default App;
