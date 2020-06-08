import React, { useContext, useEffect } from 'react';

import { Store } from '../../context/context';
import Search from '../search/Search';
import Tracks from '../tracks/Tracks';
import loadingImg from '../../assets/loading.gif';
import axiosInstance from '../../api/axiosInstance';

const HomePage = () => {
  const { store, dispatcher } = useContext(Store);
  const { tracks = [], resultsTitle } = store || {};

  useEffect(() => {
    if (!tracks || tracks.length === 0) {
      axiosInstance
        .get(
          `/chart.tracks.get?chart_name=top&page=1&page_size=10&country=US&f_has_lyrics=1`
        )
        .then(res => {
          const { track_list } = res.data.message.body;
          dispatcher({ payload: { tracks: track_list } });
        })
        .catch(err => console.log({ err }));
    }
  }, [tracks, dispatcher]);

  return (
    <React.Fragment>
      <Search />
      {tracks && tracks.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-50">
          <img
            src={loadingImg}
            className="img-fluid mx-auto d-block"
            alt="Loading Spinner"
          />
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-dark text-light text-center font-weight-bold">
            {resultsTitle}
          </div>
          <div className="card-body">
            <Tracks />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HomePage;
