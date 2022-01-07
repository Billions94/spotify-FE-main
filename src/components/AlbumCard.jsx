import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { Col } from "react-bootstrap"

const AlbumCard = ({ song }) => {
  const navigation = useNavigate()

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="Recently-card mb-3 ml-3 p-2 "
        onClick={() => navigation(`/album/${song.id}`)}>
      <img src={song.cover_medium} className="card-img-top" />
      <div className="card-body mt-2">
          <h6 className="card-title text-white">{song.title}</h6>
        <button id="btn-with-style2"
          type="button"
          className="btn btn-success">
          ▶
        </button>
      </div>
    </Col>
  )
}

export default AlbumCard