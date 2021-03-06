import React from 'react';
import ReactDOM from 'react-dom';

/** ****************************************** **/
//import { createBrowserHistory } from 'history';
/* import indexRoutes from './routes/index.jsx';
import { Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import './assets/scss/style.css'; */
//const hist = createBrowserHistory();
/** ****************************************** **/

import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

/* ReactDOM.render(
    <HashRouter>
        <Switch>
            {indexRoutes.map((prop, key) => {
                return <Route 
                    path={prop.path} 
                    key={key} 
                    component={prop.component} />;
            })}
        </Switch>
    </HashRouter>, 
    document.getElementById('root')
); */

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);