import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  import_react_router_dom,
  useCatch
} from "/build/_shared/chunk-P6ZNETXL.js";
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
var meta = () => {
  const description = `Learn Remix and laugh at the same time!`;
  return {
    description,
    keywords: "Remix,jokes",
    "twitter:image": "https://remix-jokes.lol/social.png",
    "twitter:card": "summary_large_image",
    "twitter:creator": "@remix_run",
    "twitter:site": "@remix_run",
    "twitter:title": "Remix Jokes",
    "twitter:description": description
  };
};
function Document({
  children,
  title = `Remix: So great, it's funny!`
}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement(Meta, null), /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement(Links, null)), /* @__PURE__ */ React.createElement("body", null, children, /* @__PURE__ */ React.createElement(Scripts, null), true ? /* @__PURE__ */ React.createElement(LiveReload, null) : null));
}
function App() {
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement(import_react_router_dom.Outlet, null));
}
function CatchBoundary() {
  const caught = useCatch();
  return /* @__PURE__ */ React.createElement(Document, {
    title: `${caught.status} ${caught.statusText}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "error-container"
  }, /* @__PURE__ */ React.createElement("h1", null, caught.status, " ", caught.statusText)));
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement(Document, {
    title: "Uh-oh!"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "error-container"
  }, /* @__PURE__ */ React.createElement("h1", null, "App Error"), /* @__PURE__ */ React.createElement("pre", null, error.message)));
}
export {
  CatchBoundary,
  ErrorBoundary,
  App as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-ZSKO4FYP.js.map
