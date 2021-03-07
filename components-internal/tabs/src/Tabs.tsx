import { FC, ReactNode, createElement as h, useState } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Tabs.scss';

type TabItem = {
  id: string,
  label: string,
  content: ReactNode
};

export type TabsProps = StandardProps & {
  items: TabItem[]
  /** ID of item to show initially */
  initial?: string
  title?: string
};

export const Tabs: FC<TabsProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  initial = '',
  items,
  title = 'Contents',
  ...attrs
}) => {
  const classes = classBuilder('penultimate-tabs', classBlock, classModifiers, className);
  const ssr = !global.window;
  const [ selected, setSelected ] = useState(initial);
  const select = (id: string) => (e) => {
    e.preventDefault();
    setSelected(id === selected ? initial ? id : '' : id);
  };

  return (
    <div {...attrs} className={classes()}>
      <h2 className={classes('title')}>{title}</h2>
      <ul className={classes('list')} role="tablist">
        { items.map(({ id, label }, i) => (
          <li
            key={i}
            className={classes('list-item', id === selected ? 'selected' : undefined )}
            role="presentation"
            onClick={select(id)}
          >
            <a
              aria-controls={id}
              className={classes('tab')}
              href={`#${id}`}
              id={`tab_${id}`}
              role="tab"
              onClick={select(id)}
            >
              {label}
            </a>
          </li>
        )) }
      </ul>
      { items.map(({ content, id, label, ...attrs2 }, i) => (
        <div key={i} {...attrs2} className={classes('panel', ssr || id === selected ? undefined : 'hidden' )} id={id}>
          {content}
        </div>
      )) }
    </div>
  );
};

export default Tabs;