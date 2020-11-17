import React from 'react';
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)))
}

const formatPrice = Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR'
}).format

export default function PriceInput({type, value, onChange, inputComponent}) {
  return <div>
    <h3>{type.title} - {value ? formatPrice(value / 100) : 0}</h3>
    <p>{type.description}</p>
    <input 
      type={type.name}
      value={value}
      onChange={event => onChange(createPatchFrom(event.target.value))}
      ref={inputComponent} />
  </div>
}

PriceInput.focus = function() {
  this._inputElement.focus();
}