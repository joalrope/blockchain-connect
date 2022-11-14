import './index.css';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/HomeComponent';
import Transactions from './components/Transactions/TransactionsComponent';
import AsideMenu from './components/Aside/AsideComponent';
import HeaderComponent from './components/Header/HeaderComponent';
import Wallets from './components/Wallets/WalletsComponent';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <div 
        className='app-container'>
        <HeaderComponent />
        <div className="container-components">
          <BrowserRouter>
            <AsideMenu />
            <div className="container-router">
              <Routes>
                <Route path='/transactions' element={ <Transactions /> }></Route>
                <Route path='/wallets' element={ <Wallets /> }></Route>
                <Route path='/' element={ <Home /> }></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </Provider>
  </React.StrictMode>
);