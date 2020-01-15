import * as React from 'react';
import FormField from '../form-field';

interface IDateInput {
  /** Identifier for auto-completion */
  autoComplete?: string,
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
  /** Label */
  label: any,
  /** HTML name */
  name: string
};

export const DateInput: React.SFC<IDateInput> = props =>
  React.createElement(FormField, {
    autoComplete: props.autoComplete,
    className: props.className,
    disabled: props.disabled,
    error: props.error,
    hint: props.hint,
    id: props.id,
    label: props.label,
    name: props.name,
    type: 'date'
  });

DateInput.defaultProps = {
  autoComplete: null,
  className: null,
  disabled: false,
  error: null,
  hint: null,
  id: null
};

export default DateInput;