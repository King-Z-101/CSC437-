import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
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

    hydrate(src: string) {
        fetch(src)
        .then(res => res.json())
        .then((json: object) => {
          if(json) {
            this.animals = json as Array<Animal>;
          }
        })
    }

    connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    // renderAnimal(animal: Animal) {
    //     return html`
    //       <zoo-animal
    //         img-src=${animal.imgSrc}
    //         titleHeader=${animal.titleHeader}
    //         name=${animal.name}
    //         diet=${animal.diet}
    //         food=${animal.food}
    //         era=${animal.era}
    //         life=${animal.life}
    //       >
    //       </zoo-animal>
    //     `;
    // }
  
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