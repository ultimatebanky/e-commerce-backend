const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");


const createOrder = asyncHandler(async (req, res) => {
    const { firstName,
       lastName,
       email,
       pickup_add,
       destination,
       phone,
       weight,
       description,
       service_type,
       additional_info,
      status
     } = req.body;
  
    // Validation
    // if (firstName || 
    //   !lastName || 
    //   !email || 
    //   !pickup_add || 
    //   !destination || 
    //   !phone || 
    //   !weight || 
    //   !description || 
    //   !service_type || 
    //   !additional_info) {
    //   res.status(400);
    //   throw new Error("Please fill in all the required fields.");
    // }
  
    //   Create new order
    const order = await Order.create({
        firstName, lastName, email, pickup_add, destination, phone, weight, description, service_type, additional_info, status
    });
  
    
    if (order) {
      const { _id, firstName, lastName, email, pickup_add, destination, phone, weight, description, service_type, additional_info, status } = user;
  
      res.status(201).json({
        _id, firstName, lastName, email, pickup_add, destination, phone, weight, description, service_type, additional_info, status
      });
    } else {
      res.status(400);
      throw new Error("Invalid Order data");
    }
  });

  const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.order._id);
  
    if (order) {
      const { firstName, lastName, email, pickup_add, destination, phone, weight, description, service_type, additional_info, status } = order;
  
      order.email = email;
      order.firstName = req.body.firstName || firstName;
      order.lastName = req.body.lastName || lastName;
      order.phone = req.body.phone || phone;
      order.weight = req.body.weight || weight;
      order.pickup_add = req.body.pickup_add || pickup_add;
      order.destination = req.body.destination || destination;
      order.description = req.body.description || description;
      order.service_type = req.body.service_type || service_type;
      order.additional_info = req.body.additional_info || additional_info;
      order.status = req.body.status || status;
  
      const updatedOrder = await order.save();
  
      res.status(200).json({
        _id: updatedOrder._id,
        firstName: updatedOrder.firstName,
        email: updatedOrder.email,
        phone: updatedOrder.phone,
        lastName: updatedOrder.lastName,
        pickup_add: updatedOrder.pickup_add,
        destination: updatedOrder.destination,
        weight: updatedOrder.weight,
        description: updatedOrder.description,
        service_type: updatedOrder.service_type,
        additional_info: updatedOrder.additional_info,
        status: updatedOrder.status,
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  });
  
  // Delete order
  const deleteOrder = asyncHandler(async (req, res) => {
    const order = Order.findById(req.params.id);
  
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
  
    await order.remove();
    res.status(200).json({
      message: "Order deleted successfully",
    });
  });
  
  // Get orders
  const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().sort("-createdAt");
    if (!orders) {
      res.status(500);
      throw new Error("Something went wrong");
    }
    res.status(200).json(orders);
  });

  const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findOne(req.order._id);
  
    if (order) {
        const { _id, firstName, lastName, email, pickup_add, destination, phone, weight, description, service_type, additional_info, status } = order;
  
      res.status(200).json({
        _id, firstName, lastName, email, pickup_add, destination, phone, weight, description, service_type, additional_info, status
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  });
  
  const upgradeOrder = asyncHandler(async (req, res) => {
    const { status, id } = req.body;
  
    const order = await Order.findById(id);
  
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
  
    order.status = status;
    await order.save();
  
    res.status(200).json({
      message: `Order upgraded`,
    });
  });

  module.exports = {
    createOrder,
    updateOrder,
    upgradeOrder,
    getOrder,
    getOrders,
    deleteOrder
  }