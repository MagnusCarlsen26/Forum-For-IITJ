import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { FaRegCommentDots } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import svg from './../../svg'
import './../../css/enter/enter.css'
import axios from 'axios'
import Comment from './Comment'
import UserAvatar from './../../utils/UserAvatar'

function Questions({ data }) {
  const navigate = useNavigate()
  const [expandedPosts, setExpandedPosts] = useState([])
  const [likeStatus, setLikeStatus] = useState(false) 
  const [dislikeStatus, setDislikeStatus] = useState(false)
  const [pfp,setPfp] = useState('')
  const [commentMeta,setcommentMeta] = React.useState([])
  
  const handleLike = () => {
    setLikeStatus((prevStatus) => (prevStatus === false ? true : false))
  }
  const handleDisLike = () => {
    setDislikeStatus((prevStatus) => (prevStatus === false ? true : false))
  }


  useEffect( () => {
    try{
      const FetchData = async() => {
          const response =  await axios.post('http://localhost:5000/feed/commentMetaData',{answerID:data?.answer?._id || ""}) 
          setcommentMeta(response.data)
      }
      FetchData()
    }catch(err){
      console.error(err)
    }
  },[data])

  return (
    <div className="feed-page" >
      <Card style={{backgroundColor:'#1d1f20',color:'#d7dadc'}}>
        <Card.Body>
          <h4 className="questionheading" style={{ border: 'none', cursor: 'pointer' }} onClick={() => {navigate('/viewQuestion', { state: data?.question?._id });}} >
            {data?.question?.question || ''}
          </h4>
          <div className="user-info">
            <UserAvatar pfp={pfp} username={data?.question?.author || ''} time={data?.question?.time}/>
          </div>
          <hr />
          {typeof data?.answer?.author === 'undefined'? <p>No answers yet</p> :
          <>
          <p>
            <UserAvatar pfp={pfp} username={data?.answer?.author || ''} time={data?.answer?.time || ''}/>
            <br />
            {!expandedPosts.includes(1) ? data?.answer?.answer.slice(0,300) || '' : data?.answer?.answer || ''}
          </p>
          {!expandedPosts.includes(1) && data?.answer?.answer.length > 300 && (
            <Button variant="link" className="p-0" size="sm" onClick={() => setExpandedPosts((prev) => [...prev, 1])}>
              Read More
            </Button>
          )}
          <div className="d-flex align-items-center mt-2">
            <Button variant={`outline-danger${likeStatus === true ? ' active' : ''}`} size="sm" className="m-1" onClick={handleLike} >
              {likeStatus === true ? svg.LikeFilled : svg.LikeNotFilled} {data?.answer?.likes }
            </Button>
            <Button variant={`outline-secondary${dislikeStatus === true ? ' active' : ''}`} size="sm" className="m-1" onClick={handleDisLike}>
              {dislikeStatus === true ? svg.DislikeFilled : svg.DislikeNotFilled} {data?.answer?.dislikes }
            </Button>
            <Button size="sm" className="m-1" variant='outline-success'> {commentMeta.size} <FaRegCommentDots /></Button>

          </div>
          </>
}
        <br></br>
        <h6>Comments</h6>
        {commentMeta.comments?.map( x => <Comment comment={x} replies={[]} /> )}
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}

export default Questions;
