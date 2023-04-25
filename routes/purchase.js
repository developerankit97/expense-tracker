const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase-controller');

// router.get('/expenses', expensesController.getAllExpenses);

// router.get('/', expensesController.getAllExpenses);

// router.get('/expenses/:id', expensesController.getOneExpense);

router.get('/purchase/premiummembership', purchaseController.getPremiumMemberShip);

router.post('/updatetransactionstatus', purchaseController.postUpdatetransactionStatus);

// router.post('/user/login', authController.postLoginUser);

// router.put('/expenses/:id', expensesController.putUpdateExpense);

// router.delete('/expenses/:id', expensesController.deleteExpense);

module.exports = router;