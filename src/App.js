
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Route exact = {true} path="/" >
          <Home isLoggedIn = {true} page = '/'/>
        </Route>    
      </BrowserRouter>

    </div>
  );
}

export default App;
