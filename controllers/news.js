import News from "../models/news.js";
import asyncHandler from "../middlewares/AsyncHandler.js";

/*
@desc     GET All News
@route    GET /api/news
@access   Public
*/
const createNews = asyncHandler(async (req, res) => {
    const createdNews = await new News(req.body).save();

    if (createdNews) {
        return res.status(200).send({status: true, message: 'News is created successfully'});
    }
    return res.status(400).send({status: false, message: 'Some error occurred while creating News'});
})

/*
@desc     GET All News
@route    GET /api/news
@access   Public
*/

const getNews = asyncHandler(async (req, res) => {
    const news = await News.find({});

    if (news.length === 0) {
        return res.status(200).send({status: true, news, message: 'NO News exist in DB'})
    }

    res.status(200).send({status: true, news, message: 'News Fetched Successfully'})
})

export {getNews, createNews}