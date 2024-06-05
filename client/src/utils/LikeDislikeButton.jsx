import svg from './../svg'
import { Button } from 'react-bootstrap'
import { BsChat } from 'react-icons/bs'
import onLike from './onLike'
import onDisLike from './onDisLike'

export default  function LikeDislikeButton ({like,noOfLikes,noOfDisLikes,type,typeofRequest,id,setType,email,setLike,currLikes,currDisLikes}) {
  console.log(currDisLikes)
  return ( 
    <>
    
      <Button
        variant={`outline-danger${like.like === 1 ? ' active' : ''}`}
        size="sm"
        className="m-1"
        onClick={() => onLike(id,email,typeofRequest,like,setLike,currLikes,currDisLikes)}
      >
        {like.like === 1 ? svg.LikeFilled : svg.LikeNotFilled} {noOfLikes}
      </Button>
      <Button 
        variant={`outline-secondary${ like.dislike === 1 ? ' active' : ''}`} 
        size="sm" 
        className="m-1" 
        onClick={() => onDisLike(id,email,typeofRequest,like,setLike,currLikes,currDisLikes)}
      >
        { like.dislike === 1 ? svg.DislikeFilled : svg.DislikeNotFilled}  {noOfDisLikes}
      </Button>
      {
        setType ?
          <Button variant="outline-primary" size="sm" className='m-1' onClick={() => setType({ type , id })}>
            <BsChat /> {type}
          </Button> 
          : ''
      }

    </>
  )
}