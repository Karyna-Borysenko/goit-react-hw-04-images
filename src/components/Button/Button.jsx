import React from 'react';
import PropTypes from 'prop-types';

import { ButtonLoader } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonLoader type="button" onClick={onClick}>
      Load more
    </ButtonLoader>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
