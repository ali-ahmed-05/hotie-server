import Disclaimer from "../models/disclaimer.js";
import asyncHandler from "../middlewares/AsyncHandler.js";

/*
@desc     Create new Disclaimer
@route    POST /api/disclaimer
@access   Public
*/
const createDisclaimers = asyncHandler(async (req, res) => {
    const createdDisclaimer = await new Disclaimer(req.body).save();

    if (createdDisclaimer) {
        return res.status(200).send({status: true, message: 'Disclaimer is created successfully'});
    }
    return res.status(400).send({status: false, message: 'Some error occurred while creating Disclaimer'});
})

/*
@desc     GET All Disclaimer
@route    GET /api/disclaimer
@access   Public
*/

const getDisclaimers = asyncHandler(async (req, res) => {
    let {page = 1, pageSize = 10} = req.query;
    const count = await Disclaimer.countDocuments();
    const skip = pageSize * (page - 1);


    const disclaimers = await Disclaimer.find().limit(pageSize).skip(skip);

    if (disclaimers.length === 0) {
        return res.status(200).send({status: true, disclaimers, message: 'NO Disclaimers exist in DB'})
    }

    res.status(200).send({
        status: true, disclaimers, message: 'Disclaimers Fetched Successfully',
        page,
        pageSize,
        totalPages: Math.ceil(count / pageSize)
    })
})

export {getDisclaimers, createDisclaimers}
