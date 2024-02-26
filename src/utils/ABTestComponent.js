import React from 'react';

const ABTestComponent = ({ variant }) => {
  return (
    <div>
      {variant === 'A' && <p>Variante A</p>}
      {variant === 'B' && <p>Variante B</p>}
    </div>
  );
};

export default ABTestComponent;
