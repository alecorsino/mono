import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Button, Label } from '@brainglitch/ui-components/main';
// import {Label, Button} from 'UI/main';

storiesOf('Labels', module).add('Label', () => <Label text={'😀 😎 👍 💯 Hello Label'} />);
