import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import ViewList from './components/ViewList/ViewList';
import AddUser from './components/AddUser/AddUser';
import EditUser from "./components/EditUser/EditUser";

function App() {
    return (
        <Router>
            <div className="container-sm">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink to={'/view'} className="nav-link " activeClassName="active">
                            List
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/add'} className="nav-link">
                            Add
                        </NavLink>
                    </li>
                </ul>
                <br></br>
                <Switch>
                    <Route exact path={['/', '/view']} component={ViewList} />
                    <Route exact path="/add" component={AddUser} />
					<Route exact path="/edit/:id" component={EditUser} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
