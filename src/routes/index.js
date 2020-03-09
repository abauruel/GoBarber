import React from 'react';

import PropTypes from 'prop-types';
import Sign from '~/routes/Sign';
import Signed from '~/routes/Signed';

export default function Routes({ isSigned = false }) {
  return isSigned ? <Signed /> : <Sign />;
}

Routes.propTypes = {
  isSigned: PropTypes.bool,
};
Routes.defaultProps = {
  isSigned: false,
};
