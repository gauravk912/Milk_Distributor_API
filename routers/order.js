const express = require ('express');
const Order = require('../models/order');
const router = new express.Router();

        //User Create
router.post('/placeOrder',async(req,res)=>{
    const order = new Order(req.body);
    try {
        await order.save()
        res.status(201).send(order);
    } catch (err) {
        res.status(400).send(err);
    }
});

        //Read Order
router.get('/getOrders',async (req,res)=>{
    try{
        const orders = await Order.find({})
        res.send(orders);
    } catch(e){
        res.status(500).send();
    }
})

        //Read by id
router.get('/getOrder/:id',(req,res)=>{
    const id = req.params.id;
    Order.findById(id).then((order)=>{
        if(!order){
            return res.status(404).send();
        }
        res.send(order);
    }).catch((e)=>{
        res.status(500).send();
    })
});


        //Update by id
router.patch('/updateOrder/:id', async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates= ['milkQuantityInLitres','pricePerLitre','AnimalMilkType','shippingAddress','paymentMethod','orderStatus','deliveryDate']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Update'})
    }

    try {

        const order = await Order.findById(req.params.id);
        updates.forEach((update)=>{
            order[update] = req.body[update];
        })
        await order.save();
        

        if(!order){
            return res.status(404).send();
        }

        res.send(order)
    } catch (e) {
        res.status(400).send(e);
    }
})

        //Delete by id
router.delete('/deleteOrder/:id',async(req,res)=>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order){
            return res.status(404).send();
        }
        res.send(order);
        
    } catch (e) {
        res.status(500).send();
    }
})


module.exports = router;