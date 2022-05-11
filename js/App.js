import { html } from 'lit';

import View from './view.js';

export default class App extends View {
  constructor() {
    super();

    this.currentPage = 'menu';
    
    window.onpopstate = () => {
      const [, page] = location.pathname.split('/');

      this.currentPage = page;
    };
  }

  static get properties() {
    return {
      currentPage: {
        type: String,
      },
    };
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
    return this.route()
  }
}