import React from 'react'

const AuthLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <section className="h-screen bg-gradient-to-b from-black/60 to-black/30 bg-[url('/images/bg/1.jpg')] bg-cover bg-center">
        {children}
    </section>
  )
}

export default AuthLayout