var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});

/* GET customer listing. */
router.get('/list', async function(req, res, next)
{
  db.query('SELECT * FROM entries', (err, result, fields) => {
    if (!!err) {
      console.log(err);
    } else {
      res.send({"statusCode": 200, "statusMessage": result});
    }
  });
});

router.post('/create-entry', async (req, res, next) =>
{
  const body = req.body;
	try
	{
    const query = "INSERT INTO entries (`title`, `content`, `date_created`) VALUES ('" + body.title + "', '"+ body.content + "', CURRENT_DATE);";
    db.query(query, (err, result, fields) => {
      if (!!err) {
        console.log(err);
      } else {
        res.send({"statusCode": 200, "statusMessage": result});
      }
    });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

router.get('/view-entry/:id', async (req, res, next) =>
{
	try
	{
    const query = "SELECT * FROM entries WHERE id = " + req.params.id + ";";
    db.query(query, (err, result, fields) => {
      if (!!err) {
        console.log(err);
      } else {
        res.send({"statusCode": 200, "statusMessage": result});
      }
    });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the customer by uid */
router.put('/update-entry/:id', async (req, res, next) =>
{
  const body = req.body;
	try
	{
    const query = "UPDATE entries SET `title` = '" + body.title + "', `content` = '" + body.content + "' WHERE id = " + req.params.id + ";";
    db.query(query, (err, result, fields) => {
      if (!!err) {
        console.log(err);
      } else {
        res.send({"statusCode": 200, "statusMessage": result});
      }
    });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the customer from the customer list by uid */
router.delete('/delete-entry/:id', async (req, res, next) =>
{
	try
	{
    const query = "DELETE FROM entries WHERE id = " + req.params.id + ";";
    db.query(query, (err, result, fields) => {
      if (!!err) {
        console.log(err);
      } else {
        res.send({"statusCode": 200, "statusMessage": result});
      }
    });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;