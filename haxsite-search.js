import { LitElement, html, css } from "lit";
import "./hax-card.js";
import "./site-overview.js";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `haxsite-search`
 * 
 * @demo index.html
 * @element haxsite-search
 */
export class HaxsiteSearch extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "haxsite-search";
  }

  constructor() {
    super();
    this.jsonUrl = '';
    this.items = [];
    this.siteName = '';
    this.description = '';
    this.logo = '';
    this.theme = '';
    this.hexCode = '';
    this.created = '';
    this.lastUpdated = '';
    this.icon = '';
  }

  // Lit reactive properties
  static get properties() {
    return {
      jsonUrl: { type: String, attribute: "json-url" },
      items: { type: Array }, // Main array for items data
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

  // Lit scoped styles
  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
        justify-content: center;
        gap: 90px;
      }

    `;
  }

  updated(changedProperties) {
    if (changedProperties.has("jsonUrl") && this.jsonUrl) {
      this.fetchData(this.jsonUrl);
    }
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      // Extract metadata and site details if they exist
      const siteMetadata = data.metadata?.site || {};
      const themeMetadata = data.metadata?.theme || {};

      // Assign the extracted data to the component properties
      this.siteName = data.title || 'Untitled Site';
      this.description = data.description || 'No description available.';
      this.logo = data.metadata?.site?.logo || '';
      this.theme = themeMetadata.name || 'None';
      this.hexCode = themeMetadata.variables?.hexCode || '#000000';
      this.created = siteMetadata.created || 'Unknown';
      this.lastUpdated = siteMetadata.lastUpdated || 'Unknown';
      this.icon = themeMetadata.variables?.icon || 'info'; // Default icon

      // Items for cards (if any)
      this.items = data.items || [];

    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }

  // Lit render the HTML
  render() {
    return html`
        <!-- Site Overview -->
        <site-overview
            .siteName="${this.siteName}"
            .description="${this.description}"
            .logo="${this.logo}"
            .theme="${this.theme}"
            .hexCode="${this.hexCode}"
            .created="${this.created}"
            .lastUpdated="${this.lastUpdated}"
            .icon="${this.icon}">
        </site-overview>

        <!-- Cards for each item -->
        <div class="cards">
            ${this.items.length
        ? this.items.map(
          item => html`
                    <hax-card
                        .title="${item.title}"
                        .description="${item.description}"
                        .lastUpdated="${item.lastUpdated}"
                        .image="${item.image}"
                        .contentLink="${item.contentLink}"
                         .sourceLink="${item.sourceLink}">
                        </hax-card>`
        )
        : html`<p>Loading data or no items found...</p>`
      }
        </div>
    `;
  }



  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(HaxsiteSearch.tag, HaxsiteSearch);