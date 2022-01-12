import {
  Links,
  LiveReload,
  import_react_router_dom
} from "/build/_shared/chunk-7GV2FHWM.js";
import {
  React,
  init_react
} from "/build/_shared/chunk-GHK3HHDO.js";

// browser-route-module:C:\Projects\remix-jokes\app\root.tsx?browser
init_react();

// app/root.tsx
init_react();

// app/styles/global.css
var global_default = "/build/_assets/global-3GFAXLUR.css";

// app/styles/global-medium.css
var global_medium_default = "/build/_assets/global-medium-WVQYEYJR.css";

// app/styles/global-large.css
var global_large_default = "/build/_assets/global-large-DT6TYUW4.css";

// app/root.tsx
var links = () => {
  return [
    {
      rel: "stylesheet",
      href: global_default
    },
    {
      rel: "stylesheet",
      href: global_medium_default,
      media: "print, (min-width: 640px)"
    },
    {
      rel: "stylesheet",
      href: global_large_default,
      media: "screen and (min-width: 1024px)"
    }
  ];
};
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("title", null, "Remix: So great, it's funny!"), /* @__PURE__ */ React.createElement(Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react_router_dom.Outlet, null), true ? /* @__PURE__ */ React.createElement(LiveReload, null) : null));
}
function ErrorBoundary({ error }) {
  return /* @__PURE__ */ React.createElement(Document, {
    title: "Uh-oh!"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "error-container"
  }, /* @__PURE__ */ React.createElement("h1", null, "App Error"), /* @__PURE__ */ React.createElement("pre", null, error.message)));
}
export {
  ErrorBoundary,
  App as default,
  links
};
//# sourceMappingURL=/build/root-PH4FVOPP.js.map
