const express = require("express");
const { createOrder, updateOrder, getOrders, getOrder, deleteOrder, upgradeOrder } = require("../controllers/orderController");
const { adminOnly, protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
.post('/create',protect, createOrder)
.post('/upgrade',protect, upgradeOrder)
.patch('/update', protect, updateOrder)
.get('/getOrders', protect, getOrders)
.get('/getOrder', protect, getOrder)
.delete('/:id', protect, deleteOrder)

module.exports = router