import { html } from 'lit';

import View from './view.js';

export default class App extends View {
  constructor() {
    super();

    this.currentPage = 'menu';
    this.orderTypeIndex = 0;

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
      orderTypeIndex: {
        type: Number,
      }
    };
  }

  route() {
    switch (this.currentPage) {
      case 'detail':
        return html`<detail-page
          .orderTypeIndex=${this.orderTypeIndex}
        ></detail-page>`;
      default:
        return html`<menu-page></menu-page>`;
    }
  }

  render() {
    return this.route()
  }
}