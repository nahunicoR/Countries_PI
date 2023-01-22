import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx'; 
import SearchBar from './components/SearchBar/SearchBar';
import Create from './components/Create/Create';
import Details from './components/Details/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route exact path='/home/:id' component={Details}/>
      <Route path='/home' component={SearchBar}/>
      <Route path="/home" component={Home}/> 
        <Route path='/activities' component={Create}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
