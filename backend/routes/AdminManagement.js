import express from 'express';
import { changeadmininfo,changepassword } from '../controllers/Admin Management.js';

const route = express.Router();

route.get('/changeadmininfo',changeadmininfo);
route.get('/changepassword',changepassword);

export default route;
