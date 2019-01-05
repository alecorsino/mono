import * as React from 'react';

interface ILabelProps {
    text: string;
    a?: string;
}
export function Label(props: ILabelProps) {
    const { text } = props;
    const a =
        'asdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
        ' aaaaaaaaaaaaaaaaaasssssssssssssssssssdddddddddddddddddddddddddssssssa';

    // Er
    return <span style={{ color: '#BADA55' }}> {text} </span>;
}
