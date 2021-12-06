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

export const gridItem = {
  backgroundColor: '#ced0d4',
  padding: '15px 0px 15px 0px',
  borderRadius: 10,
  margin: '0 10px 10px 0',
  textAlign: 'center',
  verticalAlign: 'middle',
  width: '18%',
}

export const rowItem = {
  margin: '0 0 0 0',
}

export const container = {
  padding: '0 0 0 0',
}