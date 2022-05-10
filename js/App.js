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

  render() {
    return html`<div className="container">
      <order-header></order-header>
      <menu-page></menu-page>
    </div>`;
  }
}