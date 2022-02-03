import express, { json } from "express";
import router from './router.js';
import { syncDB } from './model.js';
import cors from 'cors';


const PORT = 8080;
express()
    .use(cors({
        origin: "*",
        methods: "GET,PUT,POST,DELETE",
        optionsSuccessStatus: 200
    }))
    .use(json())
    .use('/api', router)
    .listen(8080, async () => {
        try {
            await syncDB();
        }
        catch (err) {
            console.log(err);
        }
    });