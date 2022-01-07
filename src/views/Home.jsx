import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Loader from "../components/Loader"
import GeneralCard from "../components/GeneralCard"
import { Col } from "react-bootstrap"
import NavigationLibrary from "../components/NavigationLibrary"

const Home = () => {
  const navigate = useNavigate()

  const [songs, setSongs] = useState([])
  const [recentSongs, setRecentSongs] = useState([])
  const [seeAll, setSeeAll] = useState(false)

  const getSongs = (artist) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.data)
      })
  }

  const getRecentSongs = (artist) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
      .then((response) => response.json())
      .then((data) => {
        setRecentSongs(data.data)
      })
  }
  useEffect(() => {
    getSongs("eminem")
    getRecentSongs("metallica")
  }, [])

  return songs.length > 0 && recentSongs.length > 0 ? (
    <div className="music-container">
      <section id="navbar">
        <div class="container-fluid">
          <NavigationLibrary />
          <section id="album-cards">
            <div class="container">
              <h2>Good morning</h2>
              <div class="row py-2" id="good-mor">
                {songs.slice(0, 6).map((song, index) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-4"
                    onClick={() => navigate(`/artist/${song.artist.id}`)}>
                    <div class="card-top p-0 mb-2">
                      <div class="row no-gutters">
                        <div class="col-md-4">
                          <img
                            src={song.album.cover_medium}
                            class="img-fluid h-100 w-100"
                          />
                        </div>
                        <div class="
                                col-md-8
                                d-flex
                                justify-content-center
                                align-items-center
                              ">
                          <div class="card-body p-0 pl-1">
                            <p class="card-text">
                              <span>{song.album.title}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div class="row py-2" id="good-mor">
                {songs.slice(0, 1).map((song, index) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-4"
                    onClick={() => navigate("/liked")}>
                    <div class="card-top p-0 mb-2">
                      <div class="row no-gutters">
                        <div class="col-md-4">
                          <img
                            src={"https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"}
                            class="img-fluid h-100 w-100"
                          />
                        </div>
                        <div class="
                                col-md-8
                                d-flex
                                justify-content-center
                                align-items-center
                              ">
                          <div class="card-body p-0 pl-1">
                            <p class="card-text">
                              <span className="">Liked Songs</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div class="main-content-album2">
          <div>
            <div class="padding-content">
              <section id="second-section">
                <div class="container">
                  <div class="d-flex justify-content-between mt-5">
                    <h4 style={{ width: "bold" }}>Recently played</h4>
                    <p>
                      { seeAll === false ? <span onClick={()=> setSeeAll(true)}
                      class="text-muted seeAll"> SEE All</span>
                      : <span onClick={()=> setSeeAll(false)}
                      class="text-muted seeAll"> SEE LESS</span>
                      }
                    </p>
                  </div>
                  <div class="row py-1 d-flex" id="recently-played">
                    { recentSongs.slice(0, 6).map((song, index) => (
                      <div key={index} className="Recently-card col-lg-2 mb-3 ml-3 p-2 ">
                          <Link to={`/album/${song.album.id}`}>
                            <img src={song.album.cover_medium} className="card-img-top" />
                          </Link>
                        <div className="card-body mt-2">
                            <Link to={`/album/${song.album.id}`}>
                              <h6 className="card-title text-white">{song.album.title}</h6>
                            </Link>
                            <Link to={`/artist/${song.artist.id}`}
                              className="card-text1">
                              <span className="card-text1 text-white">{song.artist.name}</span>
                            </Link>
                            <button id="btn-with-style1" type="button"
                              className="btn btn-success">
                              ▶
                            </button>
                        </div>
                      </div>
                      ))}
                      {seeAll === false ? null 
                      : recentSongs.slice(6, 25).map((song, index) => (
                      <div key={index} className="Recently-card col-lg-2 mb-3 ml-3 p-2 ">
                          <Link to={`/album/${song.album.id}`}>
                            <img src={song.album.cover_medium} className="card-img-top" />
                          </Link>
                        <div className="card-body mt-2">
                            <Link to={`/album/${song.album.id}`}>
                              <h6 className="card-title text-white">{song.album.title}</h6>
                            </Link>
                            <Link to={`/artist/${song.artist.id}`}
                              className="card-text1">
                              <span className="card-text1 text-white">{song.artist.name}</span>
                            </Link>
                            <button id="btn-with-style1" type="button"
                              className="btn btn-success">
                              ▶
                            </button>
                        </div>
                      </div>
                      ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <Loader />
  )
}

export default Home
