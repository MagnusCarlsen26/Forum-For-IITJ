import React, { useState, useEffect } from 'react'
import responseUtil from './../../utils/responseUtil'
import UserAvatar from './../../utils/UserAvatar'
import LikeDislikeButton from './../../utils/LikeDislikeButton'

function Reply({ reply }) {
  const [like, setLike] = useState({ like: -1, dislike: -1 })
  const [email, setEmail] = useState('')
  const [pfp,setPfp] = useState('')
  const [username,setUsername] = useState('')
  
  useEffect(() => {
    responseUtil(reply._id,reply.author,setEmail,setLike,setPfp,setUsername)
  }, []);

  return (
    <div className='mt-3' style={{backgroundColor:'#1d1f20'}} >
      <p><UserAvatar pfp={pfp} username={username} time={reply.time}/></p>
      <p style={{color:'#d7dadc'}}> {reply.reply} </p>
      <LikeDislikeButton 
        like={like}
        noOfLikes={reply.likes}
        noOfDisLikes={reply.dislikes}
        data={reply}
        email={email}
        typeofRequest={"reply"}
        setLike={setLike}
        id={reply._id}
        currLikes={reply.likes}
        currDisLikes={reply.dislikes}
      />
    </div>
  );
}

export default Reply;
