import React from 'react'
interface TProps {
    children: string
}
const Title = ({children}:TProps) => {
  return (
    <p className='text-4xl text-[#200E32] text-center font-semibold'>{children}</p>
  )
}

export default Title