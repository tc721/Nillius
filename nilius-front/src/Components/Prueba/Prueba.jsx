import React from 'react'
import { useState } from 'react'

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
const Prueba = () => {

  return (
    <div>
        <h1>titulo</h1>
      <button onClick={async () => {
        const res = await fetch(`${URL}/ping`)
        const data = await res.json()
        console.log(data)
      }}
      >xD</button>

    </div>
  )
}

export default Prueba
