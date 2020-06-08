import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import loadingImg from '../../assets/loading.gif';

const Track = props => {
  const {
    history: { push = () => {} },
    match: {
      params: { id }
    }
  } = props;

  const [track, setTrack] = useState();
  const [lyrics, setLyrics] = useState();

  useEffect(() => {
    axiosInstance
      .get(`track.get?track_id=${id}`)
      .then(res => {
        setTrack(res.data.message.body.track);
        return axiosInstance.get(`track.lyrics.get?track_id=${id}`);
      })
      .then(res => {
        setLyrics(res.data.message.body.lyrics);
      })
      .catch(err => console.log('err', err));
  }, [id]);

  return (
    <div className="container h-100">
      <button className="btn btn-dark btn-sm" onClick={() => push('/')}>
        Go back
      </button>
      {track &&
      lyrics &&
      Object.keys(track).length > 0 &&
      Object.keys(lyrics).length > 0 ? (
        <React.Fragment>
          <div className="row m-auto">
            <div className="col-xs-6">
              <div className="col-xs-12 card shadow-sm mt-2">
                <div className="card-header">
                  <strong>{track.track_name} By </strong>
                  <span>{track.artist_name}</span>
                </div>
                <div className="card-body">
                  <pre>{lyrics.lyrics_body}</pre>
                </div>
              </div>
              <div className="card mt-3 mb-5">
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Album</strong>
                    <span>: {track.album_name}</span>
                  </li>
                  <li className="list-group-item">
                    <strong>Song Genre</strong>
                    <span>
                      :{' '}
                      {track.primary_genres.music_genre_list.length > 0
                        ? track.primary_genres.music_genre_list[0].music_genre
                            .music_genre_name
                        : 'NA'}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <strong>Explicit Words</strong>
                    <span>: {track.explicit}</span>
                  </li>
                  <li className="list-group-item">
                    <strong>First Release Date</strong>
                    <span>
                      : {new Date(track.updated_time).toLocaleDateString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <img
            src={loadingImg}
            className="img-fluid mx-auto d-block"
            alt="Loading Spinner"
          />
        </div>
      )}
    </div>
  );
};

export default Track;
