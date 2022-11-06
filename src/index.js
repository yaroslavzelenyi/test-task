import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './components/app/App';
import store from './store';
import JobDetailed from './components/jobDetailed/JobDetailed';
import './styles/index.scss';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path='/' element={<App/>}/>
                    {/* <Route path='/vacancy' element={JobDetailed} /> */}
                </Routes>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);

