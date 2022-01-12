import {
  require_db
} from "/build/_shared/chunk-MAUNNAXD.js";
import {
  Link,
  React,
  __toModule,
  init_react,
  useLoaderData
} from "/build/_shared/chunk-AR2NH3IF.js";

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
export {
  JokeRoute as default
};
//# sourceMappingURL=/build/routes/jokes/$jokeId-OC3ZDCBB.js.map
