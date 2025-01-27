import PropTypes from 'prop-types';

export const analysisResultsPropTypes = {
  data: PropTypes.shape({
    callGraph: PropTypes.object.isRequired,
    metrics: PropTypes.object.isRequired
  })
};

export const functionDataPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
}); 