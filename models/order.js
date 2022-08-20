const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName:{
        type:String,
        require:true,
        trim:true
    },
    milkQuantityInLitres:{
        type:Number,
        require:true
    },
    pricePerLitre:{
        type:Number,
        require:true
    },
    AnimalMilkType:{
        type:String,
        require:trusted,
    },
    shippingAddress:{
        type:String,
        require:true
    },
    paymentMethod:{
        type:String,
        require:true
    },
    deliveryDate:{
        type:Date,
        require:true
    },
    orderStatus:{
        type:String,
        require:true
    }

},{
    timestamps:true
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;