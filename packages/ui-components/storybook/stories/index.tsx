import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Button } from '@brainglitch/ui-components/main';

storiesOf('Button', module)
    .add('with text',
     () => <button onClick={action('clicked')}>Hello Button</button>)
    .add('Button', () => <Button titles={'😀 😎 👍 💯 Hello Label'} />);
