import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Nav, Navbar, NavDropdown, Button, Form } from 'react-bootstrap'
import { BiPencil, BiSearch, BiDislike } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import UserAvatar from './utils/UserAvatar'
import axios from 'axios'

export default function NavBar(){
  const navigate = useNavigate()
  const onChoose = (choose) => {
    navigate('/feed', { state: choose })
}  
const [email,setEmail] = React.useState('')
const [pfp,setPfp] = React.useState('')
React.useLayoutEffect(() => {
  const storedData = localStorage.getItem('email')
  if (storedData) {
    setEmail(storedData)
  }
  const FetchData = async () => {
    try {
      var response = await axios.post("http://localhost:5000/profile/getUser",{email:storedData})
      // setUsername(response.data.username)
      setPfp(response.data.profilePicture)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  
  FetchData()
}, [])
    return ( 
        <Navbar bg="dark" variant="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary" style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
        <Container>
          <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" for="menu__toggle">
              <span></span>
            </label>
            <ul className="menu__box">
              <li><p className="menu__item" onClick={() => onChoose('academic')  } style={{cursor:'pointer'}} >Academic</p></li>
              <li><p className="menu__item" onClick={() => onChoose('non-academic')  } style={{cursor:'pointer'}} >Non Academic</p></li>
              <li><p className="menu__item" onClick={() => onChoose('co-curricular')  } style={{cursor:'pointer'}} >Co-Curricular</p></li>
              <li><a className="menu__item" href="/profile">Profile</a></li>
              
            </ul>
          </div>
          <Navbar.Brand href="/choice">IITJ Forum</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Form className="d-flex mt-auto mb-auto ms-auto">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <Button variant="outline-light" size='sm' className="me-2">
                <BiSearch />
              </Button>
            </Form>
            <Link to='/profile'>
            <UserAvatar pfp={pfp} />
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}