// 🪄 Importing React and Login component
// Ye page sirf Login component ko wrap karta hai ek simple styled container me

import React from 'react'
import { Login } from '../components'

function LogIn() {
  return (
    //  Full page me thoda padding aur center alignment for clean UI
    <div className="py-8 animate-fadeIn min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
      {/*  Actual Login form component */}
      <Login />
    </div>
  )
}

export default LogIn
