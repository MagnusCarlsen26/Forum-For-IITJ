import React, { useEffect, useState } from 'react'
import Reply from './Reply'
import responseUtil from './../../utils/responseUtil'
import UserAvatar from './../../utils/UserAvatar'
import LikeDislikeButton from './../../utils/LikeDislikeButton'

function Comment({ comment, replies, setType }) {
  const [email, setEmail] = useState("")
  const [like, setLike] = useState({ like: -1, dislike: -1 })
  const [pfp,setPfp] = useState('')  
  const [username,setUsername] = useState('')

  useEffect(() => {
    responseUtil(comment._id,comment.author,setEmail,setLike,setPfp,setUsername)
  }, [])

  return (
    <div >
      <p> <UserAvatar pfp={pfp} username={username} time={comment.time}/> </p>
      <p style={{color:'#d7dadc'}}>{comment.comment}</p>
      <LikeDislikeButton 
        like={like}
        noOfLikes={comment.likes}
        noOfDisLikes={comment.dislikes}
        type={'Reply'}
        typeofRequest={'comment'}
        id={comment._id}
        setType={setType}
        email={email}
        setLike={setLike}
        currLikes={comment.likes}
        currDisLikes={comment.dislikes}
      />
      {replies.map(reply => <Reply reply={reply} />)}
    </div>
  );
}

export default Comment;
