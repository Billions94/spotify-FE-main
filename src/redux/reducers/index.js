import { initialState } from "../store";
import {
  GET_SONG_INFO,
  GET_SONG_IMAGE,
  LATEST_SEARCHES,
  LATEST_RESULTS,
  TOGGLE_LOADER,
  LIKED_ALBUMS,
  PLAY_SONG,
  FAVORITE_SONGS
} from "../actions/";
import { ADD_TO_PLAYLIST, REMOVE_FROM_PLAYLIST } from "../actions/"

const mainReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SONG_INFO:
      return {
        ...state,
        songInformation: payload,
      };
    case GET_SONG_IMAGE:
      return {
        ...state,
        songImage: payload,
      };

    case LATEST_SEARCHES:
      const latestSearches = state.latestSearches.some(
        (artist) => artist.id === payload.id
      )
        ? state.latestSearches
        : [...state.latestSearches, payload];

      return {
        ...state,
        latestSearches,
      };
    case LATEST_RESULTS:
      return {
        ...state,
        latestResultsSearch: payload,
      };
    case TOGGLE_LOADER:
      return {
        ...state,
        loader: payload,
      };
    case LIKED_ALBUMS:
      return {
        ...state,
        likedAlbums: payload,
      };
    case PLAY_SONG:
      return {
        ...state,
        songPlaying: payload,
      }
      case FAVORITE_SONGS:
      return {
        ...state,
        favoriteSongs: payload,
      }
      case ADD_TO_PLAYLIST:
        return {
            ...state, 
            lists: payload 
        }
    case REMOVE_FROM_PLAYLIST: {
        return {
            ...state,
            list: state.list.filter((el, i) => i !== payload)
        }
    }  
    default:
      return state;
  }
};

export default mainReducer;
