import React, { useReducer } from 'react';

export const Store = React.createContext();

const reducer = (state, { action, payload: { tracks } }) => {
  switch (action) {
    case 'SEARCH_TRACK': {
      return {
        ...state,
        tracks,
        resultsTitle: 'Search Results'
      };
    }
    default: {
      return { ...state, tracks };
    }
  }
};

const DataProvider = props => {
  const [state, setState] = useReducer(reducer, {
    resultsTitle: 'Top 10 Tracks',
    tracks: []
  });
  return (
    <Store.Provider value={{ store: state, dispatcher: setState }}>
      {props.children}
    </Store.Provider>
  );
};

export default DataProvider;
