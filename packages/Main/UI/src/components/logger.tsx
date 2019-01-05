import React, { Component } from 'react';

const { log } = console;
interface ILoggerProps {
    title: string;
}

export function Logger(props: ILoggerProps) {
    const { title } = props;
    return (
        <div>
            {title}:<input onChange={e => log(e.target.value)} />
        </div>
    );
}
