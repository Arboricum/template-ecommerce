import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <div 
        className='loading-block'
        style={{
            position: 'relative',
            margin: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.7',
            width: '400px',
            textAlign: 'center'
        }}
    >
      <ClipLoader color="#36d7b7" />
      <p>Caricamento in corso</p>
    </div>
  )
}
