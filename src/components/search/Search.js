import React, { useState, useContext } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Store } from '../../context/context';

const Search = () => {
  const [trackTxt, setTrackTxt] = useState('');
  const { dispatcher } = useContext(Store);

  const handleValueChange = e => setTrackTxt(e.target.value);

  const handleSearch = e => {
    e.preventDefault();
    axiosInstance
      .get(
        `/track.search?q=${trackTxt}&page_size=10&page=1&s_track_rating=desc`
      )
      .then(res => {
        dispatcher({
          type: 'SEARCH_TRACK',
          payload: {
            tracks: res.data.message.body.track_list
          }
        });
        setTrackTxt('');
      })
      .catch(err => console.log({ err }));
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body p-4 rounded-lg">
        <div className="text-center mb-3">
          <div className="card-title d-flex justify-content-center align-items-center">
            <div className="icon-music fas fa-music fa-2x"></div>
            <div className="ml-2 h4 mb-0">Search For A Song</div>
          </div>
          <div className="card-subtitle">Get lyrics for any track</div>
        </div>
        <input
          type="text"
          placeholder="search lyrics for your song"
          className="form-control"
          value={trackTxt}
          onChange={handleValueChange}
        />
        <button
          type="submit"
          className="btn btn-block mt-2 btn-primary"
          onClick={handleSearch}
        >
          Get song lyrics
        </button>
      </div>
    </div>
  );
};

export default Search;
