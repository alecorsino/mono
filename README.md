# Front end Root Monorepo

You will need lerna to be installed globally in your local environment  
`` npm install -g lerna``  

Alternativley you can just run without installing it but you have to prefix ALWAYS with `npx` your commands:  
 `npx lerna bootstrap`

## Initializing your dev Environment  
---

Installing all dependecies in all the modules including symlinkend local modules: [Read Lerna bootsrap](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme)

```
lerna bootstrap 
```

Remove the node_modules directory from all projects: [Read Lerna clean](https://github.com/lerna/lerna/tree/master/commands/clean#readme)
```
lerna clean
```

### Running script in all projects: 
Run an npm script in each package that contains that script [Read Lerna run](https://github.com/lerna/lerna/tree/master/commands/run#readme)  

```
lerna run <script> -- [..args]
```
*i.e :>*  `lerna run test`

Tools
=======


> ### Lerna  
Monorepo Manager

https://github.com/lerna/lerna

> ### Lerna Update  
Add/Update dependencies to some or all projects

https://www.npmjs.com/package/lerna-update-wizard

### Hoisitng npm packages

Lerna hoist package to root level so it can be installed once and shared across multiple project.  
We might found sometimes [issues](https://yarnpkg.com/blog/2018/02/15/nohoist/) with certain packages.

To solve the above add uinder ROOT package.json "nohoist" section i.e. "nohoist": ["**/rxjs"]

### QA
-----
Pre commit hooks with Husky  
Pre commit Code formatting and linting with lint-staged

Linters
- tslint
- Prettier

Project Organization
=======
> ### TypeScript: Project references
[Read official page](https://www.typescriptlang.org/docs/handbook/project-references.html)

