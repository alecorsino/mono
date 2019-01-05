 # UI React Components 

 All reusable React components should be created under this project.
 We can use a base library like Kendo-UI that we can depend on.
 All compoenent should work in isolation without the need to depend on any business logic but on its own internal logic.

 Clear defined API should be described and commented out on how every propr should be used.
 
 ## Typscript React types cheatsheet
 [Cheat sheet 1](https://github.com/sw-yx/react-typescript-cheatsheet)
 [Cheat sheet 2](https://github.com/piotrwitek/react-redux-typescript-guide)  

 ## Defining a component sample:

 ```
 interface IMyComponentProps {
     /** Used to be displayed as main title**/
     title:string,

     /** Children component to be rendered**/
     content:React.ReactNode

     // 
        .. etc
     //
 }

 function MyComponent(props:IMyComponentProps){
     return (
         <div>
            <div>
                <span>{props.title}</span>
            </div>
            <div>
                {props.content}
            </div>
         </div>
     )
 }
 ```

 `NOTE: when returning a React.ReactNode from a render function wrap the result between ( ) to avoid compilations warnings`

 ## Tips
 ----

### [Fragments](https://reactjs.org/docs/fragments.html)
 Fragments let you group a list of children without adding extra nodes to the DOM when you need to return multiple elements.

 use `<> </>` or `<React.Fragment>`

# Linting and Formating code

