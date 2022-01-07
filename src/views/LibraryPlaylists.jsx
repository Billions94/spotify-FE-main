import React from "react"
import NavigationLibrary from "../components/NavigationLibrary"
import Playlist from "../svg/Playlist.svg"
import PlaceHolder from "../components/PlaceHolder"

const LibraryPlaylist = () => {
  return (
    <div className="music-container">
      <section id="navbar">
        <div className="container-fluid">
          <NavigationLibrary />
          <div>
            <div className="padding-content">
              <section id="second-section">
                <div className="container-fluid p-0"
                  style={{ marginBottom: 64 }}>
                  <div className="d-flex">
                    <h1 className="text-light">Playlist</h1>
                  </div>

                  <div id='playlistCard' className="d-flex mb-4">
                    <div className="card card-liked"
                      style={{ width: "30rem", height: "20rem" }}>
                      <div className="card-body pl-4 liked-song d-flex">
                        <p className="card-text text-left pt-6">
                          WizKid True Love (feat. Tay Iwar & Projexx)•Lou Bega
                          Mambo No. 5 (a Little Bit of...)•Leona Lewis I See You
                          (Theme from Avatar)•Kanye West Hurricane.Kanye West...
                        </p>
                        <div>
                          <h1 id="likedh1" className="text-left pt-3 ">
                            <strong>Liked Songs</strong>
                          </h1>
                          <h6 className="text-left">1200 liked songs</h6>
                        </div>
                        <button
                          id="btn-with-style"
                          type="button"
                          className="btn btn-success likedbtn">
                          ▶
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row py-1 d-flex"></div>
                </div>
              </section>
              {
                <PlaceHolder
                  svg={Playlist}
                  title={"Create your first playlist"}
                  height={"80vh"}
                  description={"It's easy, we'll help you."}
                  button={"CREATE PLAYLIST"}
                />
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LibraryPlaylist
