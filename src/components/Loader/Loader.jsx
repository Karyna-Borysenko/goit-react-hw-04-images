import React from 'react';
import PropTypes from 'prop-types';
import PropagateLoader from 'react-spinners/PropagateLoader';

import { LoaderWrapper } from './Loader.styled';

export const Loader = ({ loading }) => {
  return (
    <LoaderWrapper>
      <PropagateLoader loading={loading} color="#3f51b5" size={20} />
    </LoaderWrapper>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
