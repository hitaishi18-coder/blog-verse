// 🪄 Importing React and Signup component
// Ye page bhi ek wrapper hai Signup form ke liye

import React from 'react'
import { Signup } from '../components'

function SignUp() {
  return (
    //  Same soft fade-in animation and gradient background as login
    <div className="py-8 animate-fadeIn min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-pink-50">
      {/*  Actual Signup form component */}
      <Signup />
    </div>
  )
}

export default SignUp
