import { html } from 'lit';

import { fetchGetRecentOrders, fetchGetMenuGroups } from '../api/index.js';
import View from '../view.js';


const ORDER_TYPE_MESSAGE = [
  "가지고 가실 수 있게 포장해 드립니다.",
  "매장에서 드실 수 있게 준비됩니다.",
  "계신 곳으로 배달됩니다.",
]

export default class MenuPage extends View {
  constructor() {
    super();

    this.cartItems = [];

    this.tabIndex = 0;
    this.recentMenuItems = [];
    this.menuGroups = [];
    this.selectedCategory = '추천';

    fetchGetRecentOrders().then(
      (response) => (this.recentMenuItems = response),
    );

    fetchGetMenuGroups().then(
      (response) => (this.menuGroups = response),
    );
  }

  static get properties() {
    return {
      tabIndex: {type: Number},
      selectedCategory: {type: String},
      recentMenuItems: {type: Array},
      menuGroups: {type: Array},
      cartItems: {type: Array},
    };
  }

  onChangeTab(index) {
    this.tabIndex = index;
  }

  onChangeCategory(category) {
    this.selectedCategory = category;

    const y = document
      .querySelector(`[data-scroll-id=${category}]`)
      .getBoundingClientRect().top;

    window.scrollBy({
      top: y - 140,
      left: 0,
      behavior: 'smooth',
    })
  }

  redirectDetailPage(id) {
    history.pushState(null, null, `/detail/${id}`);
    dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    const categories = this.menuGroups.map(({category, categoryName}) => ({
      category,
      categoryName,
    }));

    return html `
    <div className="container">
    <order-header></order-header>
      <div class="order-info-area">
        <div class="common-inner">
          <div class="info-main-title">
            <div class="title">
              <svg viewBox="0 0 18 18" class="ico-n-logo">
                <path fill-rule="evenodd" fill="currentColor"
                d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                </path>
              </svg>
              주문
            </div>
          </div>

          <!-- 주문분류 -->
          <tab-list
            .tabIndex=${this.tabIndex}
            .onChangeTab=${this.onChangeTab.bind(this)}
          >
          </tab-list>

          <div class="info-main-notice">
            ${ORDER_TYPE_MESSAGE[this.tabIndex]}
          </div>
          <!-- // 주문분류 -->

          <div class="info-main-notice alert hidden">
            <svg aria-hidden="true" class="ico-clock" viewBox="0 0 13 13" width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M6.5 0a6.5 6.5 0 110 13 6.5 6.5 0 010-13zm0 1a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm.492 1.137v4.157l2.792 2.674-.692.722-3.1-2.97V2.137h1z"></path>
            </svg>
            지금은 주문을 받을 수 없습니다.
          </div>

          <!-- 최근 주문 내역 -->
          <recent-menu-list
            .recentMenuItems=${this.recentMenuItems}
            .redirectDetailPage=${this.redirectDetailPage.bind(this)}
          ></recent-menu-list>
          <!-- // 최근 주문 내역 -->
        </div>
      </div>
      <!-- // 주문정보영역 -->

      <!-- 메뉴 카테고리 영역 -->
      <div class="menu-category-area">
        <div class="common-inner">
          <ul class="category-list scroll-x">
            ${categories.map(
              ({ category, categoryName }) => 
              html`<li class="category-item">
                <a
                @click=${() => this.onChangeCategory(category)}
                class="category-tab ${category === this.selectedCategory ? 'is-active' : ''}">${categoryName}</a>
              </li>`,
            )}
          </ul>
        </div>
      </div>
      <!-- // 메뉴 카테고리 영역 -->

      <!-- 메뉴 리스트 영역 -->
      ${this.menuGroups.map(
        (menuGroup) => html`
        <menu-list .menuGroup=${menuGroup}
          .redirectDetailPage=${this.redirectDetailPage.bind(this)}
        ></menu-list>`,
      )}
      <!-- // 메뉴 리스트 영역 -->

      <!-- 담은 메뉴 영역 -->
      ${this.cartItems.length > 0
        ? html`
        <div class="order-box-area">
          <div class="common-inner">
            <div>
              <p class="menu-name">메뉴이름</p>
              <p class="menu-price">9,999원</p>
            </div>
            <a href="./order.html" class="btn-order">
              <span class="txt">주문하기</span>
              <span class="icon">
                <img src="../assets/images/ico-cart-fill.svg" alt="" aria-hidden="true" class="ico-cart">
                <span class="num">1</span>
              </span>
            </a>
          </div>
        </div>`
      : ''}
      <!-- // 담은 메뉴 영역 -->

      <!-- 맨위로 -->
      <div class="go-to-top">
        <a href="#" class="link">Top<i class="ico-up"></i></a>
      </div>
      <!-- // 맨위로 -->

      <div class="dimmed-layer hidden"></div>
      <div class="order-type-popup hidden">
        <p class="title">어디서 드시나요?</p>
        <order-type-list></order-type-list>
      </div>
    </div>
`
  }
}