import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-green-400 mx-auto py-3'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>ToDO</span>
        </div>
        <ul className='flex gap-5 mx-8'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Tasks</li>
        </ul>
    </nav>
  )
}
export default Navbar