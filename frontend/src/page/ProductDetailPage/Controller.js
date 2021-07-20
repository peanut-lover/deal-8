import { navigateTo } from "@/router";

import { getProductDetailAsync, updateProductStatusAsync } from "@/api/product";
import {
  getProfileAsync,
  removeInterestProductAsync,
  addInterestProductAsync,
} from "@/api/user";

const tag = "[ProductDetail Controller]";

export default class Controller {
  constructor(
    store,
    {
      productDetailHeaderView,
      productImageListView,
      productDetailView,
      productDetailFooterView,
    }
  ) {
    this.store = store;
    this.productId = store.productId;
    this.productDetailHeaderView = productDetailHeaderView;
    this.productImageListView = productImageListView;
    this.productDetailView = productDetailView;
    this.productDetailFooterView = productDetailFooterView;

    this.subscribeViewEvents();
    this.init();
  }

  subscribeViewEvents() {
    this.productDetailFooterView.on("@interest", (e) => {
      const { id, isInterested } = e.detail.value;
      this.changeInterest(id, isInterested);
    });

    this.productDetailHeaderView.on("@modifyPost", () => {
      navigateTo(`/product-edit/${this.store.productId}`);
    });
    this.productDetailHeaderView.on("@deletePost", () => {
      navigateTo(`/product-edit/${this.store.productId}`);
    });

    this.productDetailView.on("@change-status", (e) => {
      const status = e.detail.value;

      updateProductStatusAsync(this.store.productId, status).then((result) => {
        this.fetchProductDetailData();
      });
    });
  }

  changeInterest(productId, isInterested) {
    if (isInterested) {
      addInterestProductAsync(productId).then((result) => {
        this.fetchProductDetailData();
      });
    } else {
      removeInterestProductAsync(productId).then((result) => {
        this.fetchProductDetailData();
      });
    }
  }

  init() {
    if (this.productId === undefined) {
      navigateTo("/");
    }
    getProfileAsync().then(({ isAuth, account }) => {
      this.store.user = account;
      this.fetchProductDetailData();
    });
  }

  fetchProductDetailData() {
    getProductDetailAsync({ id: this.productId }).then(
      ({ success, product }) => {
        if (success) {
          this.store.productDetail = product;
          this.render();
        }
      }
    );
  }

  render() {
    const { productDetail, user } = this.store;
    this.productDetailHeaderView.show(user, productDetail);
    this.productImageListView.show(productDetail.images);
    this.productDetailView.show(user, productDetail);
    this.productDetailFooterView.show(user, productDetail);
  }
}
