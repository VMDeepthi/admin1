import express from 'express';
import { AddAnnouncements, editannouncements, deleteannouncements, ViewAnnouncements } from '../controllers/Announcements.js';

const route = express.Router();

route.post('/addannouncement', AddAnnouncements); // Use AddAnnouncements, not AddAnnouncement
route.get('/viewannouncement', ViewAnnouncements); // Use ViewAnnouncement, not Viewannouncement
route.put('/editannouncement/:id', editannouncements); // Use editannouncements, not editannouncement
route.post('/deleteannouncement', deleteannouncements); // Use deleteannouncements, not deleteannouncement

export default route;
