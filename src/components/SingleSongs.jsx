import React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import {
  getSongInformation,
  getSongImage,
  playSong,
} from "../redux/actions/index.js"

function SingleSongs({ song, index, img, album }) {

  const {favoriteSongs} = useSelector(state => state)
  const [liked, setLiked] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const [playing, setPlaying] = useState(false)

  const fetchLikes = (likedSong, method, id) => {
    likedSong.album = album
    delete likedSong?.album?.album
    delete likedSong.album?.tracks
    delete likedSong.album?.artist

    let url = "https://spotify-be-app.herokuapp.com/likes/"
    let urlDelete = `https://spotify-be-app.herokuapp.com/likes/${id}`

    if (!method) {
      fetch(url, {
        method: method || "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likedSong),
      })
        .then((response) => {
          
          return response.json()
        })
        
    } else {
      fetch(urlDelete, {
        method: "DELETE",
      }).then((res) => console.log(res, "deleted"))
    }
  }

  const fancyTimeFormat = (duration) => {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600)
    var mins = ~~((duration % 3600) / 60)
    var secs = ~~duration % 60
    var ret = ""

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "")
    ret += "" + secs
    return ret
  }

  const dispatch = useDispatch()

  useEffect(() => {
    
  }, [liked])

  useEffect(() => { 
    if (favoriteSongs.length > 0) {
      if(favoriteSongs.map(s => s.id).indexOf(song.id) !== -1){
        setLiked(true)
      } else {
        setLiked(false)
      }
    } 
  }, [favoriteSongs])

  const handlePlay = ()=> {
    if(playing === false){
      setPlaying(true)
      dispatch(getSongImage(img))
      dispatch(playSong(true))
      dispatch(getSongInformation(song))
    }
  }

  const handlePause = ()=> {
    if(playing === true){
      setPlaying(false)
      dispatch(playSong(false))
    }
  }


  return (
    <div className="col-12 d-flex flex-column mb-0 background-list"
        onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        

      <div className="d-flex">
          <div className="d-flex hash">
            { 
              isShown === false ? <span className="length-song">{index + 1}</span> 
              : playing === false ? <img  onClick={() => {
                handlePlay()}}
                onDoubleClick={()=> dispatch(playSong(false))}
               src={'../images/playbtn.png'} width='17px' height='20px'/>
              :  
              <img onDoubleClick={()=> handlePause()}
                src="https://img.icons8.com/ios-filled/50/ffffff/pause--v1.png" width='17px' height='20px'/>
            }  
          </div>

          <div className="d-flex align-items-center title">
            {" "}
            {/*double click auto play*/}
            <div>
              <img
                className="artist-pic"
                src={`https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/264x264-000000-80-0-0.jpg`}
              />
            </div>
            <div className="co title">
              <a id="a1" className="line-breaker">{song.title_short}</a>
              <br />
              <Link id="a2" to={`/artist/${song.artist?.id}`}>
              {song.explicit_lyrics === true && (
                <span className="mr-1">🅴</span>
              )}
              {song.artist.name}
            </Link>
            </div>
          </div>

          <div className="d-flex album">
            <Link id="a2" to={`/album/${song.album?.id}`}>
              {song.album?.title}
            </Link>
        </div>

        <div className="d-flex ml-auto">
          <div className="d-flex flex-row">
            {liked ? (
              <i  class="bi bi-heart-fill liked mr-5"
                  onClick={() => {
                  fetchLikes(song, "DELETE", song.id)
                  setLiked(false)}}></i>
            ) : (
              <i  class="bi bi-heart unliked mr-5"
                  onClick={() => {
                  fetchLikes(song)
                  setLiked(true)}}></i>
            )}

            <p className="views">{fancyTimeFormat(song.duration)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleSongs