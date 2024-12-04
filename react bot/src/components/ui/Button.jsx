import React from 'react'

export function Button({ children, className = '', ...props }) {

  const classes = `py-2 px-4 rounded-md ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}