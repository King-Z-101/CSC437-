import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";

// Define Auth model types
interface AuthUser {
  authenticated: boolean;
  username?: string;
  token?: string;
}

interface AuthModel {
  user?: AuthUser;
}

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
    
    _authObserver = new Observer<AuthModel>(this, "zoo:auth");
    _user?: AuthUser;

    connectedCallback() {
        super.connectedCallback();
        
        this._authObserver.observe((auth: AuthModel) => {
            this._user = auth.user;
            // Re-fetch data when auth state changes
            if (this.src) this.hydrate(this.src);
        });
    }
    
    // Authorization header for authenticated requests
    get authorization() {
        return (
            this._user?.authenticated && {
                Authorization: `Bearer ${this._user.token}`
            }
        );
    }

    hydrate(src: string) {
        fetch(src, { 
            headers: this.authorization || {} 
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            return res.json();
        })
        .then((json: object) => {
            if(json) {
                this.animals = json as Array<Animal>;
            }
        })
        .catch(error => {
            console.error('Failed to fetch animal data:', error);
        });
    }

    override render() {
        if (this._user?.authenticated === false) {
            return html`
                <div class="login-prompt">
                    <p>Please <a href="/login.html">log in as a zookeeper</a> to view animal data</p>
                </div>
            `;
        }

        const a = this.animals[this.animal] || {};
        return html`
            <zoo-animal
                img-src=${a.imgSrc || ''}
                titleHeader=${a.titleHeader || ''}
                name=${a.name || ''}
                diet=${a.diet || ''}
                food=${a.food || ''}
                era=${a.era || ''}
                life=${a.life || ''}
            >
            </zoo-animal>
        `;
    }

    static styles = [
        css`
            :host {
                display: contents;
            }
            .login-prompt {
                padding: 2rem;
                text-align: center;
                background-color: rgba(255, 0, 255, 0.1);
                border-radius: 8px;
            }
            .login-prompt a {
                color: var(--color-accent, #ff00ff);
                font-weight: bold;
            }
        `
    ];
}