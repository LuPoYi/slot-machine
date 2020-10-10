import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const memberImg = ({ classes, name, photoURL, count, handleImgOnClick }) => {
  return (
    <div className={classes.member}>
      <img
        className={classes.memberPhoto}
        key={name}
        src={photoURL}
        alt={'alt'}
        onClick={() => handleImgOnClick(name, photoURL)}></img>
      <div className={classes.memberName}>{name}</div>
      <div className={classes.memberHeart}>
        {count === 0 && (
          <div>
            <FavoriteBorderIcon />
            <FavoriteBorderIcon />
            <FavoriteBorderIcon />
          </div>
        )}
        {count === 1 && (
          <div>
            <FavoriteIcon />
            <FavoriteBorderIcon />
            <FavoriteBorderIcon />
          </div>
        )}
        {count === 2 && (
          <div>
            <FavoriteIcon />
            <FavoriteIcon />
            <FavoriteBorderIcon />
          </div>
        )}
        {count === 3 && (
          <div>
            <FavoriteIcon />
            <FavoriteIcon />
            <FavoriteIcon />
          </div>
        )}
      </div>
    </div>
  )
}

export default memberImg
