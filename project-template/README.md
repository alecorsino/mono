# Template Project

Use this folder to base any project.  
 It includes:

-   Rollup for bundling
-   Jest testing and coverage
-   Tslint and Prettier for code quality
-   Typscript

# Linting and Formating code

#TS COnfig
"composite": true, only needed when bunlding directly through tsc --build wich uses project composites

#KNOWN ISSUES AND GOTCHAS

---

when using rollup and tsconfig.json if we have
"references": [{ "path": "" }] and exporting \* from main/index entry point child modules intellisense is broken

ie.

// main.ts top level script
export \* from './mymodule'

// mymodule.ts
export const SOMETHING = 'soemthing';

---

USE the below to exclude bundling third party packages unless you are creating a top level app or when you need to bulde everty8ihng to test a package in isolation.

Use Rollup external prop and 'rollup-plugin-auto-external';

to decalre your external packages use the syntax below that works well when we import submodules ie. rxjs/operators other wise it won't exclude them
external: id => /react|rxjs/.test(id),
