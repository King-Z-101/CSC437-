import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface LoginFormData {
  username?: string;
  password?: string;
}

export class LoginFormElement extends LitElement {
  @state()
  formData: LoginFormData = {};

  @property()
  api?: string;

  @property()
  redirect: string = "/";

  @state()
  error?: string;

  get canSubmit(): boolean {
    return Boolean(
      this.api && this.formData.username && this.formData.password
    );
  }

  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">Login</button>
        </slot>
        ${this.error
          ? html`<p class="error">${this.error}</p>`
          : ""}
      </form>
    `;
  }

  static styles = css`
    button {
      width: 100%;
      padding: 0.75rem;
      background: var(--color-primary, #3498db);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 1rem;
    }
    
    button:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
    
    .error {
      color: #e74c3c;
      border: 1px solid #e74c3c;
      padding: 0.5rem;
      margin-top: 1rem;
      border-radius: 4px;
      background: #fadbd8;
    }
  `;

  handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target?.name;
    const value = target?.value;
    const prevData = this.formData;

    switch (name) {
      case "username":
        this.formData = { ...prevData, username: value };
        break;
      case "password":
        this.formData = { ...prevData, password: value };
        break;
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();

    if (this.canSubmit) {
      this.error = undefined;
      
      fetch(this?.api || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.formData)
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error(
              res.status === 401
                ? "Invalid zookeeper credentials"
                : "Registration/login failed"
            );
          }
          return res.json();
        })
        .then((json: object) => {
          const { token } = json as { token: string };
          const customEvent = new CustomEvent("auth:message", {
            bubbles: true,
            composed: true,
            detail: [
              "auth/signin",
              { token, redirect: this.redirect }
            ]
          });
          this.dispatchEvent(customEvent);
        })
        .catch((error: Error) => {
          console.error(error);
          this.error = error.toString();
        });
    }
  }
}