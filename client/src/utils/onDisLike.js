import axios from 'axios'

export default async function onDisLike  (id,user,type,like,setLike,currLikes,currDisLikes) {
    try {
      await axios.post("http://localhost:5000/feed/likeDislikeUpdateUser", {
        id,
        user,
        like: like.dislike !== 1 ? 0 : -1,
        dislike: like.dislike !== 1 ? 1 : -1,
      });

      var likes, dislikes;
      if (like.dislike === -1) { likes = parseInt(currLikes, 10); dislikes = parseInt(currDisLikes, 10) + 1; }
      else if (like.dislike === 0) { likes = parseInt(currLikes, 10) - 1; dislikes = parseInt(currDisLikes, 10) + 1; }
      else { likes = parseInt(currLikes, 10); dislikes = parseInt(currDisLikes, 10) - 1; }

      const response = await axios.post("http://localhost:5000/feed/likeDislikeUpdatePost", {
        type,
        id,
        likes,
        dislikes,
      });
      setLike(prev => ({ ...prev, like: like.dislike !== 1 ? 0 : -1, dislike: like.dislike !== 1 ? 1 : -1 }));
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  }