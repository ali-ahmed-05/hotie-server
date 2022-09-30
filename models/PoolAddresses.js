import mongoose from "mongoose";


const poolAddressesSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'address field is required']
    },
    number: {
        type: Number,
        required: [true, 'number field is required']
    },
    id: {
        type: Number,
        required: [true, 'id field is required']
    },
    balance: {
        type: String,
        required: [true, 'balance field is required']
    }
})

const PoolAddresses = mongoose.model('PoolAddresses', poolAddressesSchema)

export default PoolAddresses