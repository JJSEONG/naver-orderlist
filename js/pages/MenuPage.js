import { html } from 'lit';

import { fetchGetRecentOrders, fetchGetMenuGroups } from '../api/index.js';
import View from '../view.js';

const TABS = [
  {
    text: html`🎁&nbsp;&nbsp;포장`,
    imageUrl: '../assets/images/ico-check.svg'
  },
  {
    text: html`🍽&nbsp;&nbsp;매장`,
    imageUrl: '../assets/images/ico-check.svg'
  },
  {
    text: html`🛵&nbsp;&nbsp;배달`,
    imageUrl: '../assets/images/ico-check.svg'
  },
];

const ORDER_TYPE_MESSAGE = [
  "가지고 가실 수 있게 포장해 드립니다.",
  "매장에서 드실 수 있게 준비됩니다.",
  "계신 곳으로 배달됩니다.",
]

export default class MenuPage extends View {
  constructor() {
    super();

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
    };
  }

  onChangeTab(index) {
    this.tabIndex = index;
  }

  onChangeCategory(category) {
    this.selectedCategory = category
  }

  redirectDetailPage(id) {
    history.pushState(null, null, `/detail/${id}`);
    this.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    const categories = this.menuGroups.map(({category, categoryName}) => ({
      category,
      categoryName,
    }));

    return html `
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
        <div class="tab-switch-box" role="tablist">
          ${TABS.map(
            (tab, index) =>
              html`<a
                href="#"
                class="tab-switch ${index === this.tabIndex ? 'is-active' : ''}"
                role="tab"
                @click=${() => this.onChangeTab(index)}
              >
                ${tab.text}
                <img
                src="${tab.imageUrl}"
                alt="${tab.text}"
                class="ico-check"
                aria-hidden="${index === this.tabIndex}"
              />
              </a>`,
          )}
        </div>

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
        </div>
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
      (menuGroup) => html`<menu-list .menuGroup=${menuGroup}></menu-list>`,
    )}
    <!-- // 메뉴 리스트 영역 -->

    <!-- 담은 메뉴 영역 -->
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
    </div>
    <!-- // 담은 메뉴 영역 -->

    <!-- 맨위로 -->
    <div class="go-to-top">
      <a href="#" class="link">Top<i class="ico-up"></i></a>
    </div>
    <!-- // 맨위로 -->
  </div>

  <div class="dimmed-layer hidden"></div>
  <div class="order-type-popup hidden">
    <p class="title">어디서 드시나요?</p>
    <div class="type-list">
      <a href="#" class="type-item" onClick="popupClose()">
        <!-- <img src="../assets/images/takeout.svg" alt="포장" class="icon"> -->
        <svg class="icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 463 463" style="enable-background:new 0 0 463 463;" xml:space="preserve">
          <path fill="currentColor" d="M367.372,142.726c-0.413-8.257-7.213-14.726-15.481-14.726H298.12l-12.974-82.169C280.953,19.274,258.396,0,231.49,0
          c-26.885,0-49.442,19.274-53.635,45.831L164.881,128H111.11c-8.268,0-15.068,6.469-15.481,14.726l-15.2,304
          c-0.211,4.22,1.338,8.396,4.25,11.457S91.685,463,95.911,463h271.18c4.225,0,8.318-1.756,11.23-4.817s4.461-7.236,4.25-11.457
          L367.372,142.726z M192.672,48.171C195.708,28.95,212.032,15,231.511,15c19.458,0,35.784,13.95,38.819,33.171L282.935,128
          H180.068L192.672,48.171z M367.453,447.845C367.305,448,367.149,448,367.091,448H95.911c-0.059,0-0.214,0-0.362-0.155
          c-0.148-0.155-0.14-0.311-0.137-0.369l15.2-304c0.013-0.267,0.233-0.476,0.5-0.476h51.402l-2.421,15.33
          c-0.646,4.092,2.147,7.932,6.238,8.578c0.396,0.063,0.79,0.093,1.179,0.093c3.626,0,6.815-2.636,7.399-6.331l2.79-17.67h107.604
          l2.79,17.67c0.646,4.091,4.483,6.88,8.578,6.238c4.091-0.646,6.884-4.486,6.238-8.578l-2.42-15.33h51.402
          c0.267,0,0.486,0.209,0.5,0.476l15.2,304C367.593,447.534,367.601,447.689,367.453,447.845z"/>
          <path fill="currentColor" d="M231.501,192c-4.142,0-7.5,3.357-7.5,7.5V240h-9v-40.5c0-4.143-3.358-7.5-7.5-7.5c-4.142,0-7.5,3.357-7.5,7.5V240h-9
          v-40.5c0-4.143-3.358-7.5-7.5-7.5c-4.142,0-7.5,3.357-7.5,7.5v56c0,12.958,10.542,23.5,23.5,23.5h0.5v128.5
          c0,4.143,3.358,7.5,7.5,7.5c4.142,0,7.5-3.357,7.5-7.5V279h0.5c12.958,0,23.5-10.542,23.5-23.5v-56
          C239.001,195.357,235.643,192,231.501,192z M224.001,255.5c0,4.687-3.813,8.5-8.5,8.5h-16c-4.687,0-8.5-3.813-8.5-8.5V255h33
          V255.5z"/>
          <path fill="currentColor" d="M287.719,206.754c-0.816-8.162-7.617-14.317-15.82-14.317c-8.767,0-15.899,7.133-15.899,15.899V407.5
          c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5V359h6.717c6.653,0,13.02-2.837,17.47-7.782s6.6-11.576,5.9-18.191L287.719,206.754
          z M284.036,341.186C282.403,343,280.159,344,277.718,344H271V208.336c0-0.496,0.403-0.899,0.899-0.899
          c0.464,0,0.849,0.348,0.899,0.853l13.372,126.316C286.427,337.033,285.669,339.37,284.036,341.186z"/>
      </svg>
        <p class="desc">포장해서 가져갈게요</p>
        <span class="btn-selection">선택</span>
      </a>
      <a href="#" class="type-item" onClick="popupClose()">
        <!-- <img src="../assets/images/eat-in.svg" alt="매장" class="icon"> -->
        <svg class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.225 409.225" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 409.225 409.225">
          <path fill="currentColor" d="m204.614,128.871c5.522,0 10,4.477 10,10v3.702c0,5.523-4.478,10-10,10-5.523,0-10-4.477-10-10v-3.702c0-5.523 4.477-10 10-10zm-194.612-108.871h62.982v72.216l-24.625,26.399c-3.768,4.038-3.548,10.366 0.491,14.133 4.038,3.768 10.365,3.548 14.133-0.491l20-21.439 19.999,21.439c3.769,4.039 10.096,4.258 14.134,0.491 4.039-3.768 4.258-10.095 0.491-14.134l-24.623-26.394v-72.22h101.63v72.217l-24.625,26.398c-3.767,4.039-3.547,10.366 0.491,14.134s10.367,3.547 14.134-0.491l19.999-21.439 19.998,21.439c1.97,2.111 4.639,3.179 7.314,3.179 2.443,0 4.892-0.89 6.819-2.688 4.038-3.767 4.259-10.095 0.491-14.134l-24.622-26.396v-72.219h101.632v72.217l-24.626,26.398c-3.767,4.038-3.548,10.366 0.491,14.133 4.038,3.768 10.365,3.547 14.134-0.491l19.999-21.439 19.999,21.439c3.769,4.039 10.098,4.257 14.134,0.491 4.038-3.767 4.258-10.095 0.491-14.133l-24.622-26.396v-72.219h62.977c5.522,0 10-4.477 10-10s-4.478-10-10-10h-389.22c-5.523,0-10,4.477-10,10s4.477,10 10,10zm306.244,118.871v3.702c0,5.523 4.478,10 10,10s10-4.477 10-10v-3.702c0-5.523-4.478-10-10-10s-10,4.477-10,10zm68.652,75.742v150.281h14.325c5.522,0 10,4.477 10,10s-4.478,10-10,10h-24.129c-0.131,0.003-0.262,0.003-0.393,0h-43.405l3.269,11.62c1.495,5.317-1.604,10.839-6.92,12.334-0.905,0.255-1.816,0.376-2.712,0.376-4.368,0-8.381-2.883-9.622-7.295l-4.79-17.035h-55.28l-4.791,17.035c-1.496,5.317-7.021,8.416-12.334,6.919-5.317-1.495-8.415-7.017-6.92-12.334l3.269-11.62h-59.705l3.268,11.62c1.495,5.317-1.603,10.839-6.919,12.334-5.317,1.496-10.839-1.603-12.334-6.919l-4.791-17.035h-55.281l-4.792,17.035c-1.496,5.317-7.019,8.416-12.334,6.919-5.316-1.495-8.414-7.018-6.919-12.334l3.268-11.62h-43.4c-0.131,0.003-0.262,0.003-0.393,0h-24.131c-5.523,0-10-4.477-10-10s4.477-10 10-10h14.328v-150.281h-14.328c-5.523,0-10-4.477-10-10s4.477-10 10-10h38.653v-14.328c0-5.523 4.477-10 10-10s10,4.477 10,10v14.328h25.264c-0.502-1.192-0.78-2.502-0.78-3.878 0-5.523 4.477-10 10-10h33.681c5.523,0 10,4.477 10,10 0,1.375-0.277,2.686-0.78,3.878h253.182c5.522,0 10,4.477 10,10s-4.478,10-10,10h-14.324zm-236.539,150.281l-19.281-68.554h-5.469l-19.281,68.554h44.031zm-32.554-88.554c0.148-0.002 0.298-0.002 0.446,0h20.182c0.151-0.004 0.301-0.003 0.452,0h22.601v-16.663h-66.283v16.663h22.602zm189.091,88.554l-19.279-68.554h-5.471l-19.28,68.554h44.03zm-32.556-88.554c0.148-0.003 0.301-0.004 0.451,0h20.181c0.151-0.003 0.301-0.002 0.45,0h22.601v-16.663h-66.283v16.663h22.6zm92.558-61.727h-320.568v150.281h39.222l19.281-68.554h-19.63c-5.523,0-10-4.477-10-10v-36.663c0-5.523 4.477-10 10-10h86.282c5.523,0 10,4.477 10,10v36.663c0,5.523-4.477,10-10,10h-19.631l19.281,68.554h70.954l19.281-68.554h-19.63c-5.522,0-10-4.477-10-10v-36.663c0-5.523 4.478-10 10-10h86.282c5.522,0 10,4.477 10,10v36.663c0,5.523-4.478,10-10,10h-19.631l19.28,68.554h39.226v-150.281zm-291.913-75.742v3.702c1.42109e-14,5.523 4.477,10 10,10s10-4.477 10-10v-3.702c0-5.523-4.477-10-10-10s-10,4.477-10,10z"/>
        </svg>
        
        <p class="desc">매장에서 먹고 갈게요</p>
        <span class="btn-selection">선택</span>
      </a>
    </div>
  </div>
`
  }
}