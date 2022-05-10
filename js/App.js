import { html } from 'lit';

import View from './view.js';

export default class App extends View {
  constructor() {
    super();
  }

  static get properties() {
    return {
      message: {
        type: String
      }
    }
  }

  createRenderRoot() {
    return this;
  }

  route() {
    switch (this.currentPage) {
      case 'detail':
        return html`<detail-page></detail-page>`;
      default:
        return html`<menu-page></menu-page>`;
    }
  }

  render() {
    return this.removeAttribute()
  }
}