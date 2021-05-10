import { createElement } from "..";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function randomClass(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const elements = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "br",
  "article",
  "table",
  "div",
  "button",
  "article",
  "aside",
  "section",
  "main",
  "header",
];

export const styled = {};

const buildStyles = (styles, dynamicStyles, props) => {
  let style = styles.slice();

  dynamicStyles.forEach((value, index) => {
    style[index] += value(props);
  });

  return style.join("");
};

elements.forEach((tag) => {
  styled[tag] = (rawStyles, ...dynamicStyles) => (props, content) => {
    const styles = buildStyles(rawStyles, dynamicStyles, props);
    const className = randomClass(10);
    let styleSheet = document.querySelector("style");

    if (!styleSheet) {
      styleSheet = document.createElement("style");
      document.head.appendChild(styleSheet);
    }

    styleSheet.sheet.addRule(`.${className}`, `${styles}`);

    return createElement(tag, { ...props, class: className }, content);
  };
});
