import { html } from "lit";
import View from "../view.js";

export default class MenuPictureList extends View {
  constructor(pictures = []) {
    super();
    this.pictures = pictures;
  }

  static get properties() {
    return {
      pictures: {
        type: Array,
      },
    };
  }

  render() {
    return html`
      <ul class="orderer-pic-list">
        ${this.pictures.map(
          (picture) => html`
            <li class="orderer-pic-item">
              <a href="#" class="orderer-pic-link">
                <img src="${picture}" alt="리뷰 사진" />
              </a>
            </li>
          `
        )}
      </ul>
    `;
  }
}
