import React from "react"
import AlbumTopInfo from "../components/AlbumTopInfo"
import Songs from "../components/Songs"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { getLikedAlbums } from "../redux/actions/index"
import NavigationLibrary from "../components/NavigationLibrary"
import { playSong } from "../redux/actions"


function Album() {
  const params = useParams().albumId
  const { likedAlbums } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [albumSongs, setAlbumSongs] = useState([])
  const [artistInfo, setArtistInfo] = useState({})
  const [albumInfo, setAlbumInfo] = useState(null)
  const [liked, setLiked] = useState(false)
  const [playing, setPlaying] = useState(false)

  const fetchAlbumSongs = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/${params}`
      )
      if (response.ok) {
        const data = await response.json()
        setAlbumInfo(data)
        setArtistInfo(data.artist)
        setAlbumSongs(data.tracks.data)
      } else {
        console.log("error")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addAlbumToFavourite = async (album) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/albums`, {
        method: "POST",
        body: JSON.stringify(album),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAlbumSongs()
  }, [])

  useEffect(() => {
    dispatch(getLikedAlbums())
  }, [])

  const like = (albumInfo)=> {
    addAlbumToFavourite(albumInfo)
    setLiked(true)
  }

  const unLike = (albumInfo)=> {
    addAlbumToFavourite(albumInfo)
    setLiked(false)
  }

  function togglePlay() {
    playing === false ? play() : pause()
    };

  const play = () => {
    dispatch(playSong(true))
    setPlaying(true)
  }
  const pause = () => {
    dispatch(playSong(false))
    setPlaying(false)
  }

  return albumInfo ? (
    <div className="music-container">
      <div className="w-100">
        <div className="container-fluid p-0">
          <NavigationLibrary />
        </div>
      </div>
      <section id="navbar">
        <div className="container-fluid p-0">
          <div className="container-fluid p-0">
            <div className="jumbotron-album">
              <div className="row" id="photo-of-artist">
                <AlbumTopInfo
                  albumInfo={albumInfo}
                  artistInfo={artistInfo}
                  length={albumSongs.length}/>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content-album">
          <div>
            <div className="buttons-row">
            <div className="padding-content">
              {albumSongs.length > 0 && (
                <div className="sticky-top">
                  {/*-----------button with js---------*/}
                  {playing === false ? 
                    <button id="btn-b4-follow"
                      type="button"
                      className="btn btn-success"
                      onClick={()=> togglePlay()}>
                      <div className="button"/>
                    </button>
                    :
                    <button id="btn-b4-follow"
                    type="button"
                    className="btn btn-success"
                    onClick={()=> togglePlay()}>
                    <div className="button-paused"/>
                    </button>
                  }
                </div>
              )}
              </div>
            {liked === false ?
              <svg
                className="like-big"
                width={40}
                height={40}
                viewBox="0 0 150 150"
                fill="green"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => like(albumInfo)}>
                <path
                   d="M125.784 35.0369C113.039 22.2916 92.9859 
                   21.3682 79.1227 32.8994C79.1062 32.9135
                   77.318 34.3807 75 34.3807C72.6234 34.3807
                   70.9266 32.9416 70.8609 32.8853C57.0141 
                   21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 
                   41.583 14.0625 50.2877 14.0625 59.5478C14.0625 
                   68.808 17.6695 77.5127 24.0914 83.9228L64.3078 
                   131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203
                   135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301
                   70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297
                   127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531
                   131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695
                   75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392
                   21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127
                   48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977
                   36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367
                   36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159
                   69.0564 122.346 80.8807Z"
                  fill="#535353"
                />
              </svg> :
              <img onClick={()=> unLike(albumInfo)} className="like-big"
                src="https://img.icons8.com/material-rounded/50/26e07f/like--v1.png"
                width={40} height={40}/>
                }
              <a className="btn nav-btn"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ color: "white" }}>
                <i className="bi bi-three-dots tr-dots" />
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>

          <div className="col-12">
          <div className="song-content">
            <div className="table-header stickydiv mb-4 sticky-top">
              <div className="d-flex text-light hash">#</div>
              <div className="d-flex text-light title">
                <div className="d-flex">
                  <span className="text-light">TITLE</span>
                </div>
              </div>
              <div className="d-flex duration ml-auto">
                <div className="d-flex">
                  <img
                    src="../images/icons8-clock-32.png"
                    width={20}
                    height={20}
                    alt
                  />
                </div>
              </div>
            </div>
            {/*-------------------------------------------table 1-------------------------------------------*/}
              <>
              { albumSongs.map((song, i) => (
                  <Songs
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
      </section>
    </div>
  ) : (
    <Loader />
  )
}

export default Album
