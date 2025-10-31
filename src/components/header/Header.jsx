import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: "🏠 Home", slug: "/", active: true },
    { name: "🔑 Login", slug: "/login", active: !authStatus },
    { name: "📝 Signup", slug: "/signup", active: !authStatus },
    { name: "📚 All Posts", slug: "/all-posts", active: authStatus },
    { name: "➕ Add Post", slug: "/add-posts", active: authStatus }
  ]

  return (
    <header className='py-4 shadow-md bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200'>
      <Container>
        <nav className='flex items-center justify-between'>

          {/* Left side — Logo and App Title */}
          <div className='flex items-center gap-3 hover:scale-105 duration-300 cursor-pointer'>
            {/* Entire logo + title clickable */}
            <div onClick={() => navigate('/')}>
              <Logo width='70px' />
            </div>
            <span className='font-bold text-xl text-gray-700 tracking-wide'>My Blog ✨</span>
          </div>

          {/* Right side — Navigation Links */}
          <ul className='flex items-center gap-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-5 py-2 rounded-full text-gray-700 font-medium hover:bg-blue-100 hover:shadow-md transition-all duration-300'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className='ml-2'>
                <LogoutBtn />
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header
