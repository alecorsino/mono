export * from './labels/Label';
export * from './buttons/Button';

function hidden(a: string) {
    console.log(a); // No logs
    console.log(a);
    console.log(a);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
}
