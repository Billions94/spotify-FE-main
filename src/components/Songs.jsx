import React from "react";
import SingleSongs from "./SingleSongs";

const Songs = ({song , index, img, album}) => {
  
  console.log('-----------------------> song', song)
  return (
      <div className="row d-flex">
        <div className="col-12 col-md-12 col-lg-12">
          <SingleSongs song={song} album={album} index={index} img={img} />
        </div>
      </div>
  );
}



export default Songs;