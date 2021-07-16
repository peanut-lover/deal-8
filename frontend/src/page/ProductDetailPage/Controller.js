import { navigateTo } from '@/router';

import { getProductDetail } from '@/api/product';
import { getProfileAsync } from '@/api/user';

const tag = '[ProductDetail Controller]';

export default class Controller {
  constructor(
    store,
    {
      productId,
      productDetailHeaderView,
      productImageListView,
      productDetailView,
      productDetailFooterView,
    },
  ) {
    this.store = store;
    this.productId = productId;
    this.productDetailHeaderView = productDetailHeaderView;
    this.productImageListView = productImageListView;
    this.productDetailView = productDetailView;
    this.productDetailFooterView = productDetailFooterView;

    this.subscribeViewEvents();
    this.init();
  }

  subscribeViewEvents() {
    this.productDetailFooterView.on('@interest', (e) => {
      const { id, isInterested } = e.detail.value;
      this.changeInterest(id, isInterested);
    });
  }

  changeInterest(productId, isInterested) {
    if (isInterested) {
      console.log('Interest ON ' + productId);
    } else {
      console.log('Interest OFF ' + productId);
    }
  }

  init() {
    if (this.productId === undefined) {
      return 'unknown product';
      // TODO alert and redirect to main
    }
    const getUserPromise = getProfileAsync();
    const getProductPromise = getProductDetail({ id: this.productId });
    Promise.all([getUserPromise, getProductPromise]).then(
      ([user, productDetail]) => {
        console.log(this.store);
        this.store.user = user;
        this.store.productDetail = productDetail;
        this.render();
      },
    );
  }

  render() {
    const productDetail = this.store.productDetail;
    const user = this.store.user;
    this.productDetailHeaderView.show();
    this.productImageListView.show(productDetail.images);
    this.productDetailView.show(user, productDetail);
    this.productDetailFooterView.show(user, productDetail);
  }
}