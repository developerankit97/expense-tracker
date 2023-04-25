const Razorpay = require('razorpay');
const Order = require('../models/order');
const jwt = require('jsonwebtoken');

exports.getPremiumMemberShip = async (req, res, next) => {
    try {
        const razorpay = new Razorpay({
            key_id: 'rzp_test_QvHFzixEKRayNt',
            key_secret: 'Zld2lHMZPRKXBPUkoGQweHOF'
        });

        razorpay.orders.create({
            amount: 2500,
            currency: 'INR',
        }, (err, order) => {
            if (err) {
                console.log('working here', err);
                throw new Error(JSON.stringify(err));
            } else {
                Order.create({
                    orderId: order.id,
                    userId: jwt.verify(req.headers.authorization, 'ZindagiNaMilegiDubara').id,
                    status: 'pending'
                }).then(order => {
                    return res.status(201).json({
                        order,
                        key_id: razorpay.key_id
                    })
                })
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        });
    }
}

exports.postUpdatetransactionStatus = (req, res, next) => {
    Order.update({
        paymentId: req.body.paymentId,
        status: 'success'
    },
        {
            where: {
                orderId: req.body.orderId,
            }
        }
    ).then(() => {
        User.update({
            isPremium: true
        }, {
            where: {
                id: jwt.verify(req.headers.authorization, 'ZindagiNaMilegiDubara').id
            }
        })
    }).then().catch(e => console.log(e));
}