import PropTypes from 'prop-types';
import React from 'react';

export default function Preview({ value }) {
  const valueObj = JSON.parse(value)
  return (
    <>
    {value}
      <h2>{valueObj.title}</h2>
      {valueObj.md}
      
      <div>
        <a href={valueObj.link}>{valueObj.button}</a>
      </div>
    </>
  );
}

Preview.propTypes = {
  value: PropTypes.node,
};