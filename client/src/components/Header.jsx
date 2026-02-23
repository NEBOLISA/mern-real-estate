import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { GiSpookyHouse } from 'react-icons/gi'
import { useUser } from '../hooks/useUser'
function Header() {
  const { data: userData } = useUser()
  const { user } = userData || {}
 
  return (
    <header className='bg-slate-200 shadow-md '>
      <div className='flex justify-between mx-auto items-center max-w-5xl p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <GiSpookyHouse className='text-slate-600 text-2xl mr-1' />
            <span className='text-slate-500 font-medium'>Omalicha</span>
            <span> Estate</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center gap-2'>
          <input
            type='text'
            placeholder='Search...'
            className='focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li
              className='hidden  relative w-fit cursor-pointer 
           after:absolute after:left-0 after:-bottom-1 
           after:h-0.5 after:w-0 
           after:bg-slate-600 
           after:transition-all after:duration-500 
           hover:after:w-full sm:inline'
            >
              Home
            </li>
          </Link>
          <Link to='about'>
            <li
              className='hidden  relative w-fit cursor-pointer 
           after:absolute after:left-0 after:-bottom-1 
           after:h-0.5 after:w-0 
           after:bg-slate-600 
           after:transition-all after:duration-500 
           hover:after:w-full sm:inline'
            >
              About
            </li>
          </Link>
          {!user ? (
            <Link to='sign-in'>
              <li
                className='  relative w-fit cursor-pointer 
           after:absolute after:left-0 after:-bottom-1 
           after:h-0.5 after:w-0 
           after:bg-slate-600 
           after:transition-all after:duration-500 
           hover:after:w-full '
              >
                Sign in
              </li>
            </Link>
          ) : (
              <Link to='/profile'>
            <img
              src={
                user.avatar ||
                'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg'
              }
              alt={user.name}
              className='w-6 h-6 rounded-full object-cover'
                />
                </Link>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
