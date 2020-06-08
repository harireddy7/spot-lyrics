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
    <div className="container">
      <button className="btn btn-dark btn-sm" onClick={() => push('/')}>
        Go back
      </button>
      {track &&
      lyrics &&
      Object.keys(track).length > 0 &&
      Object.keys(lyrics).length > 0 ? (
        <React.Fragment>
          <div className="card shadow-sm mt-2">
            <div className="card-header">
              <strong>{track.track_name} By </strong>
              <span>{track.artist_name}</span>
            </div>
            <div className="card-body">
              {/* {`${lyrics.lyrics_body}`.replace(/\n/g, <br />)} */}
              <pre>{lyrics.lyrics_body}</pre>
            </div>
          </div>
          <div className="card mt-3">
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
        </React.Fragment>
      ) : (
        <img
          src={loadingImg}
          className="img-fluid mx-auto d-block"
          alt="Loading Spinner"
        />
      )}
    </div>
  );
};

export default Track;

// {
//   "lyrics_id": 21951385,
//   "explicit": 0,
//   "lyrics_body": "I didn't ask for a free ride\nI only asked you to show me a real good time\nI never asked for the rainfall\nAt least I showed up, you showed me nothing at all\n\nIt's coming down on me\nWater like misery\nIt's coming down on me\nI'm ready, rain on me\n\nI'd rather be dry, but at least I'm alive\nRain on me, rain, rain\nRain on me, rain, rain\nI'd rather be dry, but at least I'm alive\nRain on me, rain, rain\nRain on me\n\nRain on me\nMmh, oh yeah, baby\nRain on me\n\nLivin' in a world where no one's innocent\nOh, but at least we try, mmh\n...\n\n******* This Lyrics is NOT for Commercial use *******",
//   "script_tracking_url": "https://tracking.musixmatch.com/t1.0/m_js/e_1/sn_0/l_21951385/su_0/rs_0/tr_3vUCAC_HmZ9qWRN1k9TKMMRjkqFx2LQrxogw04qJ5WucvDEoLzSYKww36K1ar2aYV6FTsahpPUMmFSCBVWYaQ40mVt2kWWFPraHfXJ1nGmIeZTpwZQg3ml4idrqWp5I0mWzslV7CuzvmjfZfVH9ujtR2Kq05XteMJ6bDXCqzqglkIfontimTN73Cfgq1JZQTyVuNTJYdETzupjeNRWCl37jqIOfZTRvr9cM2o_QGsgUmgqzrtlGbTzUkSaNU1tl3LAGjazgDSVqhkHBC1r9MzZxfmgZXdaSDxyzI2wFiB9ew9pQ-c81_2VbIYqpmaIaF3dGLsBuXJi7XVZNqLs84YAo7ppBJD9f-HVCMd5sCZPv8zkmIrGlE97TLcbgrSbmegDlIOBTsAvWlVWqGgtbDMmydZmjETqDPTgGRG-FcWYjU3HwWMPcl3qbb9nU/",
//   "pixel_tracking_url": "https://tracking.musixmatch.com/t1.0/m_img/e_1/sn_0/l_21951385/su_0/rs_0/tr_3vUCAOeZmxV97kWiJBlbwoepspMdkwmjVpjhwZ21IRwL5w3Yh6H81FQgKwWFPNZwH8c47C0BQYG_JEmtktgv7ft31sFm28pLoCVNhOz94JQRDj798aqeymUIU6IlAh3h-QaUtOV-UjMk4jeAejgFYc_CJRZ3ISl8D6FDrMP7JuBNGXci9QNiTYCh7M_EmO_S2qRk7mKqrRe7eCcH6lDv5kAOHMAd-mLWTny7BQyKaj31DZ63TGvWFk3N0ffSgJ5GCqATt5GwaXP_CId5kXmPoHmueVIEkbnNDEoRVPLNZNcsQq2NIaNuY6kd6t54-3q6HvaOSHN3J4Rgx3NTFTVoWhL8ywV5JvP-apaIec-lFyB6pqPonUceQ93WCJ5ddhlltk1O_ul-jZO-aSZvRCri_SYNGq1yhzZQ6fJZJhZsPuvW2eoQbtx6ZdhKrsM/",
//   "lyrics_copyright": "Lyrics powered by www.musixmatch.com. This Lyrics is NOT for Commercial use and only 30% of the lyrics are returned.",
//   "updated_time": "2020-05-23T10:21:33Z"
// }
