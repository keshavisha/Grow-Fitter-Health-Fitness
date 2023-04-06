import React from 'react'
import './TitleCard.css'
const TitleCard = ({title,key}) => {
  return (
    <div className="card-p">
    <div className="mirror-effect-p">
      <div className="card-content-p">
        <p>{title}</p>
      </div>
    </div>
  </div>
  )
}

export default TitleCard