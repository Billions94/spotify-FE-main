import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import NavigationLibrary from "../components/NavigationLibrary";

const Search = () => {

  const { latestSearches, latestResultsSearch, loader } = useSelector(
    (state) => state
  );

  const navigate = useNavigate();

  return loader === false ? (
    <div className="music-container">
      <div className="w-100">
        <NavigationLibrary />
      </div>
      {latestSearches.length > 0 && (
        <div class="main-content-album2">
          <div>
            <div class="padding-content">
              <section id="second-section">
                <div class="container">
                  <div class="d-flex justify-content-between mt-5">
                    <h4 style={{ width: "bold" }}>Recent searches</h4>
                  </div>
                  <div class="row py-1 d-flex" id="recently-played">
                    {latestSearches.slice(0, 6).map((artist, index) => (
                        <div key={index} className="Recently-card col-lg-2 mb-3 ml-3 p-2 "
                        onClick={()=> navigate(`/album/${artist.id}`)}>
                          <img src={artist.picture} className="card-img-top" />
                        <div className="card-body mt-2">
                            <h6 className="card-title text-white"></h6>
                          <span className="card-text1 text-white">{artist.name}</span>
                          <button id="btn-with-style1"
                            type="button"
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
      )}
      {latestResultsSearch.length > 0 && (
        <div class="main-content-album2">
          <div>
            <div class="padding-content">
              <section id="second-section">
                <div class="container">
                  <div class="d-flex justify-content-between mt-5">
                    <h4 style={{ width: "bold" }}>
                      Results for {latestResultsSearch[0].artist.name}
                    </h4>
                  </div>
                  <div class="row py-1 d-flex" id="recently-played">
                    {latestResultsSearch.slice(0, 12).map((song, index) => (
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
                          <button id="btn-with-style1"
                            type="button"
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
      )}
      {latestResultsSearch.length < 1 && (
        <div class="main-content-album2 d-flex align-items-center justify-content-center"
          style={{ height: "calc(100% - 100px)" }}>
          <div>
            <div class="padding-content">
              <section id="second-section">
                <div class="container">Search Something</div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
}

export default Search;