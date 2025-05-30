import{i as d,O as g,e as c,x as i,b as p,r as h}from"./state-BLMoeIPb.js";var v=Object.defineProperty,l=(u,e,t,b)=>{for(var r=void 0,n=u.length-1,a;n>=0;n--)(a=u[n])&&(r=a(e,t,r)||r);return r&&v(e,t,r),r};const o=class o extends d{constructor(){super(...arguments),this._authObserver=new g(this,"zoo:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:t}=e;t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return i`
            <button
            @click=${e=>{c.relay(e,"auth:message",["auth/signout"])}}
            >
            Sign Out
            </button>
        `}renderSignInButton(){return i`
            <a href="/login.html">
            Sign In…
            </a>
        `}render(){return i`
            <p> 
                Hello, ${this.userid||"traveler"}
            </p>

            ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
        `}};o.styles=p`
        :host {
            display: contents;
        }
    `;let s=o;l([h()],s.prototype,"loggedIn");l([h()],s.prototype,"userid");export{s as H};
