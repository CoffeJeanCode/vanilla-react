export const render = (element, container) => {
  if (typeof element === "string" || element instanceof Element)
    return container.append(element);

  let childrenElement = element.build();

  function reRender(newChild) {
    container.replaceChild(newChild, childrenElement);
    childrenElement = newChild;
  }

  element.update = reRender;

  childrenElement = element.build();

  container.append(childrenElement);
  element.componentDidMount(childrenElement);
};

export const createStore = (intitalState) => {
  let state = intitalState;
  let updater = () => {};

  const getState = () => Object.freeze(state);

  const setState = (newState) => {
    state = newState;
    updater();
  };
  const suscribe = (listener) => {
    updater = listener;
  };

  return { getState, setState, suscribe };
};

const setEvents = (element, event, callback) =>
  element.addEventListener(event, callback);

const renderChildren = (children, container) =>
  Array.isArray(children)
    ? children.forEach((child) => render(child, container))
    : render(children, container);

const setProperty = (prop, value, element) => {
  if (prop.startsWith("on")) {
    const event = prop.replace("on", "").toLowerCase();
    return setEvents(element, event, value);
  }
  if (prop === "children") return renderChildren(value, element);
  const attribute = value;
  return element.setAttribute(prop, attribute);
};

export const createElement = (tag, props, content) => {
  const element = document.createElement(tag);
  if (content) element.textContent = content;
  if (props)
    Object.keys(props).forEach((prop) =>
      setProperty(prop, props[prop], element)
    );
  return element;
};

export class Component {
  constructor(props = {}, state = {}) {
    this.props = props;
    this.state = state;
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.#updater();
  }

  update() {}
  #updater() {
    this.update(this.render());
  }

  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {}

  build() {
    return this.render();
  }
}
