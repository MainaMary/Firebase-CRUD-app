import React from 'react'

interface LabelProps {
  children:string
}
const CustomLabel = ({children}:LabelProps) => {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{children}</label>
  )
}

export default CustomLabel