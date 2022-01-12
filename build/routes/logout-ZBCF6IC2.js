import {
  import_server_runtime
} from "/build/_shared/chunk-VNW7NWUY.js";
import {
  require_session
} from "/build/_shared/chunk-6NFJ62AG.js";
import {
  __toModule,
  init_react
} from "/build/_shared/chunk-GHK3HHDO.js";

// browser-route-module:C:\Projects\remix-jokes\app\routes\logout.tsx?browser
init_react();

// app/routes/logout.tsx
init_react();
var import_session = __toModule(require_session());
var action = async ({
  request
}) => {
  return (0, import_session.logout)(request);
};
var loader = async () => {
  return (0, import_server_runtime.redirect)("/");
};
export {
  action,
  loader
};
//# sourceMappingURL=/build/routes/logout-ZBCF6IC2.js.map
