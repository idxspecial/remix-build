import {
  require_session
} from "/build/_shared/chunk-DZIZ6V2E.js";
import {
  require_db
} from "/build/_shared/chunk-MAUNNAXD.js";
import {
  Link,
  React,
  __toModule,
  import_react_router_dom,
  init_react,
  useLoaderData
} from "/build/_shared/chunk-AR2NH3IF.js";

// browser-route-module:C:\Projects\remix-jokes\app\routes\jokes.tsx?browser
init_react();

// app/routes/jokes.tsx
init_react();
var import_db = __toModule(require_db());
var import_session = __toModule(require_session());

// app/styles/jokes.css
var jokes_default = "/build/_assets/jokes-4NTTDZWD.css";

// app/routes/jokes.tsx
var links = () => {
  return [
    {
      rel: "stylesheet",
      href: jokes_default
    }
  ];
};
function JokesRoute() {
  const data = useLoaderData();
  return /* @__PURE__ */ React.createElement("div", {
    className: "jokes-layout"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "jokes-header"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "home-link"
  }, /* @__PURE__ */ React.createElement(Link, {
    to: "/",
    title: "Remix Jokes",
    "aria-label": "Remix Jokes"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "logo"
  }, "\u{1F92A}"), /* @__PURE__ */ React.createElement("span", {
    className: "logo-medium"
  }, "J\u{1F92A}KES"))), data.user ? /* @__PURE__ */ React.createElement("div", {
    className: "user-info"
  }, /* @__PURE__ */ React.createElement("span", null, `Hi ${data.user.username}`), /* @__PURE__ */ React.createElement("form", {
    action: "/logout",
    method: "post"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "button"
  }, "Logout"))) : /* @__PURE__ */ React.createElement(Link, {
    to: "/login"
  }, "Login"))), /* @__PURE__ */ React.createElement("main", {
    className: "jokes-main"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "jokes-list"
  }, /* @__PURE__ */ React.createElement(Link, {
    to: "."
  }, "Get a random joke"), /* @__PURE__ */ React.createElement("p", null, "Here are a few more jokes to check out:"), /* @__PURE__ */ React.createElement("ul", null, data.jokeListItems.map((joke) => /* @__PURE__ */ React.createElement("li", {
    key: joke.id
  }, /* @__PURE__ */ React.createElement(Link, {
    to: joke.id
  }, joke.name)))), /* @__PURE__ */ React.createElement(Link, {
    to: "new",
    className: "button"
  }, "Add your own")), /* @__PURE__ */ React.createElement("div", {
    className: "jokes-outlet"
  }, /* @__PURE__ */ React.createElement(import_react_router_dom.Outlet, null)))));
}
export {
  JokesRoute as default,
  links
};
//# sourceMappingURL=/build/routes/jokes-EU3UA56Q.js.map
