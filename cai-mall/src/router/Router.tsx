import * as React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import App from '../components/app/App';
import Login from '../containers/Login';
import Register from '../components/register/Register';
import Sell from '../containers/Sell';

function CaiRouter() {
    return (
        <Router>
            <div>
                <Route exact={true} path="/" component={App} />
                <Route exact={true} path="/login" component={Login} />
                <Route exact={true} path="/register" component={Register} />
                <Route exact={true} path="/seller" component={Sell} />
            </div>
        </Router>
    );
}

export default CaiRouter;