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
        gap: 12px;
      }

      .logo {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid #ccc;
      }

      .site-name {
        font-size: 1.5em;
        font-weight: bold;
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
        ${this.logo
                ? html`<img src="${this.logo}" alt="Site Logo" class="logo" />`
                : html`<span class="icon">${this.icon}</span>`}

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