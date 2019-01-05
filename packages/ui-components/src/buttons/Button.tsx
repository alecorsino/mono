import * as React from 'react';
// @ts-ignore
import style from './button.styl';

interface IButtonProps {
    /**
     * Text shown on top of button
     */
    titles: string;
    icon?: string;
}
export function Button(props: IButtonProps) {
    const { titles, icon } = props;
    return <button className={style.button}>{titles}</button>;
}
