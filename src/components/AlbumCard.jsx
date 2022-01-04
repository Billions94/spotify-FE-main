import React from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap"

const AlbumCard = ({ song }) => {
  const navigation = useNavigate();

  return (
    <Col xs={12} sm={6} md={4} lg={3}
      onClick={() => navigation("/album/" + song.id)}>
      <div className="card card-album-artistpage">
        <img src={song.cover_medium} className="card-img-top" alt="img-fluid" />

        <h5 className="card-title">{song.title}</h5>
      </div>
    </Col>
  );
}

export default AlbumCard;