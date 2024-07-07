import { QuickButtonTypes } from '@types';
import { AnyFunction, Snapshot } from '@utils/types';

import './style.scss';
import { useSelector } from '@selectors';

export type Props = {
  onQuickButtonClicked?: AnyFunction;
}

function QuickButtons({ onQuickButtonClicked }: Props) {
  const buttons = useSelector(({ quickButtons }) => quickButtons.quickButtons);

  const getComponentToRender = (button: Snapshot<QuickButtonTypes>) => {
    const ComponentToRender = button.component;
    return (
      <ComponentToRender
        onQuickButtonClicked={onQuickButtonClicked}
        button={button}
      />
    );
  };

  if (!buttons.length) return null;

  return (
    <div className="quick-buttons-container">
      <ul className="quick-buttons">
        {buttons.map((button, index) =>
          <li className="quick-list-button" key={`${button.label}-${index}`}>
            {getComponentToRender(button)}
          </li>
        )
        }
      </ul>
    </div>
  );
}

export default QuickButtons;
