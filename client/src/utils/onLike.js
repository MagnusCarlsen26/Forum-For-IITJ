import axios from 'axios'

export default async function onLike  (id,user,type,like,setLike,currLikes,currDisLikes) {
    try {
      await axios.post("http://localhost:5000/feed/likeDislikeUpdateUser", {
        id,
        user,
        like: like.like !== 1 ? 1 : -1,
        dislike: like.like !== 1 ? 0 : -1,
      });

      var likes, dislikes;
      if (like.like === -1) { likes = parseInt(currLikes, 10) + 1; dislikes = parseInt(currDisLikes, 10); }
      else if (like.like === 0) { likes = parseInt(currLikes, 10) + 1; dislikes = parseInt(currDisLikes, 10) - 1; }
      else { likes = parseInt(currLikes, 10) - 1; dislikes = parseInt(currDisLikes, 10); }

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type,
        id,
        likes,
        dislikes,
      });

      setLike(prev => ({ ...prev, like: like.like !== 1 ? 1 : -1, dislike: like.like !== 1 ? 0 : -1 }));
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  }