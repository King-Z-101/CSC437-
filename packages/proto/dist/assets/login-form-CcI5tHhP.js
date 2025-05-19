import{a as m,x as h,i as l,r as u,n as p}from"./state-DYFSCure.js";var b=Object.defineProperty,i=(d,e,t,s)=>{for(var r=void 0,o=d.length-1,c;o>=0;o--)(c=d[o])&&(r=c(e,t,r)||r);return r&&b(e,t,r),r};const n=class n extends m{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return h`
      <form
        @change=${e=>this.handleChange(e)}
        @submit=${e=>this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">Login</button>
        </slot>
        ${this.error?h`<p class="error">${this.error}</p>`:""}
      </form>
    `}handleChange(e){const t=e.target,s=t==null?void 0:t.name,r=t==null?void 0:t.value,o=this.formData;switch(s){case"username":this.formData={...o,username:r};break;case"password":this.formData={...o,password:r};break}}handleSubmit(e){e.preventDefault(),this.canSubmit&&(this.error=void 0,fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200&&t.status!==201)throw new Error(t.status===401?"Invalid zookeeper credentials":"Registration/login failed");return t.json()}).then(t=>{const{token:s}=t,r=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:s,redirect:this.redirect}]});this.dispatchEvent(r)}).catch(t=>{console.error(t),this.error=t.toString()}))}};n.styles=l`
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
  `;let a=n;i([u()],a.prototype,"formData");i([p()],a.prototype,"api");i([p()],a.prototype,"redirect");i([u()],a.prototype,"error");export{a as L};
