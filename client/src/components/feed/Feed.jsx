import React, { useState } from 'react'
import './feed.css'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Questions from './Questions'
import Sidebar from './Sidebar'
import LoadingWave from './../../utils/LoadingWave'
  
export default function Feed() {
  const location = useLocation()
  const category = location.state
  const [email,setEmail] = useState("")
  const [questions,setQuestions] = React.useState([])
  
  const handleAskQuestionSubmit = async(e) => {
    e.preventDefault()
    const time = new Date()
    const question = e.target.elements.questionTextarea.value
    if (question === '') return
    try{
      const response = await axios.post('http://localhost:5000/feed/question',{
        question,
        author : email,
        time,
        category
      })
    }catch(err){
        console.error(err)
    }
  }
  React.useLayoutEffect( () => {
    const storedData = localStorage.getItem('email')
    if (storedData) {
      setEmail(storedData)
    }
      const FetchData = async () => {
        try {
          const response = await axios.post('http://localhost:5000/feed/viewAllQuestions', { category })
          setQuestions(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      FetchData()
  } ,[])

  if (questions.length === 0) { 
    return <LoadingWave/>
  }
  else{ 
    return (
      <div className="flex-wrapper feed-page">
        <section
          className="profile-page"
          style={{
            borderRadius: '0rem',
            width: '100%',
            height: '900px',
            backgroundColor: '#2b2f31',
            paddingBottom: '16px'
          }}
        >
          <Container className="py-5 h-100 mt-3 scrollbarfeed" style={{ overflow: 'auto' }}>
            <Row>
            <Sidebar />
              <Col xs={6}>
                {questions.map( question => <Questions data={question} /> )}
              </Col>
              <Col className='ms-5'>
                <Card style={{ position: 'fixed', width: '30%',color:'#d7dadc', backgroundColor:'#1d1f20'}}>
                  <Card.Body>
                    <Form onSubmit={(e) => handleAskQuestionSubmit(e)}>
                      <Form.Group controlId="questionTextarea">
                        <Form.Label>Your Question:</Form.Label>
                        <Form.Control as="textarea" style={{backgroundColor:'#1d1f20', color:'#d7dadc'}} rows={3} placeholder="Ask your question..." />
                      </Form.Group>
                      <Button variant="primary" type="submit" className='mt-2'>
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    )
  }
}
