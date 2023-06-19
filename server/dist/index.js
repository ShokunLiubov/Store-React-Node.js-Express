var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { appConfig } from './config/app-config';
import { appRouters } from './routers/routers';
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
app.use(appConfig);
app.use(appRouters);
const mongooseConfig = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.DB_URL) {
            yield mongoose.connect(process.env.DB_URL, mongooseConfig);
            app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        }
    }
    catch (e) {
        console.log(e);
    }
});
start();
