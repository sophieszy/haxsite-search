import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/simple-icon/simple-icon.js';

;

class SiteOverview extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "site-overview";
  }

  static get properties() {
    return {
      siteName: { type: String },
      description: { type: String },
      logo: { type: String },
      theme: { type: String },
      hexCode: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      icon: { type: String },
    };
  }

  constructor() {
    super();
    this.siteName = '';
    this.description = '';
    this.logo = '';
    this.theme = '';
    this.hexCode = '';
    this.created = '';
    this.lastUpdated = '';
    this.icon = '';
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--ddd-spacing-2);;
        border: 1px solid var(--ddd-theme-default-limestoneLight);
      }

      .overview-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: var(--ddd-spacing-4);;
        border: var(--ddd-border-sm) solid ;
        background-color: var(--ddd-theme-default-errorLight);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px; 
        max-height: 650px auto;
        margin: 20px auto;
}

      .logo {
        
        object-fit: cover;
        max-width: 350px;
        height: auto;
        margin: 10px;
      }

      .site-name {
        font-size: 1.5em;
        font-weight: bold;
        font: Roboto Slab (ddd-font-secondary) [--ddd-font-secondary]
      }

      .description {
        font-size: 1em;
        color: #555;
        text-align: center;
        max-width: 300px;
      }

      .theme {
        font-size: 0.9em;
        color: #777;
      }

      .dates {
        font-size: 0.8em;
        color: #999;
      }

      .icon {
        font-size: 2em;
        color: var(--icon-color, #007bff);
      }
    `;
  }

  render() {


    return html`
      <div class="overview-container">
        <!-- Display logo if available -->

       <img src="${this.logo}" alt="" class="logo" />
       


        <div class="site-name">Site Name: ${this.siteName}</div>
        

        <div class="description"> Description: ${this.description} <simple-icon icon="info"></simple-icon>
        </div>

        <div class="theme">
          Theme: <span style="color: ${this.hexCode}">${this.theme}</span>
        </div>

        <div class="dates">
          <div>Created: ${this.created}</div>
          <div>Last Updated: ${this.lastUpdated}</div>
        </div>
      </div>
    `;
  }
}

customElements.define(SiteOverview.tag, SiteOverview);
export { SiteOverview };