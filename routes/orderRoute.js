const express = require("express");
const { createOrder, updateOrder, getOrders, getOrder, deleteOrder } = require("../controllers/orderController");
const { adminOnly, protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
.post('/create',protect, createOrder)
.patch('/update', adminOnly, protect, updateOrder)
.get('/getOrders', protect, getOrders)
.get('/getOrder', protect, getOrder)
.delete('/:id',  adminOnly, protect, deleteOrder)

module.exports = router