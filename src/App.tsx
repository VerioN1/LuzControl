import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import CalenderPage from './pages/CalenderPage/CalenderPage';
import CourseCreator from './pages/CourseCreator/CourseCreator';
import Home from './pages/Home/Home';
import './style/style.css';

const App:React.FC = () => (
  <Router>
    <NavBar>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Calender" component={CalenderPage} />
        <Route path="/CreateCourse" component={CourseCreator} />
      </Switch>
    </NavBar>
  </Router>
);

export default App;
