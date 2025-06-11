import {
  Auth,
  define,
  History,
  Switch
} from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/header_element";
//import {}

const routes = [
  {
    path: "/app/tour/:id",
    view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}></tour-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <landing-view></landing-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "zoo-header": HeaderElement,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
        super(routes, "zoo:history", "zoo:auth");
    }
  }
});