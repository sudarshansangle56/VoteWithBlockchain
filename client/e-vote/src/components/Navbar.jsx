import React from 'react'

function Navbar() {
  return (
    <div className='w-full bg-green-200 flex items-center justify-center'>
      <div className='flex bg-green-100 gap-10'>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Work</h1>
        <h1>Login</h1>
      </div>
    </div>
  )
}

export default Navbar
