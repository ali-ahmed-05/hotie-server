import express from "express";
import {getNews, createNews} from "../controllers/news.js";

const newsRouter = express.Router();


newsRouter.route('/')
    .get(getNews)
    .post(createNews)

export default newsRouter