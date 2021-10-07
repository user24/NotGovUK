import { FC, ReactNode, createElement as h } from 'react';
import { classBuilder } from '@not-govuk/component-helpers';
import { FormGroup } from '@not-govuk/form-group';
import { Input, InputProps } from '@not-govuk/input';

import '../assets/TextInput.scss';

export type TextInputProps = InputProps & {
  /** Error message */
  error?: ReactNode
  /** Hint */
  hint?: ReactNode
  /** Label */
  label: ReactNode
};

export const TextInput: FC<TextInputProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  error,
  hint,
  id: _id,
  label,
  ...attrs
}) => {
  const classModifiers = [
    error && 'error',
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-text-input', classBlock, classModifiers, className);
  const id = _id || attrs.name;
  const fieldId = `${id}-input`;
  const hintId = `${id}-hint`;

  return (
    <FormGroup
      id={id}
      fieldId={fieldId}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
    >
      <Input
        {...attrs}
        aria-describedby={hint && hintId}
        id={fieldId}
      />
    </FormGroup>
  );
};

TextInput.displayName = 'TextInput';

export default TextInput;