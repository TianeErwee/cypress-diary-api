var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

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

// GET LIST
const getList = async() => {
  return db.promise().query('SELECT * FROM entries;')
  .then( ([rows,fields]) => {
    return Promise.resolve(rows);
  })
  .catch((err) => {
    return Promise.reject(err);
  });
}

router.get('/list', async function(req, res, next) {
  try {
    const entries = await getList();
    res.send({"statusCode": 200, "statusMessage": entries});
  } catch (err) {
    res.status(500).send({"statusMessage": "error occurred" + err});
  }
});
// END GET LIST

// CREATE ENTRY
const createEntry = async(title, content) => {
  const query = "INSERT INTO entries (`title`, `content`, `date_created`) VALUES ('" + title + "', '"+ content + "', CURRENT_DATE);";
  return db.promise().query(query)
  .then( ([id]) => {
    return Promise.resolve(id.insertId);
  })
  .catch((err) => {
    return Promise.reject(err);
  });
}

router.post('/create-entry', async (req, res, next) => {
  const body = req.body;
	try {
    const result = await createEntry(body.title, body.content);
    res.send({"statusCode": 200, "statusMessage": result});
	} catch(err) {
		if (err.name === 'ValidationError') {
        	return res.status(400).json({ error: err.message });
		}
		res.status(500).send({"statusMessage": "error occurred" + err});
	}
});
// END CREATE ENTRY

// VIEW ENTRY
const viewEntry = async(id) => {
  return db.promise().query("SELECT * FROM entries WHERE id = " + id + ";")
  .then( ([rows,fields]) => {
    if (rows.length > 0) {
      return Promise.resolve(rows);
    } else {
      return Promise.reject('No matching entry');
    }
  })
  .catch((err) => {
    return Promise.reject(err);
  });
}

router.get('/view-entry/:id', async (req, res, next) => {
	try {
    const result = await viewEntry(req.params.id);
    res.send({"statusCode": 200, "statusMessage": result});
	} catch(err) {
		res.status(500).send({"statusMessage": "error occurred" + err});
	}
});
// END VIEW ENTRY

// UPDATE ENTRY
const updateEntry = async(title, content, id) => {
  const query = "UPDATE entries SET `title` = '" + title + "', `content` = '" + content + "' WHERE id = " + id + ";";
  return db.promise().query(query)
  .then( ([id]) => {
    return Promise.resolve(id);
  })
  .catch((err) => {
    return Promise.reject(err);
  });
}

router.put('/update-entry/:id', async (req, res, next) => {
  const body = req.body;
	try {
    const result = await updateEntry(body.title, body.content, req.params.id);
    res.send({"statusCode": 200, "statusMessage": result});
	} catch(err) {
		res.status(500).send({"statusMessage": "error occurred" + err});
	}
});
// END UPDATE ENTRY

// DELETE ENTRY
const deleteEntry = async(id) => {
  return db.promise().query("DELETE FROM entries WHERE id = " + id + ";")
  .then( ([id]) => {
    return Promise.resolve(id);
  })
  .catch((err) => {
    return Promise.reject(err);
  });
}

router.delete('/delete-entry/:id', async (req, res, next) => {
	try {
    const result = await deleteEntry(req.params.id);
    res.send({"statusCode": 200, "statusMessage": result});
	} catch(err) {
		res.status(500).send({"statusMessage": "error occurred" + err});
	}
});
// END DELETE ENTRY

module.exports = router;