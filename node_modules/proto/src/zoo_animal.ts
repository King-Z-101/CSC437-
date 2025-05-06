import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class AnimalElement extends LitElement {
    @property({ attribute: 'img-src' }) 
    imgSrc?: string;

    @property() 
    titleHeader?: string;

    @property() name?: string;
    @property() diet?: string;
    @property() food?: string;
    @property() era?: string;
    @property() life?: string;  

  override render() {
    return html`
      <h1>${this.titleHeader}</h1>
      <ul>
        <li>Name: ${this.name}</li>
        <li>Diet Type: ${this.diet}</li>
        <li>Food: ${this.food}</li>
        <li>Era: ${this.era}</li>
        <li>Life Expectancy: ${this.life}</li>
      </ul>
      <img src="${this.imgSrc}" alt="Animal Image" />
    `;
  }

  static styles = [
    reset.styles,
    css`
        :host {
          display: contents;
        }
        h1 {
            color: var(--color-accent);
            font-family: 'Orbitron', monospace, serif, sans-serif;
            font-weight: 800;
            font-style: normal;
            font-size: 2.5rem;
            margin: 0;
            padding-left: 1rem;
            grid-column: 1 / span 12;
        }
        ul {
          grid-column: 1 / span 6;
          }
        img {
        grid-column: auto / span 6;
        width: 100%;
        }    
    `];
}