// console.log('Hola');

export function TestMe(val: string) {
    return decorate(val);
}

function decorate(val: string) {
    return `😎 ${val} 😎`;
}
