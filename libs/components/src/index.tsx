import lodash from 'lodash-es';
import React from 'react';

export function SimpleText() {
  return <p>This is a simple text {lodash.random()}</p>;
}
