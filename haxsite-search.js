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
    this.baseUrl = '';
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
      baseUrl: { type: String },


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

      .cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Ensure cards fill the space */
  gap: 16px; /* Space between cards */
  justify-items: center; /* Center the cards within the grid cells */
  padding: 16px;
}

@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr); /* 2 cards per row on medium screens */
  }
}

@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(4, 1fr); /* 4 cards per row on large screens */
  }
}




    `;
  }

  updated(changedProperties) {
    if (changedProperties.has("jsonUrl") && this.jsonUrl) {
      this.fetchData(this.jsonUrl);
    }
  }


  formatDate(timestamp) {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp * 1000); // Assuming timestamp is in seconds
    return date.toLocaleDateString();
  }



  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      const baseUrl = new URL('.', this.jsonUrl).href;


      // Extract metadata and site details if they exist
      const siteMetadata = data.metadata?.site || {};
      const themeMetadata = data.metadata?.theme || {};

      // Assign the extracted data to the component properties
      this.siteName = data.title || 'Untitled Site';
      this.description = data.description || 'No description available.';
      this.logo = `${baseUrl}${data.metadata?.site?.logo || ''}`;
      this.theme = themeMetadata.name || 'None';
      this.hexCode = themeMetadata.variables?.hexCode || '#000000';
      this.created = this.formatDate(siteMetadata.created);
      this.lastUpdated = this.formatDate(siteMetadata.updated);
      this.baseUrl = new URL('.', this.jsonUrl).href;

      // Items for cards (if any)
      this.items = data.items.map(item => {
        // Construct contentLink using the base URL and the slug
        const slug = item.slug ? item.slug.replace(/^\//, "") : ''; // Remove leading slash if present
        const contentLink = slug ? new URL(slug, baseUrl).href : '';

        // Construct sourceLink using the base URL and the location
        const location = item.location; // Ensure it ends with /index.html
        const sourceLink = location ? new URL(location, baseUrl).href : '';

        const imageFile = item.metadata?.files?.find(file => file.type.startsWith('image/'));
        const imageUrl = imageFile ? new URL(imageFile.url, baseUrl).href : 'https://haxtheweb.org/files/hax (1).png'; // fallback


        const readTime = item.metadata?.readtime || 0;


        return {
          ...item,
          updated: this.formatDate(item.metadata?.updated),
          imageUrl,
          contentLink, // Link to the rendered content page
          sourceLink,   // Link to the source file (index.html)
          readTime,

        };
      });

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
            .icon="${this.icon}"
            .baseUrl="${this.baseUrl}">
        </site-overview>

        <!-- Cards for each item -->
        <div class="cards">
            ${this.items.length
        ? this.items.map(
          item => html`
             <hax-card
                     .title="${item.title}"
                     .description="${item.description}"
                     .lastUpdated="${item.updated}"
                     .imageUrl="${item.imageUrl}"
                     .contentLink="${item.contentLink}"
                     .sourceLink="${item.sourceLink}"
                     .readTime = "${item.readTime}"
                     >
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