import React from 'react'
import "./index.css"
import useUser from '../hook/UseUser'
import { NavBarDest } from './NavBarDest'
import { NavBarPhone } from './NavBarPhone'
export const NavBar = () => {
  const {isPhone} = useUser()
  return (
    !isPhone ? 
      <>
      <NavBarDest/>
      </>
      :
      <>
      <NavBarPhone/>
      </>
  )
}
