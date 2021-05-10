import { Component, createElement, render } from "./lib/react";
import { styled } from "./lib/react/styled-components";
import "./style.css";

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return createElement(this.props.type, {}, String(this.props.text));
  }
}

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  background: ${({ background }) => background};
  color: ${({ fontColor }) => fontColor};
`;

const CounterWrapper = styled.div`
  margin: 1rem 0;
`;

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    return CounterWrapper({
      children: [
        new Title({
          type: "h2",
          text: this.state.counter,
        }),
        Button(
          {
            background: "deeppink",
            fontColor: "white",
            onClick: () => {
              this.setState({
                counter: this.state.counter + 1,
              });
            },
          },
          "Increment"
        ),
        Button(
          {
            background: "deepskyblue",
            fontColor: "white",
            onClick: () => {
              this.setState({
                counter: this.state.counter - 1,
              });
            },
          },
          "Decrement"
        ),
      ],
    });
  }
}

class FormExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:
        "https://images.unsplash.com/photo-1611095966422-50a79dd5313b?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
    };
  }
  render() {
    return createElement("div", {
      children: [
        createElement("form", {
          onSubmit: (evt) => {
            evt.preventDefault();
          },
          children: [
            createElement("input", {
              value: this.state.text,
              onChange: (evt) => this.setState({ text: evt.target.value }),
            }),
          ],
        }),
        createElement("img", { src: this.state.text, alt: this.state.text }),
      ],
    });
  }
}
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return createElement("div", {
      children: [new Counter(), new FormExample()],
    });
  }
}

render(
  new App({
    title: "HOLA MUNDO",
  }),
  app
);
