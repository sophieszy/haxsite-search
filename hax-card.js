import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";



export class haxCard extends DDDSuper(I18NMixin(LitElement)) {

  constructor() {
    super();
    this.title = "Untitled";
    this.description = "No description available.";
    this.imageUrl = "";
    this.lastUpdated = "";
    this.contentLink = "";
    this.sourceLink = "";
    this.tags = [];
    this.readTime = 0;
  }

  static get properties() {
    return {
      sourceLink: { type: String },
      contentLink: { type: String },
      imageUrl: { type: String },
      title: { type: String },
      description: { type: String },
      lastUpdated: { type: String },
      tags: { type: Array },
      readTime: { type: Number },



    };
  }

  static get styles() {
    return [css`


     :host {
       font-family: var(--ddd-font-primary, Roboto);
    }
          

    .card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--ddd-boxShadow-sm);
  border: var(--ddd-border-sm);
  background-color: var(--ddd-theme-default-potential0);
  width: 400px; /* Let the height adjust based on content */
  height: 550px;
  padding: 10px;
  margin: 8px;
  overflow-y: auto;
  font-family: var(--ddd-font-primary, Roboto);
  font-weight: var(--ddd-font-weight-regular, 400);
  transition: background-color 0.3s;
  background-color: var(--ddd-theme-default-errorLight);
  text-decoration: none;
}


    .card img {
    display: block;
    width: 350px;
    height: auto;
    max-height: 320px;
    }

    .card:hover{
        background-color: var(--ddd-theme-default-navy40);
    
    }


    .title {
  font-family: var(--ddd-font-secondary, Roboto Slab);
  font-weight: var(--ddd-font-weight-bold, 700);
  font-size: 32px; 
  margin: var(--ddd-spacing-4);
  text-decoration: none;
  color: var(--ddd-theme-default-link);
}

.last-updated
{
  margin:var(--ddd-spacing-2);
  color: var(--ddd-theme-default-slateGray);
}

.description {
  margin: var(-ddd-spacing-2);
  color: var(--ddd-theme-default-slateGray);
}


.read-time {
  margin:var(--ddd-spacing-2);
  color: var(--ddd-theme-default-slateGray);
}

a {
  text-decoration: none;
}

.link {
 margin: var(--ddd-spacing-2);
}

    `];
  }

  render() {


    return html`


<div class="card">
  <a
    class="card-link"
    href="${this.contentLink}"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src="${this.imageUrl}" alt="" />
    <div class="title">${this.title}</div>

    <div class="last-updated">
      <strong>Last Updated</strong>: ${this.lastUpdated}
    </div>

    <div class="description">
      <strong>Description</strong>: ${this.description}
    </div>

    <div class="read-time">
      <strong>Read Time</strong>: ${this.readTime > 0 ? this.readTime + ' min' : 'N/A'}
    </div>
  </a>
  <a
        class="link"
         href="${this.sourceLink}"
         target="_blank"
         rel="noopener noreferrer"
        > Click here to open source file!</a
              >

</div>

            
              
        `;
  }




}
customElements.define("hax-card", haxCard);