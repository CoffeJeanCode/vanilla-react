import { createElement, render, createStore } from "./lib/react";
import "./style.css";
import { withStore } from "./withStore";

const store = createStore({
  counter: 0,
  imageURL: "",
});

const Counter = withStore(({ store }) => {
  return createElement(
    "div",
    null,
    createElement(
      "button",
      {
        onclick: () =>
          store.setState({
            ...store.getState(),
            counter: store.getState().counter + 1,
          }),
      },
      "Increment"
    ),
    createElement(
      "button",
      {
        onclick: () =>
          store.setState({
            ...store.getState(),
            counter: store.getState().counter - 1,
          }),
      },
      "Decrement"
    ),
    createElement("h1", null, store.getState().counter)
  );
}, store);

const InputExample = () =>
  createElement(
    "div",
    null,
    createElement(
      "form",
      {
        onsubmit: (evt) => {
          evt.preventDefault();
          alert();
        },
      },
      createElement("input", {
        placeholder: "Write an url of image...",
        onchange: (evt) =>
          store.setState({ ...store.getState(), imageURL: evt.target.value }),
      }),
      createElement("button", {}, "view")
    ),
    createElement("img", { src: store.getState().imageURL, alt: "image" })
  );

const App = () => createElement("div", null, Counter(), InputExample());

const app = document.querySelector("#app");

store.suscribe(() => {
  render(App(), app);
});

render(App(), app);
