import React from "react";
import { useEffect, useState } from "react";
import Songs from "../components/Songs";
import { useParams } from "react-router";
import PlaceHolder  from "../components/PlaceHolder";

import Song from "../svg/Song.svg"
import NavigationLibrary from "../components/NavigationLibrary";
import SingleSongs from "../components/SingleSongs";

const LikePage = () => {
  const params = useParams();

  const [likedSongs, setLikedSongs] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);

  const fetchLikedSongs = () => {
    const url = "https://spotify-be-app.herokuapp.com/likes";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLikedSongs(data);
       
      });
  };
  const fetchPlaylistSongs = (playlistId) => {
    const url = "https://spotify-be-app.herokuapp.com/playlist/" + playlistId;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
      
        setLikedSongs(data.songs);
        setName(data.name);
        if (data.songs[0]) {
          setImage(data.songs[0].md5_image);
        } else {
          setImage(null);
        }
      });
  };
  useEffect(() => {
    if (params?.playlistId) {
      fetchPlaylistSongs(params.playlistId);
    } else {
      fetchLikedSongs();
    }
  }, [params.playlistId]);
  return (
    <div className="like-container">
      <section id="navbar">
        <div className="container-fluid">
          <NavigationLibrary />
          <div className="jumbotron jumbotron-fluid">
            <div className="d-flex align-items-end"
                style={{ margin: 35, marginTop: 146 }}>
              <img className="likedBox  img-fluid mr-3"
                src={
                  (!params?.playlistId &&
                    "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png") ||
                  "https://e-cdns-images.dzcdn.net/images/cover/" +
                    image +
                    "/250x250-000000-80-0-0.jpg"}/>
              <span className="titlesLikePage">
                <span>PLAYLIST</span>
                <h4 className="headerLike">
                  {(!params?.playlistId && "Liked Songs") || name}
                </h4>
                <span>
                  {" "}
                  Alexander{" "}
                  {likedSongs.length === 1
                    ? "• 1 song"
                    : likedSongs.length > 1
                    ? "• " + likedSongs.length + " songs"
                    : ""}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="like-content-album">
          <div>
            
            <div className="padding-content">
              {likedSongs.length > 0 && (
                <div className="buttons-row">
                <div className="sticky-top">
                  {/*-----------button with js---------*/}
                  <button id="btn-b4-follow"
                    type="button"
                    className="btn btn-success"
                    onclick="togglePlay()">
                    <div className="follow button" />
                  </button>
                </div>
                </div>
              )}
          <div className="col-12">
          <div className="song-content">
            <div className="table-header stickydiv mb-4 sticky-top">
              <div className="d-flex text-light hash">#</div>
              <div className="d-flex text-light title">
                <div className="d-flex">
                  <span className="text-light">TITLE</span>
                </div>
              </div>
              <div className="d-flex album ml-4">
                <div className="d-flex">
                  <span className="text-light">ALBUM</span>
                </div>
              </div>
              <div className="d-flex date-added">
                <div className="d-flex">
                  <span className="text-light">DATE ADDED</span>
                </div>
              </div>
              <div className="d-flex duration">
                <div className="d-flex">
                  <img
                    src="./images/icons8-clock-32.png"
                    width={20}
                    height={20}
                    alt
                  />
                </div>
              </div>
            </div>
            {/*-------------------------------------------table 1-------------------------------------------*/}
              <>
                {likedSongs.length > 0 &&
                  likedSongs.map((song, i) => (
                    <SingleSongs
                    index={i}
                    song={song}
                    img={
                      "https://e-cdns-images.dzcdn.net/images/cover/" +
                      song.md5_image +
                      "/250x250-000000-80-0-0.jpg"
                    }
                    liked={true}
                  />
                ))}
                </>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LikePage;
