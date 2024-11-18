import React from 'react'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  return (
    <div className='flex bg-black border-0 border-black w-full h-[70px]'>
      <div className='w-[90%] border-0 border-blue-600'></div>
      <div className='w-[10%] border-0 border-red-600 flex justify-center items-center'>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
