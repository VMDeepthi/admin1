import db from "../config/connectiondb.js";
//import { editannouncement } from '../controllers/Announcements.js'; // Adjust the path as needed
//import { editannouncement } from '../controllers/Announcements.js'; // Adjust the path to your Announcements.js file



export const AddAnnouncements = (req, res) => {
  console.log(req.body);
  let anndate = new Date(req.body.announcementdate)
   anndate = `${anndate.getFullYear()}+${anndate.getMonth()}+${anndate.getDay()}`
   console.log(anndate)
  const values = [req.body.selectGroup, req.body.title, req.body.description, anndate];

  // Check if an announcement with the same select_group already exists
  const checkQuery = 'SELECT * FROM addannouncements WHERE title = ? and announcementdate=?';

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

export const ViewAnnouncements = (req, res) => {
  const q = 'SELECT * FROM addannouncements';

  db.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json('Error occurred!');
    }
    console.log(result)

    return res.status(200).json(result);
  });
};

export const editannouncements = (req, res) => {
  console.log(req.params);
  const values = [req.body.selectGroup, req.body.title, req.body.description, req.body.announcementdate, req.params.id];
  const q = 'UPDATE addannouncement SET selectGroup=?, title=?, description=?, announcementdate=? WHERE id=?';

  db.query(q, values, (err, result) => {
    if (err) {
      console.error(err);

      if (err.errno === 1062) {
        return res.status(406).json('Select Group already exists!');
      } else {
        return res.status(500).json('Error occurred!');
      }
    }

    return res.status(200).json('Announcement details updated successfully');
  });
};

export const deleteannouncements = (req, res) => {
  console.log(req.body);
  const q = 'DELETE FROM addannouncement WHERE id = ?';

  db.query(q, [req.body.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json('Error occurred.');
    }

    return res.status(200).json('Company Announcement Deleted Successfully');
  });
};
