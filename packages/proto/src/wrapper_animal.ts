import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";
// import reset from "./styles/reset.css.ts";

interface Animal {
    imgSrc: string;
    titleHeader: string;
    name: string;
    diet: string;
    food: string;
    era: string;
    life: string;
}


export class AnimalWrapperElement extends LitElement {
    @property() src?: string;

    @property() animal: number = 0;

    @state()
    animals: Array<Animal> = [];

    _authObserver = new Observer<Auth.Model>(this, "zoo:auth");
    _user?: Auth.User;
    

    get authorization() {
        return (
            this._user?.authenticated && {
                Authorization:
                    `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
            }
        );
    }

    hydrate(src: string) {
        const options: RequestInit = this.authorization ? { headers: this.authorization } : {};
        fetch(src, options)
        .then(res => res.json())
        .then((json: object) => {
          if(json) {
            this.animals = json as Array<Animal>;
          }
        })
    }

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe((auth: Auth.Model) => {
            this._user = auth.user;
            if (this.src) this.hydrate(this.src);
        });

    }

    override render() {
      const a = this.animals[this.animal] || {};
      return html`
        <zoo-animal
            img-src=${a.imgSrc}
            titleHeader=${a.titleHeader}
            name=${a.name}
            diet=${a.diet}
            food=${a.food}
            era=${a.era}
            life=${a.life}
          >
        </zoo-animal>
      `;
    }

    static styles = [
        css`
            :host {
              display: contents;
            }    
    `];
}