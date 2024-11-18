import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
;

class SiteOverview extends LitElement {
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
        padding: 16px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: #f9f9f9;
      }

      .overview-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 20px;
        border: var(--ddd-border-sm) solid #883333;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 500px; /* Optional to limit the width */
        margin: 20px auto;
}

      .logo {
        
        object-fit: cover;
        max-width: 450px;
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

        <div class="description"> Description: ${this.description}</div>

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