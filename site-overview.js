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
      baseUrl: { type: String }
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
    this.baseUrl = '';
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
        padding: var(--ddd-spacing-4);
        border: var(--ddd-border-sm) solid ;
        background-color: var(--ddd-theme-default-link80 );
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
        font-size: 30px;
        font-weight: bold;
        font-family: var(--ddd-font-secondary, Roboto Slab);
        color: var(--ddd-theme-default-potentialMidnight);

      }

      .site-name a {
        text-decoration: none;
        font-weight: bold;
        color: inherit;


      }

      .description {
        font-size: 20px;
        color: var(--ddd-theme-default-infoLight);
        text-align: center;
        max-width: 300px;
      }

      .theme {
        font-size: 20px;
        color: var(--ddd-theme-default-infoLight);

      }

      .dates {
        font-size: 20px;
        color: var(--ddd-theme-default-infoLight);
      }

      .icon {
        font-size: 20px;
        color: var(--icon-color, var(--ddd-theme-default-link80));
      }
    `;
  }

  render() {


    return html`
      <div class="overview-container">
    <!-- Display logo if available -->
    <img src="${this.logo}" alt="" class="logo" />

    <div class="site-name">
      <strong>Site Name</strong>: 
      <a href="${this.baseUrl}" target="_blank" rel="noopener noreferrer">${this.siteName} <simple-icon icon="info"></simple-icon></a>
    </div>

    <div class="description">
      <strong>Description</strong>: ${this.description}
    </div>

    <div class="theme">
      <strong>Theme</strong>: <span style="color: ${this.hexCode}">${this.theme}</span>
    </div>

    <div class="dates">
      <div><strong>Created</strong>: ${this.created}</div>
      <div><strong>Last Updated</strong>: ${this.lastUpdated}</div>
    </div>
  </div>
`;
  }
}

customElements.define(SiteOverview.tag, SiteOverview);
export { SiteOverview };