import {
  Link
} from "/build/_shared/chunk-W2XPKET5.js";
import {
  React,
  init_react
} from "/build/_shared/chunk-E7VMOUYL.js";

// browser-route-module:C:\Projects\remix-jokes\app\routes\index.tsx?browser
init_react();

// app/routes/index.tsx
init_react();

// app/styles/index.css
var styles_default = "/build/_assets/index-EW7T2DXK.css";

// app/routes/index.tsx
var links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles_default
    }
  ];
};
function Index() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "content"
  }, /* @__PURE__ */ React.createElement("h1", null, "Remix ", /* @__PURE__ */ React.createElement("span", null, "Jokes!")), /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Link, {
    to: "jokes"
  }, "Read Jokes"))))));
}
export {
  Index as default,
  links
};
//# sourceMappingURL=/build/routes/index-VI6GFSSL.js.map
