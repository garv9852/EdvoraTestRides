import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import {Provider} from "react-redux"
import store from './redux/store';
import { BrowserRouter ,Switch ,Router ,Routes ,Route} from 'react-router-dom';
import Ride from './components/Ride';

function App() {
  return (
    <>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="EdvoraTestRides/ride:code" element={<Ride/>}/>
          <Route path="/EdvoraTestRides" element={<Login/>}/>
        </Routes>
      </Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
