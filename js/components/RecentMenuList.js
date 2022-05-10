import { html } from 'lit';
import View from '../view.js'

export default class RecentMenuList extends View {
  constructor(recentMenuItems = [], redirectDetailPage) {
    super();

    this.recentMenuItems = recentMenuItems;
    this.redirectDetailPage = redirectDetailPage;
  }

  static get properties() {
    return {
      recentMenuItems: {type: Array},
      redirectDetailPage: {type: Function},
    };
  }
  render() {
  return html`
    <div class="recent-order-area">
      <div class="recent-title">
        <img src="../assets/images/ico-clock.svg" alt="" class="ico-clock">최근<br>주문
      </div>
      <div class="recent-menu-area scroll-x">
        <ul class="recent-menu-list">
          ${this.recentMenuItems.map(
            ({id, name, price, isPopular, imageUrl}) => html`
          <li class="recent-menu-item is-ordered"
            @click=${() => this.redirectDetailPage(id)}
          >
            <a>
              <div class="menu-img-area">
                ${isPopular ? html`<span class="badge-popular">인기</span>` : ''}
                <img class="menu-img" src="${imageUrl}" alt="메뉴사진">
              </div>
              <p class="menu-name">${name}</p>
              <p class="menu-price">${price}</p>
            </a>
            <a href="#" class="badge-cart">
              <img src="../assets/images/ico-cart.svg" alt="주문하기" class="ico-cart">
            </a>
          </li>`
          )}
        </ul>
      </div>
    </div>`
  }
}