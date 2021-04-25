export const withStore = (Comp, store) => (props) => Comp({ ...props, store });
