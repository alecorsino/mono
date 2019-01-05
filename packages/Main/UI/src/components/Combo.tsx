import { Button, Label } from '@brainglitch/ui-components';
import React, { Component } from 'react';

interface IComboProps {
    title?: string;
}
export function Combo(props: IComboProps) {
    return (
        <div>
            <Label text={'Hola'} />
            <Button titles={'A Buton'} />
        </div>
    );
}
