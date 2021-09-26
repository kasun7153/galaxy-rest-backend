const { Order } = require("../models/order.model");

const addOrderService = async (orderDetails) => {
  try {
    await Order.create(orderDetails);
  } catch (e) {
    throw e;
  }
};

const getOrdersByIdService = async (idNumber) => {
  try {
    return await Order.find({ idNumber }).sort({ createdAt: -1 });
  } catch (e) {
    throw e;
  }
};

module.exports = { addOrderService, getOrdersByIdService };
