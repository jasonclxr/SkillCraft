import backgroundImage from '../imgs/background.png';

export const background = {
  position: 'fixed',
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '110vh',
  width: '110vw',
  left: '-5vw',
  top: '-5vh',
  zIndex: -1000,
  filter: 'blur(5px) invert(25%)',

};