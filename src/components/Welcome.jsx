import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className='text-5xl mt-24'><Link to='/expenses' >Welcome</Link> </div>
  )
}

export default Welcome;