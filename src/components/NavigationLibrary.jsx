import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchResultsArray } from "../redux/actions/index";

const NavigationLibrary = () => {

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-svideo-dark"
        style={{ justifyContent: "normal" }}>
      {pathname === "/library/playlists" && (
        <>
          <div className={
              pathname === "/library/playlists"
                ? `nav-buttons-lib nav-buttons-lib-active`
                : `nav-buttons-lib`}
            onClick={() => navigate("/library/playlists")}>
            Playlist
          </div>
          <div className={
              pathname === "/library/podcast"
                ? `nav-buttons-lib nav-buttons-lib-active`
                : `nav-buttons-lib`}
            onClick={() => navigate("/library/podcast")}>
            Podcast
          </div>
          <div className={
              pathname === "/library/artiste"
                ? `nav-buttons-lib nav-buttons-lib-active`
                : `nav-buttons-lib`}
            onClick={() => navigate("/library/artiste")}>
            Artists
          </div>
          <div className={
              pathname === "/library/albums"
                ? `nav-buttons-lib nav-buttons-lib-active`
                : `nav-buttons-lib`}
            onClick={() => navigate("/library/albums")}>
            Albums
          </div>
        </>
      )}
            {pathname === "/library/albums" && (
        <>
          <div className={
              pathname === "/library/playlists"
                ? `nav-buttons-lib nav-buttons-lib-active`
                : `nav-buttons-lib`}
            onClick={() => navigate("/library/playlists")}>
            Playlist
          </div>
          <div className={
              pathname === "/library/podcast"
                ? `nav-buttons-lib nav-buttons-lib-active`
                : `nav-buttons-lib`}
            onClick={() => navigate("/library/podcast")}>
            Podcast
          </div>
          <div className={
              pathname === "/library/artiste"
                ? `nav-buttons-lib nav-buttons-lib-active`
                : `nav-buttons-lib`}
            onClick={() => navigate("/library/artiste")}>
            Artists
          </div>
          <div className={
              pathname === "/library/albums"
                ? `nav-buttons-lib nav-buttons-lib-active`
                : `nav-buttons-lib`}
            onClick={() => navigate("/library/albums")}>
            Albums
          </div>
        </>
      )}
      {pathname === '/search' &&
      <div className="search-bar-container">
        <form
          className="d-flex align-items-center"
          onSubmit={(e) => dispatch(fetchResultsArray(e, search))}
        >
          <i class="bi bi-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Artists , songs or podcast"
            onChange={(e) =>
            setSearch(e.target.value)
            }
          />
        </form>
      </div>
      }
      <Dropdown className="username-home">
        <Dropdown.Toggle
          className="dropdownMenuButton"
          variant="success"
          id="dropdown-basic">
          <img
            src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            width={28}
            height={28}
            className="mr-1"
            style={{ borderRadius: "50%" }}
          />
          <b className="mr-3 d-inline-block">Alexander</b>
        </Dropdown.Toggle>

        <Dropdown.Menu className="m-1 customDropdownMenu">
          <Dropdown.Item className="" href="#/action-1">
            Account
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Upgrade to Premium</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Private session</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default NavigationLibrary;
