import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import Loader from "../components/Loader"
import Songs from "../components/Songs"
import AlbumCard from "../components/AlbumCard"
import { playSong } from "../redux/actions"
import { useDispatch } from "react-redux"

const Artist = () => {
  const [artistInfo, setArtistInfo] = useState(null)
  const [artistTopTracks, setArtistTopTracks] = useState([])
  const [artistTopFiveAlbums, setArtistTopFiveAlbums] = useState([])
  const [seeMore, setSeeMore] = useState(false)
  const [playing, setPlaying] = useState(false)


  const params = useParams()
  const dispatch = useDispatch()

  const fetchArtistInfo = async (params) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${params}`)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setArtistInfo(data)
        await topFiveSongs()
      } else {
        console.log("error fetching artist")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const topFiveSongs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/topFive/${params.artistId}`)
      if (response.ok) {
        const data = await response.json()
        setArtistTopTracks(data)
      } else {
        console.log("error fetching top five songs")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const topFiveAlbums = async (artist) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/topFive/album/${artist}`)
      if (response.ok) {
        const data = await response.json()
        setArtistTopFiveAlbums(data.slice(0, 5))
      } else {
        console.log("error fetching top five songs")
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchArtistInfo(params.artistId)
  }, [])

  useEffect(() => {
    topFiveAlbums(artistInfo?.name)
  }, [artistInfo])

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
 

  return artistInfo ? (
    <div className="music-container">
      <section
        id="navbar"
        style={{
          backgroundImage: `url(${artistInfo.picture_xl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"}}>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark bg-svideo-dark">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse"
              id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto" />
              <div>
                <div className="dropdown d-inline-block">
                  <a className="btn nav-btn dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ color: "white" }}>
                    <img
                      src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                      width={28}
                      height={28}
                      className="mr-1"
                      style={{ borderRadius: "50%" }}/>
                    <span className="d-inline-block">Diego 'Ziba' Balack</span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div className="jumbotron jumbotron-fluid">
            <div style={{ margin: 35, marginTop: 146 }}>
              <span>
                <i className="bi bi-patch-check-fill" />
                Verified Artist
              </span>
              <span>
                <h1 className="header">{artistInfo.name}</h1>
              </span>
              <p className="lead">{artistInfo.nb_fan} Followers</p>
            </div>
          </div>
        </div>
        <div className="main-content-album">
          <div>
            <div className="buttons-row">
              <div className="padding-content">
                <div className="sticky-top play-button">
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
              </div>
              <button id="follow-button">FOLLOWING</button>
              <a
                className="btn nav-btn "
                href="#"
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
            <div className="padding-content">
              <div className="d-flex justify-content-end">
                <h1 className="title-section" style={{ width: 1035 }}>
                  Popular
                </h1>
              </div>
              <div className="row d-flex">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                  {artistTopTracks?.slice(0, 5).map((song, index) => {
                    return (
                      <Songs
                        song={song}
                        index={index}
                        album={"A"}
                        img={`https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/264x264-000000-80-0-0.jpg`}
                      />
                    )
                  })}
                  { seeMore === false ? null
                    : artistTopTracks?.slice(5, 10).map((song, index) => (
                        <Songs
                          song={song}
                          index={index + 5}
                          album={"A"}
                          img={`https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/264x264-000000-80-0-0.jpg`}
                        />
                      ))}
                </div>
              </div>
              <a href>
                { seeMore === false ? 
                  <h1 onClick={()=> setSeeMore(true)} className="see-more" style={{ marginBottom: 20 }}>
                  SEE MORE
                </h1>
                :
                <h1 onClick={()=> setSeeMore(false)} className="see-more" style={{ marginBottom: 20 }}>
                SEE LESS
              </h1>}
              </a>

              <h1 className="text-left title-section d-none d-md-none d-lg-none d-xl-block"
                  style={{ width: 487 }}>
                  Artist Pick
                </h1>
              <div className="d-none d-md-none d-lg-none d-xl-block  col-4 ">
                  <div className="d-flex">
                    <div>
                      <img
                        className="artist-pick"
                        src={artistInfo.picture_medium}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div>
                        <img
                          className="artist-small-pic"
                          src={artistInfo.picture_small}
                        />
                        <span className="artist-name ml-2">Posted by {artistInfo.name}</span>
                      </div>
                      <div style={{
                          fontSize: 14,
                          fontWeight: 400,
                          letterSpacing: "normal",
                          lineHeight: 16,
                          textTransform: "none",
                          marginTop: 5,
                        }}></div>
                    </div>
                  </div>
                </div>
              <section id="second-section">
                <div className="container-fluid p-0"
                  style={{ marginBottom: 64 }}>
                  <div className="d-flex justify-content-between mt-3">
                    <h4 style={{ width: "bold" }}>Albums</h4>
                  </div>
                  <div className="row py-1 d-flex">
                    {artistTopFiveAlbums?.map((song) => {
                      return <AlbumCard song={song} />
                    })}
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

export default Artist
