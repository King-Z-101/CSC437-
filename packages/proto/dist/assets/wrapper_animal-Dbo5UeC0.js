import{i as m,x as u,b as y,n as r,O as $,r as g}from"./state-BLMoeIPb.js";import{r as v}from"./reset.css-DefCicqe.js";var b=Object.defineProperty,o=(l,t,s,n)=>{for(var e=void 0,a=l.length-1,h;a>=0;a--)(h=l[a])&&(e=h(t,s,e)||e);return e&&b(t,s,e),e};const p=class p extends m{render(){return u`
      <h1>${this.titleHeader}</h1>
      <ul>
        <li>Name: ${this.name}</li>
        <li>Diet Type: ${this.diet}</li>
        <li>Food: ${this.food}</li>
        <li>Era: ${this.era}</li>
        <li>Life Expectancy: ${this.life}</li>
      </ul>
      <img src="${this.imgSrc}" alt="Animal Image" />
    `}};p.styles=[v.styles,y`
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
        grid-column: auto / span 5;
        width: 100%;
        padding-bottom: 1rem;
        }    
    `];let i=p;o([r({attribute:"img-src"})],i.prototype,"imgSrc");o([r()],i.prototype,"titleHeader");o([r()],i.prototype,"name");o([r()],i.prototype,"diet");o([r()],i.prototype,"food");o([r()],i.prototype,"era");o([r()],i.prototype,"life");var _=Object.defineProperty,c=(l,t,s,n)=>{for(var e=void 0,a=l.length-1,h;a>=0;a--)(h=l[a])&&(e=h(t,s,e)||e);return e&&_(t,s,e),e};const f=class f extends m{constructor(){super(...arguments),this.animal=0,this.animals=[],this._authObserver=new $(this,"zoo:auth")}get authorization(){var t;return((t=this._user)==null?void 0:t.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}hydrate(t){const s=this.authorization?{headers:this.authorization}:{};fetch(t,s).then(n=>n.json()).then(n=>{n&&(this.animals=n)})}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{this._user=t.user,this.src&&this.hydrate(this.src)})}render(){const t=this.animals[this.animal]||{};return u`
        <zoo-animal
            img-src=${t.imgSrc}
            titleHeader=${t.titleHeader}
            name=${t.name}
            diet=${t.diet}
            food=${t.food}
            era=${t.era}
            life=${t.life}
          >
        </zoo-animal>
      `}};f.styles=[y`
            :host {
              display: contents;
            }    
    `];let d=f;c([r()],d.prototype,"src");c([r()],d.prototype,"animal");c([g()],d.prototype,"animals");export{d as A,i as a};
