import { html } from 'lit';

import View from '../view.js'
import { fetchGetMenu } from '../api/index.js';

const DEFAULT_MENU = {
  id: 1,
  name: "음식 이름",
  reviewPoint: 0.0,
  description: "불러오는 중",
  price: 0,
  imageUrl:
    "https://ldb-phinf.pstatic.net/20200416_252/1587007251652svUkx_PNG/%C4%A5%B8%AE%BA%A3%C0%CC%C4%C1_%BF%FA%BA%BC.png?type=f459_345_60_sharpen",
  pictures: [],
  reviews: [],
};

export default class DetailPage extends View {
  constructor() {
    super();

    this.menu = DEFAULT_MENU

    const [menuID] = location.pathname.split('/').splice(-1);

    fetchGetMenu(menuID).then((response) => (this.menu = response));
  }

  static get properties() {
    return {
      menu: {
        type: Object,
      },
    };
  }

  render() {
    return html`
    <div class="container">
      <order-haeder></order-header>

      <div class="menu-detail-area">
        <!-- 메뉴 이미지 영역 -->
        <div
          class="menu-img"
          style="background-image: url('${this.menu.imageUrl}');"
        ></div>
        <!-- // 메뉴 이미지 영역 -->

        <!-- 메뉴 주문 정보 영역 -->
        <div class="menu-info-area">
          <div class="common-inner">
            <p class="menu-name-group">
              <span class="menu-name">메뉴이름</span>
              <span class="badge-popular">인기</span>
            </p>

            <!-- 메뉴 정보 영역 -->
            <div class="menu-info-group">
              <span class="menu-price">9,999원</span>
              <span class="menu-grade"><img src="../assets/images/ico-star.svg" alt="" class="ico-star">5.00</span>
              <span class="menu-number-of-order">주문수<em>999</em></span>
            </div>

            <p class="menu-desc">메뉴에 대한 간단한 설명이 적혀있습니다. 메뉴에 대한 간단한 설명이 적혀있습니다.</p>
            <!-- // 메뉴 정보 영역 -->

            <!-- 메뉴 주문 영역 -->
            <div class="order-type-area">
              <div class="type-select">
                <div class="title">
                  <svg viewBox="0 0 18 18" class="ico-n-logo">
                    <path fill-rule="evenodd" fill="currentColor"
                    d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                    </path>
                  </svg>
                  주문
                </div>
                <div class="tab-switch-box" role="tablist">
                  <a href="#" class="tab-switch is-active" role="tab">🎁&nbsp;&nbsp;포장</a>
                  <a href="#" class="tab-switch" role="tab">🍽&nbsp;&nbsp;매장</a>
                </div>
              </div>
              <div class="type-amount">
                <div class="title">수량</div>
                <div class="amount-select">
                  <button class="btn-minus" aria-label="빼기" disabled></button>
                  <span class="amount disabled">1</span>
                  <button class="btn-plus" aria-label="더하기"></button>
                </div>
              </div>
              <button class="btn-order" onClick="popupOpen()">1개 담기 9,999원</button>
              <!-- <button class="btn-order" disabled>지금 주문 가능한 시간이 아닙니다.</button> -->
            </div>
            <!-- // 메뉴 주문 영역 -->
          </div>
        </div>
        <!-- // 메뉴 주문 정보 영역 -->
      </div>
    </div>
    `
  }
}