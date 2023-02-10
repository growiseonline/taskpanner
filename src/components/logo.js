import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5';

  return (

    <img
        src={"/static/images/LOGO-METRUM-BRANCO-SVG.svg"}
        alt={'metrum'}
        width = {140}
        height = {100}

        loading="lazy"
      />


  );
})``;

Logo.defaultProps = {
  variant: 'primary'
};

Logo.propTypes = {
  variant: PropTypes.oneOf(['light', 'primary'])
};
