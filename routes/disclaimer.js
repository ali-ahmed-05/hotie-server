import express from "express";
import {getDisclaimers, createDisclaimers} from "../controllers/disclaimer.js";

const disclaimerRouter = express.Router();


disclaimerRouter.route('/')
    .get(getDisclaimers)
    .post(createDisclaimers)

export default disclaimerRouter