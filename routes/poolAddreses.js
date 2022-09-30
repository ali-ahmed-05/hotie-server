import express from "express";
import {createPoolAddress, getAllPoolAddresses, getPoolAddressByIdNumber} from "../controllers/poolAddresses.js"

const PoolAddressRouter = express.Router();

PoolAddressRouter.route('/')
    .get(getAllPoolAddresses)
    .post(createPoolAddress);
PoolAddressRouter.route('/addresses').post(getPoolAddressByIdNumber)


export default PoolAddressRouter;