import { Component, createElement, render, styled } from "./lib/react";
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
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 1rem;
  background: ${({ background }) => background};
  color: ${({ fontColor }) => fontColor};
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    return createElement("div", {
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

render(
  new App({
    title: "HOLA MUNDO",
  }),
  app
);
