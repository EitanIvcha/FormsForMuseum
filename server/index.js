const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "35.224.215.248",
  password: "MOPHM2022",
  database: "museum",
});

// let db = "";

// const createUnixSocketPool = async (config) => {
//   const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

//   // Establish a connection to the database
//   db = mysql.createPool({
//     user: process.env.DB_USER, // e.g. 'my-db-user'
//     password: process.env.DB_PASS, // e.g. 'my-db-password'
//     database: process.env.DB_NAME, // e.g. 'my-database'
//     // If connecting via unix domain socket, specify the path
//     socketPath: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
//     // Specify additional properties here.
//     ...config,
//   });
// };

// add and get Museums
app.post("/addMuseum", (req, res) => {
  const name = req.body.name;
  db.query("INSERT INTO museum (name) VALUES (?)", [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  });
});
app.get("/museum", (req, res) => {
  db.query("SELECT * FROM museum", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add and get Buildings
app.post("/addBuilding", (req, res) => {
  const name = req.body.name;
  const city = req.body.city;
  const address = req.body.address;
  const MuseumID = req.body.MuseumID;
  console.log(MuseumID);
  db.query(
    "INSERT INTO building (name,city,address,MuseumID) VALUES (?,?,?,?)",
    [name, city, address, MuseumID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.get("/building", (req, res) => {
  db.query("SELECT * FROM building", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//add and get Sections
app.post("/addSection", (req, res) => {
  const name = req.body.Name;
  const description = req.body.Description;
  const BuildingID = req.body.BuildingID;
  db.query(
    "INSERT INTO section (name,description,BuildingID) VALUES (?,?,?)",
    [name, description, BuildingID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.get("/Section", (req, res) => {
  db.query("SELECT * FROM section", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// add and get Display
app.post("/addDisplay", (req, res) => {
  const name = req.body.Name;
  const theme = req.body.Theme;
  const permanent = req.body.permanent;
  const startDate = req.body.StartDate == "" ? null : req.body.startDate;
  const endDate = req.body.EndDate == "" ? null : req.body.endDate;
  const curator = req.body.Curator;
  const designer = req.body.Designer;
  const shortDescription = req.body.ShortDesc;
  const reason = req.body.Reason;
  const sectionID = req.body.SectionID;
  db.query(
    "INSERT INTO display (Name, Theme,permanent,StartDate,EndDate,Curator,Designer, ShortDesc, Reason, SectionID) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      name,
      theme,
      permanent,
      startDate,
      endDate,
      curator,
      designer,
      shortDescription,
      reason,
      sectionID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/Display", (req, res) => {
  db.query("SELECT * FROM display", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// add and get Showcase
app.post("/addShowcase", (req, res) => {
  const Number = req.body.Number;
  const Name = req.body.Name;
  const Descr = req.body.Desc;
  const Type = req.body.Type;
  const SpecialCare = req.body.SpecialCare;
  const DisplayID = req.body.DisplayID;

  db.query(
    "INSERT INTO showcase (Number,Name,Descr,Type,SpecialCare,DisplayID) VALUES (?,?,?,?,?,?)",
    [Number, Name, Descr, Type, SpecialCare, DisplayID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/Showcase", (req, res) => {
  db.query("SELECT * FROM showcase", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Get Post Item

app.get("/Item", (req, res) => {
  db.query("SELECT * FROM item", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addItem", (req, res) => {
  const ID = req.body.ID;
  const name = req.body.name;
  const descr = req.body.descr;
  const shortDescr = req.body.shortDescr;
  const storage = req.body.storage;
  const displayID = req.body.displayID == "" ? null : req.body.displayID;
  const showcaseID = req.body.showcaseID == "" ? null : req.body.showcaseID;
  const site = req.body.site;
  const period = req.body.period;
  const age = req.body.age;
  const material = req.body.material;
  const website = req.body.website;
  const size = req.body.size;
  const references = req.body.references;
  const itemData = req.body.itemData;
  const data = itemData.map((x) =>
    Object.keys(x)
      .filter((key) => key != "id")
      .map((key) => `${key} => ${x[key]}`)
      .join(" &&& ")
  );
  const data1 = data.map((temp) => temp + "^%^");
  console.log(data1.toString());
  console.log(data1.toString().split("^%^"));

  db.query(
    "INSERT INTO item (ItemID, ItemName, Descr, ShortDescr, InStorage, DisplayID, ShowcaseID, Site, Period, Age, Material, Website, Size, Refs, ItemData) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      ID,
      name,
      descr,
      shortDescr,
      storage,
      displayID,
      showcaseID,
      site,
      period,
      age,
      material,
      website,
      size,
      references,
      data1.toString(),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function (req, file, cb) {
//     cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
// }).single("myImage");

// // test
// app.post("/upload", (req, res) => {
//   upload(req, res, function (err) {
//     console.log("Request ---", req.body);
//     console.log("Request file ---", req.file); //Here you get file.
//     /*Now do where ever you want to do*/
//     if (!err) {
//       return res.send(200).end();
//     }
//   });
// });

//TEST
const multerGoogleStorage = require("multer-google-storage");
const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    bucket: "mophm2022",
    projectId: "concise-decker-339115",
    keyFilename: "./server/concise-decker-339115-ad248b789424.json",
    filename: (req, file, cb) => {
      cb(null, `/projectimages/${Date.now()}_${file.originalname}`);
      console.log(file);
    },
  }),
});

app.post("/upload", uploadHandler.any(), function (req, res) {
  console.log(req.files);
  res.json(req.files);
});

app.get("/", function (req, res) {
  console.log("i am here");
  res.json("Hello hallo");
});

app.get("/test", function (req, res) {
  console.log("asd");
  res.json("zxczxcasdnplo");
});

app.listen(port, () => {
  console.log("Yey, your server is running on port HADA" + port);
});
