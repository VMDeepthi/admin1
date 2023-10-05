import db from "../config/connectiondb.js";
//import { editannouncement } from '../controllers/Announcements.js'; // Adjust the path as needed
//import { editannouncement } from '../controllers/Announcements.js'; // Adjust the path to your Announcements.js file



export const changeadmininfo = (req, res) => {
  console.log(req.body);
  let anndate = new Date(req.body.announcementdate)
   anndate = `${anndate.getFullYear()}+${anndate.getMonth()}+${anndate.getDay()}`
   console.log(anndate)
  const values = [req.body.firstname, req.body.lastname, req.body.e, anndate];

  // Check if an announcement with the same select_group already exists
  const checkQuery = 'SELECT * FROM changeadmininfo WHERE title = ? and announcementdate=?';

  db.query(checkQuery, [req.body.title,req.body.announcementdate], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json('Error occurred. Please try again.');
    }

    if (result.length > 0) {
      return res.status(406).json('Announcement already exists!');
    }

    const insertQuery = 'INSERT INTO addannouncements (selectGroup, title, description, announcementdate) VALUES (?)';

    db.query(insertQuery, [values], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json('Error occurred. Please try again.');
      }

      return res.status(200).json('Announcement Added successfully');
    });
  });
};
