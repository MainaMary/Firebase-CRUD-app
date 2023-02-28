import React from 'react'
interface AlertProps {
    name: string;
    className?: string;
}

const Alert = (props: AlertProps) => {
    const {name, className = ''} = props
  return (
    <div className={`shadow-md  my-2  w-1/2 px-4 py-3 rounded-md flex justify-between m-auto items-center h-auto ${className}` }>
        <p>{name}</p>
        <p className='text-base'>x</p>
    </div>
  )
}

export default Alert