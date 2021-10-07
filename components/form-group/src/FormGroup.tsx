import { FC, Fragment, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { ErrorMessage } from '@not-govuk/error-message';
import { FieldSet, FieldSetProps } from '@not-govuk/fieldset';
import { Hint } from '@not-govuk/hint';
import { Label } from '@not-govuk/label';

import '../assets/FormGroup.scss';

export type FormGroupProps = StandardProps & Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'label'> & {
  error?: ReactNode
  fieldId?: string
  hint?: ReactNode
  hintId?: string
  id: string
  label: ReactNode
};

export const FormGroup: FC<FormGroupProps> = ({
  children: _children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  error,
  fieldId,
  hint,
  hintId: _hintId,
  id,
  label,
  ...attrs
}) => {
  const classModifiers = [
    error && 'error',
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-form-group', classBlock, classModifiers, className);
  const hintId = _hintId || `${id}-hint`;
  const children = (
    <Fragment>
      { !hint ? null : <Hint id={hintId}>{hint}</Hint> }
      { !error ? null : <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
      {_children}
    </Fragment>
  );

  return (
    <div id={id} {...attrs} className={classes()}>
      { fieldId ? (
          <Fragment>
            <Label htmlFor={fieldId}>{label}</Label>
            {children}
          </Fragment>
        ) : (
          <FieldSet aria-describedby={hintId} legend={label}>
            {children}
          </FieldSet>
      ) }
    </div>
  );
};

FormGroup.displayName = 'FormGroup';

export default FormGroup;