import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import DataProvider from './context/context';
import HomePage from './components/HomePage/HomePage';
import Track from './components/track/Track';

const App = () => {
  return (
    <HashRouter basename="/">
      <DataProvider>
        <div className="app-container">
          <header className="bg-dark mb-3 p-2 text-light text-center font-weight-bold">
            SPOT LYRICS
          </header>
          <div className="container h-100">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/lyrics/track/:id" component={Track} />
              <Route path="*" component={() => <h2>404 page not found!</h2>} />
            </Switch>
          </div>
          <footer className="footer bg-dark text-light text-center p-2">
            &copy; SpotLyrics | Built with Musixmatch
          </footer>
        </div>
      </DataProvider>
    </HashRouter>
  );
};

export default App;
