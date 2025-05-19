import{i as c,a as u,x as d,n as a,r as y}from"./state-DYFSCure.js";import{O as $}from"./mustang-Dld7dAK7.js";const b=c`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    line-height: 1.5;
  }
  img {
    max-width: 100%;
  }
`,v={styles:b};var _=Object.defineProperty,s=(n,t,e,g)=>{for(var r=void 0,o=n.length-1,l;o>=0;o--)(l=n[o])&&(r=l(t,e,r)||r);return r&&_(t,e,r),r};const f=class f extends u{render(){return d`
      <h1>${this.titleHeader}</h1>
      <ul>
        <li>Name: ${this.name}</li>
        <li>Diet Type: ${this.diet}</li>
        <li>Food: ${this.food}</li>
        <li>Era: ${this.era}</li>
        <li>Life Expectancy: ${this.life}</li>
      </ul>
      <img src="${this.imgSrc}" alt="Animal Image" />
    `}};f.styles=[v.styles,c`
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
    `];let i=f;s([a({attribute:"img-src"})],i.prototype,"imgSrc");s([a()],i.prototype,"titleHeader");s([a()],i.prototype,"name");s([a()],i.prototype,"diet");s([a()],i.prototype,"food");s([a()],i.prototype,"era");s([a()],i.prototype,"life");var x=Object.defineProperty,p=(n,t,e,g)=>{for(var r=void 0,o=n.length-1,l;o>=0;o--)(l=n[o])&&(r=l(t,e,r)||r);return r&&x(t,e,r),r};const m=class m extends u{constructor(){super(...arguments),this.animal=0,this.animals=[],this._authObserver=new $(this,"zoo:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{this._user=t.user,this.src&&this.hydrate(this.src)})}get authorization(){var t;return((t=this._user)==null?void 0:t.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}hydrate(t){fetch(t,{headers:this.authorization||{}}).then(e=>{if(!e.ok)throw new Error(`Error ${e.status}: ${e.statusText}`);return e.json()}).then(e=>{e&&(this.animals=e)}).catch(e=>{console.error("Failed to fetch animal data:",e)})}render(){var e;if(((e=this._user)==null?void 0:e.authenticated)===!1)return d`
                <div class="login-prompt">
                    <p>Please <a href="/login.html">log in as a zookeeper</a> to view animal data</p>
                </div>
            `;const t=this.animals[this.animal]||{};return d`
            <zoo-animal
                img-src=${t.imgSrc||""}
                titleHeader=${t.titleHeader||""}
                name=${t.name||""}
                diet=${t.diet||""}
                food=${t.food||""}
                era=${t.era||""}
                life=${t.life||""}
            >
            </zoo-animal>
        `}};m.styles=[c`
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
        `];let h=m;p([a()],h.prototype,"src");p([a()],h.prototype,"animal");p([y()],h.prototype,"animals");export{h as A,i as a};
