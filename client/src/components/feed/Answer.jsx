import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import './../../css/enter/enter.css'
import Comment from './Comment'
import responseUtil from './../../utils/responseUtil'
import UserAvatar from './../../utils/UserAvatar'
import LikeDislikeButton from './../../utils/LikeDislikeButton'

function FullQuestion({ data, setType }) {

  const [like, setLike] = useState({ like: -1, dislike: -1 })
  const [expandedPosts, setExpandedPosts] = useState([])
  const [pfp,setPfp] = useState('')  
  const [username,setUsername] = useState('')
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState(false)
  
  useEffect(() => {
    responseUtil(data.answer._id,data.answer.author,setEmail,setLike,setPfp,setUsername)
  }, [])

  return (
    <>
    
      <Card style={{backgroundColor:'#1d1f20'}}>
        <Card.Body >
          <p className='text-white-50'>
            <UserAvatar pfp={pfp} username={username} time={data.answer.time}/>
            <br />
            <br />
            <span style={{color:'#d7dadc'}} >{!expandedPosts.includes(1) ? data.answer.answer.slice(0,300) : data.answer.answer}</span>
          </p>
          {!expandedPosts.includes(1) && data.answer.answer.length>300  && (<Button variant="link" className='p-0' size='sm' onClick={() => {setExpandedPosts((prev) => [...prev, 1])}}>Read More</Button>)}
          <div className="d-flex align-items-center mt-2 ">
            <LikeDislikeButton 
              like={like}
              noOfLikes={data.answer.likes}
              noOfDisLikes={data.answer.dislikes+0}
              type={'Comment'}
              typeofRequest={'answer'}
              id={data.answer._id}
              email={email}
              setType={setType}
              setLike={setLike}
              currLikes={data.answer.likes}
              currDisLikes={data.answer.dislikes}
              />
          </div>
          <br />
          {data.comments.map(comment => <Comment comment={comment.comment} replies={comment.replies} setType={setType} />)}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default FullQuestion;
