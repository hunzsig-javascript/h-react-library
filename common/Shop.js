const Shop = {
  shopCode: '',
  shopId: '0',
  shopOwnerUid: '0',
  /**
   * 设置 shopCode
   * @returns {*|string}
   */
  setShopCode: (code) => {
    Shop.shopCode = code;
  },
  /**
   * 获取 shopCode
   * @returns {*|string}
   */
  getShopCode: () => {
    return Shop.shopCode;
  },
  /**
   * 设置 ShopId
   * @returns {*|string}
   */
  setShopId: (id) => {
    Shop.shopId = id;
  },
  /**
   * 获取 ShopId
   * @returns {*|string}
   */
  getShopId: () => {
    return Shop.shopId;
  },
  /**
   * 设置 ShopOwnerUid
   * @returns {*|int}
   */
  setShopOwnerUid: (id) => {
    Shop.shopOwnerUid = id;
  },
  /**
   * 获取 ShopOwnerUid
   * @returns {*|int}
   */
  getShopOwnerUid: () => {
    return Shop.shopOwnerUid;
  },
};

export default Shop;
