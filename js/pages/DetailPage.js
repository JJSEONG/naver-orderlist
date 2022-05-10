import { html } from 'lit';
import View from '../view.js'

export default class DetailPage extends View {
  constructor() {
    super();

    this.currentPage = 'menu'

    window.onpopstate = () => {
      const [, page] = location.pathname.split('/');

      this.currentPage = page;
    }
  }

  static get properties() {
    return {
      currentPage: {
        type: String,
      }
    }
  }

  render() {
    return html`<h1>상세 페이지</h1>`
  }
}