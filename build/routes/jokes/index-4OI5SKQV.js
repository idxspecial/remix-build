import {
  require_db
} from "/build/_shared/chunk-SMZ7NZN3.js";
import {
  Link,
  useLoaderData
} from "/build/_shared/chunk-NADHHEWK.js";
import {
  React,
  __toModule,
  init_react
} from "/build/_shared/chunk-E7VMOUYL.js";

// browser-route-module:C:\Projects\remix-jokes\app\routes\jokes\index.tsx?browser
init_react();

// app/routes/jokes/index.tsx
init_react();
var import_db = __toModule(require_db());
function JokesIndexRoute() {
  const data = useLoaderData();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "Here's a random joke:"), /* @__PURE__ */ React.createElement("p", null, data.randomJoke.content), /* @__PURE__ */ React.createElement(Link, {
    to: data.randomJoke.id
  }, '"', data.randomJoke.name, '" Permalink'));
}
export {
  JokesIndexRoute as default
};
//# sourceMappingURL=/build/routes/jokes/index-4OI5SKQV.js.map
