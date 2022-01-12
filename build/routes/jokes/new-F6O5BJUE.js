import {
  require_db
} from "/build/_shared/chunk-SMZ7NZN3.js";
import {
  React,
  __toModule,
  init_react
} from "/build/_shared/chunk-E7VMOUYL.js";

// browser-route-module:C:\Projects\remix-jokes\app\routes\jokes\new.tsx?browser
init_react();

// app/routes/jokes/new.tsx
init_react();
var import_db = __toModule(require_db());
function NewJokeRoute() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "Add your own hilarious joke"), /* @__PURE__ */ React.createElement("form", {
    method: "post"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", null, "Name: ", /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "name"
  }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", null, "Content: ", /* @__PURE__ */ React.createElement("textarea", {
    name: "content"
  }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "button"
  }, "Add"))));
}
export {
  NewJokeRoute as default
};
//# sourceMappingURL=/build/routes/jokes/new-F6O5BJUE.js.map
