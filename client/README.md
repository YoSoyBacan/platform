## [Brainalytica - Material React Dashboard Free](https://devias.io/products/material-react-dashboard)

## Typescript Fork

I started this project as I wanted to use this theme in my next project but TypeScript is my first concern. Customizing Material-UI and modularizing overrides can be a headache due to type issues.

At least the theme typings is done at the moment. I have no experience in managing projects/branches at all, so feel free to start contributing by giving advice on how to organize this repo :)

## Basic workflow of converting components

1. `React.Component` to `React.FC`
2. `PropTypes` to `type Props = {...}`
3. State to `useState({})` and `this.setState({ var })` to `setState(state => ({ ...state, var }))`
4. Non-state variables to `useRef(var).current`
5. `componentDidMount` and `componentWillUnmount` to

```ts
// Example for class variable "signal" and its cleanup
const signalRef = useRef(false);
useEffect(() => {
  signalRef.current = true;
  return () => {
    // componentWillUnmount
    // Other cleanups
    signalRef.current = false;
  };
}, []); // componentDidMount
```

6. material-ui's `withStyles` to hooks style `makeStyles`

If `styles.js` exists, rename to `useStyles.tsx` and wrap export with `makeStyles`.

Otherwise convert `const styles = {...}` to

```js
const useStyles = makeStyles(theme => ({...})) // Styles hooks
// Inside component
const classes = useStyles()
```

## Work done

1. `src/theme` Palette, Typography and overrides
2. `src/layouts/dashboard` for reference
3. `src/services` and `src/data` fixing reusing object properties with different types
4. `src/helpers`
