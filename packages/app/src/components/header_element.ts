import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Auth, Observer, Events } from "@calpoly/mustang";

export class HeaderElement extends LitElement {
    _authObserver = new Observer<Auth.Model>(this, "zoo:auth");

    @state()
    loggedIn = false;

    @state()
    userid?: string;

    connectedCallback() {
        super.connectedCallback();

        this._authObserver.observe((auth: Auth.Model) => {
        const { user } = auth;

        if (user && user.authenticated ) {
            this.loggedIn = true;
            this.userid = user.username;
        } else {
            this.loggedIn = false;
            this.userid = undefined;
        }
        });
    }

    renderSignOutButton() {
        return html`
            <button
            @click=${(e: UIEvent) => {
                Events.relay(e, "auth:message", ["auth/signout"])
            }}
            >
            Sign Out
            </button>
        `;
    }

    renderSignInButton() {
        return html`
            <a href="/login.html">
            Sign In…
            </a>
        `;
    }

    override render() {
        return html`
            <p> 
                Hello, ${this.userid || "traveler"}
            </p>

            ${this.loggedIn ?
                this.renderSignOutButton() :
                this.renderSignInButton()
            }
        `;
    }

    static styles = css`
        :host {
            display: contents;
        }
    `;
}