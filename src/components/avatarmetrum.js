import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const AvatarMetrum = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5';

  return (

    <img
        src={"/static/images/avatar-metrum.jpg"}
        alt={'metrum'}
        width = {140}
        height = {100}

        loading="lazy"
      />


  );
})``;

AvatarMetrum.defaultProps = {
  variant: 'primary'
};

AvatarMetrum.propTypes = {
  variant: PropTypes.oneOf(['light', 'primary'])
};
