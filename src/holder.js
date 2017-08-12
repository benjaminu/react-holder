// vendor modules

import holderjs from 'holderjs';
import { omit, pick } from 'lodash';
import { stringify } from 'qs';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// private variables

const HOLDER_ATTR_NAMES = [
  'theme',
  'random',
  'bg',
  'fg',
  'text',
  'size',
  'font',
  'align',
  'outline',
  'lineWrap'
];

const REGEX_PERCENTAGE = /\d+(%|p)/;

const REGEX_PX = /\d+px%/;

const REGEX_NUMBER = /\d+/;

const SHOULD_UPDATE_ON_RESIZE_DEFAULT = true;

// private functions

/**
 * Turn a string with a number and a suffix into a string with a number.
 * '100px' => '100'
 * '50%' => '50'
 * @param  {string} numberString
 * @return {string}
 */
function sanitizeNumber (numberString) {
  return String(Number.parseInt(String(numberString), 10));
}

function sanitizeSizeValue (size) {
  let stringSize = size;
  if (typeof stringSize !== 'string') {
    stringSize = String(stringSize);
  }

  if (REGEX_PERCENTAGE.test(stringSize)) {
    return `${sanitizeNumber(stringSize)}p`;
  }

  if (REGEX_PX.test(stringSize)) {
    return sanitizeNumber(stringSize);
  }

  if (REGEX_NUMBER.test(stringSize)) {
    return stringSize;
  }

  console.warn(`holder-js size not valid: ${size}, defaulting to 100%`);

  return '100p';
}

function createPlaceholder (node, updateOnResize = SHOULD_UPDATE_ON_RESIZE_DEFAULT) {
  holderjs.run({
    domain: 'holder.js',
    images: node,
    object: null,
    bgnodes: null,
    stylenodes: null
  });
  if (updateOnResize === false) {
    holderjs.setResizeUpdate(node, false);
  }
}

function updatePlaceholder (node, updateOnResize = SHOULD_UPDATE_ON_RESIZE_DEFAULT) {
  holderjs.setResizeUpdate(node, Boolean(updateOnResize));
}

// exports

class Holder extends Component {
  static get propTypes () {
    return {
      width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      updateOnResize: PropTypes.bool,
      alt: PropTypes.string
    };
  }

  static get defaultProps () {
    return {
      width: '100',
      height: '100',
      updateOnResize: false,
      alt: ''
    };
  }

  componentDidMount () {
    createPlaceholder(this.placeholder, this.props.updateOnResize);
  }

  componentDidUpdate () {
    updatePlaceholder(this.placeholder, this.props.updateOnResize);
  }

  render () {
    const { width, height, alt } = this.props;
    const holderConfig = pick(this.props, HOLDER_ATTR_NAMES);
    const htmlAttrs = omit(this.props, HOLDER_ATTR_NAMES);
    const src = `holder.js/${sanitizeSizeValue(width)}x${sanitizeSizeValue(height)}?${stringify(holderConfig)}`;

    return (
      <img
        ref={(node) => { this.placeholder = node; }}
        data-src={src}
        alt={alt}
        {...htmlAttrs}
      />
    );
  }
}

export default Holder;
