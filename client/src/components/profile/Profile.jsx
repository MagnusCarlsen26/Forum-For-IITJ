import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { BiPencil } from 'react-icons/bi'
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Edit from './Edit'
import './profile.css'
import { useLocation } from 'react-router-dom'

export default function Profile() {
  const location = useLocation()

  const [profile, setProfile] = useState({
    username: '',
    year: '',
    program: '',
    linkedIn: '',
    instagram: '',
    gitHub: '',
    email: '',
    phone: '',
    age: '',
    rollNo: '',
    hobbies: '',
    aboutMe: '',
    profilePicture: '',
    skills: ''
  })
  const [isEdit, setIsEdit] = React.useState(0)
  const [email, setEmail] = useState("")
  React.useLayoutEffect(() => {
    const storedData = localStorage.getItem('email')
    if (storedData) {
      setEmail(storedData)
    }
    const FetchData = async () => {
      const Profile = await axios.post('http://localhost:5000/profile/getUser', { email: storedData })
      setProfile(Profile.data)
    }
    FetchData()
  }, [isEdit])
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [])

  return (
    isEdit % 2 === 1 ? <Edit email={email} setIsEdit={setIsEdit} /> :
      <div style={{ borderRadius: '0rem', width: '100%', height: '100vh', backgroundColor: '#2b2f31' }}>
        <div className="container">
          <Row>
          <Col>
          <div className="main-body" style={{ paddingTop: '85px' }}>
            <div className="row gutters-sm" >
              <div className="col-md-4 mb-3">
                <div className="card" style={{ backgroundColor: '#1d1f20', color: 'white' }}>
                  <div className="card-body p-0">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={profile.bannerPicture} style={{
                          width: '100%',
                          height: '200',
                          objectFit: 'cover',
                        }} />
                      <img
                        src={profile.profilePicture}
                        className="rounded-circle mt-2 mb-2"
                        style={{ width: "200", height: "200" }}
                        alt="Avatar"
                      />
                      <div className="mt-3">
                        <h4>{profile.username}</h4>
                        <p className="mb-1"> {profile.program} in  {profile.Branch} {profile.year} year </p>
                      </div>
                      <div className="social-icons mt-3 mb-5">
                        <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">
                          <FaLinkedin className="text-white me-3" />
                        </a>
                        <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                          <FaInstagram className="text-white me-3" />
                        </a>
                        <a href={profile.gitHub} target="_blank" rel="noopener noreferrer">
                          <FaGithub className="text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-md-8" >
                <div className="card mb-3" style={{backgroundColor:'#1d1f20'}}>
                  <div className="card-body">
                    <div className="row" style={{color:'white'}}>

                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-white-50">
                        {profile.email}
                      </div>
                    </div>
                    <hr style={{color: 'white'}}/>
                    <div className="row" style={{color:'white'}}>
                      <div className="col-sm-3">
                        <h6 className="mb-0">Phone</h6>
                      </div>
                      <div className="col-sm-9 text-white-50">
                        {profile.phone}
                      </div>
                    </div>
                    <hr style={{color: 'white'}}/>
                    <div className="row" style={{color:'white'}}>
                      <div className="col-sm-3">
                        <h6 className="mb-0">Age</h6>
                      </div>
                      <div className="col-sm-9 text-white-50">
                        {profile.age}
                      </div>
                    </div>
                    <hr style={{color: 'white'}}/>
                    <div className="row" style={{color:'white'}}>
                      <div className="col-sm-3">
                        <h6 className="mb-0">Roll number</h6>
                      </div>
                      <div className="col-sm-9 text-white-50">
                        {profile.rollNo}
                      </div>
                    </div>
                    <hr style={{color: 'white'}}/>
                    <div className="row" style={{color:'white'}}>
                      <div className="col-sm-3">
                        <h6 className="mb-0">Hobbies</h6>
                      </div>
                      <div className="col-sm-9 text-white-50">
                        {profile.hobbies}
                      </div>
                    </div>
                    <hr style={{color: 'white'}}/>
                    <div className="row" style={{color:'white'}}>
                      <div className="col-sm-3">
                        <h6 className="mb-0">Skills</h6>
                      </div>
                      <div className="col-sm-9 text-white-50">
                        {profile.skills}
                      </div>
                    </div>
                    <hr style={{color: 'white'}}/>
                    <div className="row" style={{color:'white'}}>
                      <div className="col-sm-3">
                        <h6 className="mb-0">About me</h6>
                      </div>
                      <div className="col-sm-9 text-white-50">
                        {profile.aboutMe}
                      </div>
                    </div>
                    <hr style={{color: 'white'}}/>
                    <div className="row" style={{color:'white'}}>
                      <div className="col-sm-12">
                        <a className="btn btn-info " target="__blank" >
                          <Link style={{ textDecoration: 'none', hover: 'inherit' }}>
                            {
                              email === "upadhyay.12@iitj.ac.in" ? <div onClick={() => setIsEdit(prev => prev + 1)}>
                                <span style={{ color: 'white' }}><BiPencil /> Edit profile</span>
                              </div> : <></>
                            }
                          </Link>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Col>
          </Row>
        </div>
      </div>

  )
}
