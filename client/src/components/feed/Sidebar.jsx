import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()
  const onChoose = (choose) => {
    navigate('/feed', { state: choose })
  }
  const style = { textDecoration: 'none', color: 'white' , cursor:'pointer'}

  
  return(
    <Col xs={12} md={2} className="d-none d-md-block">
      <div className='mt-3 p-2' style={{ backgroundColor: '', position: 'fixed' }} >

        <p style={style} onClick={() => onChoose('academic')} >Academic</p>
        <hr style={{ color: 'white' }} />

        <p style={style} onClick={() => onChoose('non-academic')} >Non Academic</p>
        <hr style={{ color: 'white' }} />

        <p style={style} onClick={() => onChoose('co-curricular')} >Co-Curricular</p>
        
      </div>
    </Col>
  ) 
    
}