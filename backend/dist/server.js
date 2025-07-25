"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const db = (0, db_1.run)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    return res.json({
        msg: "Hello"
    });
});
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield req.body;
    try {
        const res = yield (yield db).query(`INSERT INTO donors (name, number, bloodtype, location) VALUES ($1, $2, $3, $4)`, [data.name, data.contact, data.bloodGroup, data.location]);
    }
    catch (e) {
        console.log(e);
        return res.json({
            msg: "Data rejected"
        });
    }
    return res.json({
        msg: "Data Accepted"
    });
}));
app.post("/find", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    var data;
    try {
        data = yield (yield db).query(`SELECT * FROM donors WHERE bloodtype=$1 AND location=$2`, [body.bloodType, body.location]);
    }
    catch (e) {
        console.log(e);
    }
    return res.json({
        data: data === null || data === void 0 ? void 0 : data.rows
    });
}));
app.listen(3000, () => {
    console.log("http://localhost:3000/");
});
