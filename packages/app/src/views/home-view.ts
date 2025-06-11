import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
  render() {
    return html`
    <header class="header_flex">
      <svg class="icon">
        <use href="icons/habitat.svg#icon-main" />
      </svg>
      <h1>Prehistoric Zoo</h1>
      <label class="light-toggle">
        <input type="checkbox" id="lightmode-toggle">
        Toggle Light Mode
      </label>  
      <zoo-header></zoo-header>     
    </header>
    <main class="page_grid">
      <h1>Visit:</h1>
      <ul>
        <li><a href="natural-habitat.html">Enclosures</a>
          <svg class="icon">
            <use href="icons/habitat.svg#icon-habitat" />
          </svg>
        </li>
        <li><a href="animal.html">Animal List</a>
          <svg class="icon">
            <use href="icons/animal.svg#icon-animal" />
          </svg>
        </li>
      </ul>
    </main>
    `;
  }

  // more to come
}