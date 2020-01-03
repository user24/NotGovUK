import * as React from 'react';
import FormField from '../form-field';

interface IOption {
  disabled?: boolean,
  hint?: string,
  label: string,
  value: string,
  checked: string
};

interface ICheckboxes {
  /** Extra CSS classes to be applied */
  className?: string,
  /** Whether the field should be disabled */
  disabled?: boolean,
  /** Error message */
  error?: string,
  /** Hint */
  hint?: string,
  /** HTML id (If not specified then the name will be used) */
  id?: string,
  /** Whether checkboxes and radios should be displayed on a single line on wide displays (inferred from number of options if not provided)*/
  inline?: boolean,
  /** Label */
  label: any,
  /** HTML name */
  name: string,
  /** List of options to select from */
  options?: Array<IOption>,
  /** Whether checkboxes and radios should be small (inferred from number of options if not provided) */
  small?: boolean
};

export const Checkboxes: React.SFC<ICheckboxes> = props =>
  React.createElement(FormField, {
    className: props.className,
    disabled: props.disabled,
    error: props.error,
    hint: props.hint,
    id: props.id,
    inline: props.inline || false,
    label: props.label,
    multiple: true,
    name: props.name,
    options: props.options.map(e => ({
      disabled: e.disabled,
      hint: e.hint,
      label: e.label,
      value: e.value,
      selected: e.checked
    })),
    small: props.small || false,
    type: 'checkboxes'
  });

Checkboxes.defaultProps = {
  className: null,
  disabled: false,
  error: null,
  hint: null,
  id: null,
  inline: null,
  options: null,
  small: null
};

export default Checkboxes;
