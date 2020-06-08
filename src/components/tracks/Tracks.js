import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../../context/context';

const Tracks = () => {
  const { store } = useContext(Store);
  return (
    <div className="row m-auto">
      {store.tracks.map(({ track }) => {
        const { artist_name, album_name, track_name, track_id } = track;
        return (
          <div key={track_id} className="col-sm-6">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">{artist_name}</div>
              <div className="card-body">
                <div className="card-text">
                  <i className="fas fa-play fa-sm"></i> <strong>Track</strong>:{' '}
                  {track_name}
                </div>
                <div className="card-text">
                  <i className="fas fa-compact-disc fa-sm"></i>{' '}
                  <strong>Album</strong>: {album_name}
                </div>
                <Link
                  to={`lyrics/track/${track_id}`}
                  className="btn btn-dark mt-2 btn-block btn-sm"
                >
                  View Lyrics
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tracks;
