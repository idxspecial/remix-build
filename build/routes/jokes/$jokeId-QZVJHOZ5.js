import {
  require_db
} from "/build/_shared/chunk-KEZNJLDD.js";
import {
  Link,
  import_react_router_dom,
  useLoaderData
} from "/build/_shared/chunk-7GV2FHWM.js";
import {
  React,
  __toModule,
  init_react
} from "/build/_shared/chunk-GHK3HHDO.js";

// browser-route-module:C:\Projects\remix-jokes\app\routes\jokes\$jokeId.tsx?browser
init_react();

// app/routes/jokes/$jokeId.tsx
init_react();
var import_db = __toModule(require_db());
function JokeRoute() {
  const data = useLoaderData();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "Here's your hilarious joke:"), /* @__PURE__ */ React.createElement("p", null, data.joke.content), /* @__PURE__ */ React.createElement(Link, {
    to: "."
  }, data.joke.name, " Permalink"));
}
function ErrorBoundary() {
  const { jokeId } = (0, import_react_router_dom.useParams)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "error-container"
  }, `There was an error loading joke by the id ${jokeId}. Sorry.`);
}
export {
  ErrorBoundary,
  JokeRoute as default
};
//# sourceMappingURL=/build/routes/jokes/$jokeId-QZVJHOZ5.js.map
