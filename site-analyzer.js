import { LitElement, html, css } from "lit";
import "./haxsite-search.js";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

class siteAnalyzer extends DDDSuper(I18NMixin(LitElement)) {
    static get tag() {
        return "site-analyzer";
    }


    static get styles() {
        return css`
    
    :host {
  display: block;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
}

/* Main container for the site analyzer section */
.search-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px; /* Limit width for readability */
  margin: 0 auto; /* Center content horizontally */
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Style for the input field */
.search-container input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.search-container input:focus {
  border-color: #007BFF;
  outline: none;
}

/* Style for the analyze button */
.search-container button {
  padding: 12px;
  background-color: var(--ddd-theme-default-creekTeal);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.search-container button:disabled {
  background-color: var(--ddd-theme-default-limestoneGray);
  cursor: not-allowed;
}

.search-container button:hover:not(:disabled) {
  background-color: var(--ddd-theme-default-potential75
  );
}
    
    
    `}

    constructor() {
        super();
        this.url = '';
        this.isValid = false;
        this.placeholder = 'https://haxtheweb.org/site.json';

    }

    updated(changedProperties) {
        if (changedProperties.has("url")) {
            const validatedUrl = this.validateUrl(this.url);
            if (validatedUrl) {
                this.url = validatedUrl;
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        }
    }

    validateUrl(url) {
        try {
            const validated = new URL(url);
            return validated.href; // Return the valid URL string
        } catch (e) {
            console.error("Invalid URL provided:", e);
            return null; // Return null if invalid
        }
    }

    // Lit reactive properties
    static get properties() {
        return {
            url: { type: String },
            isValid: { type: Boolean, reflect: true },
            placeholder: { type: String }
        };

    }


    render() {
        return html`


        <div class = "search-container">
            <input 
            class = "search-input"
             value="${this.url}"
             placeholder="${this.placeholder}"
             @input="${this.updateUrl}"
             @keydown="${this.handleKeydown}"
             >
            <button ?disabled ="${!this.isValid}" @click="${this.analyze}"> Analyze </button>
            </div>

            ${this.isValid ? html`<haxsite-search json-url="${this.url}"></haxsite-search>` : ''}


        
        `;
    }

    updateUrl(event) {
        this.url = event.target.value;
    }

    handleKeydown(event) {
        if (event.key === 'Enter' && this.isValid) {
            this.analyze(); // Trigger analyze method on Enter key
        }
    }

    analyze() {
        // Check if `url` ends with `.json`
        if (!this.url.endsWith(".json")) {
            // Append `/site.json` to `url`
            this.url = `${this.url.replace(/\/?$/, "")}/site.json`;
        }
    }


}
customElements.define('site-analyzer', siteAnalyzer);

