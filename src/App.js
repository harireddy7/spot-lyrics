import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DataProvider from './context/context';
import HomePage from './components/HomePage/HomePage';
import Track from './components/track/Track';

const App = () => {
  return (
    <BrowserRouter>
      <DataProvider>
        <header className="bg-dark mb-3 p-2 text-light text-center font-weight-bold">
          SPOT LYRICS
        </header>
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/lyrics/track/:id" component={Track} />
            <Route path="*" component={() => <h2>404 page not found!</h2>} />
          </Switch>
        </div>
        <footer className="footer bg-dark text-light text-center p-2">
          &copy; SpotLyrics | Built with Musixmatch
        </footer>
      </DataProvider>
    </BrowserRouter>
  );
};

export default App;
