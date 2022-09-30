import asyncHandler from "../middlewares/AsyncHandler.js";
import PoolAddresses from "../models/PoolAddresses.js";

/*
@desc     GET All Pool Addresses
@route    GET /api/poolAddress
@access   Public
*/
const getAllPoolAddresses = asyncHandler(async (req, res) => {
    const poolAddresses = await PoolAddresses.find();

    res.status(200).send({status: true, data: poolAddresses, message: 'Pool Addresses Successfully fetched'})
});

/*
@desc     GET Address with specific number & id
@route    POST /api/poolAddress/addresses
@access   Public
*/
const getPoolAddressByIdNumber = asyncHandler(async (req, res) => {
    const {number, id} = req.body;

    if(!number && !id) {
        return res.status(400).send({status: false, message: 'number & id field is required'})
    }

    const poolAddresses = await PoolAddresses.find({id, number}, {address: 1});

    if (poolAddresses.length > 0) {
        return res.status(200).send({status: true, data: poolAddresses, message: 'Pool Addresses Successfully fetched'})
    }

    res.status(200).send({status: true, message: 'Pool Addresses does not found'})
})

/*
@desc     Create new  Pool Address
@route    POST /api/poolAddress
@access   Public
*/
const createPoolAddress = asyncHandler(async (req, res) => {
    const createdPoolAddress = await new PoolAddresses(req.body).save();

    if (createdPoolAddress) {
        return res.status(200).send({status: true, message: 'Pool Address is created successfully'});
    }
    return res.status(400).send({status: false, message: 'Some error occurred while creating Pool Address'});
})


export {getAllPoolAddresses, getPoolAddressByIdNumber, createPoolAddress}