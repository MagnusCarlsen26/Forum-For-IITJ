import React, { useState, useEffect } from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap'
import { BiDislike } from 'react-icons/bi'
import { BsHeart, BsChat } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import svg from '../../svg'
import './../../css/enter/enter.css'
import Comment from './Comment'
import axios from 'axios'
import formattedDateTime from './../../utils/formattedDateTime'
import responseUtil from './../../utils/responseUtil'
import UserAvatar from './../../utils/UserAvatar'
import LikeDislikeButton from './../../utils/LikeDislikeButton'

function FullQuestion({ data, setType }) {
  const [like, setLike] = useState({ like: -1, dislike: -1 })
  const [expandedPosts, setExpandedPosts] = useState([])
  const [pfp,setPfp] = useState('')  
  const [username,setUsername] = useState('')
  console.log(data,'anser.jsx')
  const handleReadMore = (postId) => {
    setExpandedPosts((prev) => [...prev, postId])
  }
  const [email, setEmail] = useState("")
  
  useEffect(() => {
    responseUtil(data.answer._id,data.answer.author,setEmail,setLike,setPfp,setUsername)
  }, [])

  const [comment, setComment] = useState(false)

  const onDisLike = async () => {
    try {
      await axios.post("http://localhost:5000/feed/likeDislikeUpdateUser", {
        id: data.answer._id,
        user: email,
        like: like.dislike !== 1 ? 0 : -1,
        dislike: like.dislike !== 1 ? 1 : -1,
      });

      var likes, dislikes;
      if (like.dislike === -1) {likes = parseInt(data.answer.likes, 10);dislikes = parseInt(data.answer.dislikes, 10) + 1;} 
      else if (like.dislike === 0) {likes = parseInt(data.answer.likes, 10) - 1;dislikes = parseInt(data.answer.dislikes, 10) + 1;} 
      else {likes = parseInt(data.answer.likes, 10);dislikes = parseInt(data.answer.dislikes, 10) - 1;}

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type: "answer",
        id: data.answer._id,
        likes,
        dislikes,
      });

      setLike((prev) => ({ ...prev, like: like.dislike !== 1 ? 0 : -1, dislike: like.dislike !== 1 ? 1 : -1 }));
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  };

  const onLike = async () => {
    try {
      await axios.post("http://localhost:5000/feed/likeDislikeUpdateUser", {
        id: data.answer._id,
        user: email,
        like: like.like !== 1 ? 1 : -1, 
        dislike: like.like !== 1 ? 0 : -1,
      });

      var likes, dislikes;
      if (like.like === -1) {likes = parseInt(data.answer.likes, 10) + 1;dislikes = parseInt(data.answer.dislikes, 10);}
      else if (like.like === 0) {likes = parseInt(data.answer.likes, 10) + 1;dislikes = parseInt(data.answer.dislikes, 10) - 1;} 
      else {likes = parseInt(data.answer.likes, 10) - 1;dislikes = parseInt(data.answer.dislikes, 10);}

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type: "answer",
        id: data.answer._id,
        likes,
        dislikes,
      });

      setLike((prev) => ({ ...prev, like: like.like !== 1 ? 1 : -1, dislike: like.like !== 1 ? 0 : -1 }));
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  };

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
          {!expandedPosts.includes(1) && data.answer.answer.length>300  && (<Button variant="link" className='p-0' size='sm' onClick={() => handleReadMore(1)}>Read More</Button>)}
          <div className="d-flex align-items-center mt-2 ">
            <LikeDislikeButton 
              like={like}
              noOfLikes={data.answer.likes}
              noOfDisLikes={data.answer.dislikes+0}
              onLike={onLike}
              onDisLike={onDisLike}
              type={'Comment'}
              id={data.answer._id}
              setType={setType}
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
