export const render = (Component, root) => {
  if (root) {
    root.innerHTML = "";
    root.append(Component);
  }
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

export const createElement = (tag, attr, ...children) => {
  const element = document.createElement(tag);

  for (const key in attr) {
    if (key in element) element[key] = attr[key];
  }

  children.forEach((child) => {
    element.append(child);
  });
  return element;
};
