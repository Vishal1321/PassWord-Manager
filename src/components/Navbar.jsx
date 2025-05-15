import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="bg-slate-800 text-white ">
        <div className="flex justify-between items-center px-4 py-5 h-14">
          
        <div className="logo font-bold text-white text-2xl">
            <span className='text-green-700'>&lt;</span>
            Password 
           <span className="text-green-700">Manager/&gt;</span> 
            </div>
        <ul>
            {/* <li className='flex gap-4'>
                <a className='hover:font-bold'href="#">Home</a>
                <a className='hover:font-bold'href="#">About</a>
                <a className='hover:font-bold'href="#">Contact</a>


            </li> */}
        </ul>
        <div className='flex bg-green-500 rounded px-2'>
          <img  className='w-8 invert p-1 ' src="icons/github.png" alt="github" />   <span className=' py-1 mr-2'>Github</span>

        </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
