import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Login}/>
        <Route path="/login" exact component={Login}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
