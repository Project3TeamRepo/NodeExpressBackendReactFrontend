const express = require ('express');
const bodyParser = require ("body-parser");
const path = require('path');
const app = express();
const port = 5000;

app.get("/api/customers", (req, res) => {
    const data = [
        {id: 1, name: "obj1", size: "large"},
        {id: 2, name: "obj2", size: "large2"},
        {id: 3, name: "obj3", size: "large3"}
    ];
    res.json(data);
});

app.get("/api/calendars", (req, res) => {
    const calendarResults = [
          {_id: "1", title: "Big Presentation", date: "2018-12-01 00:05:00", location: "CityPlace"},
          {_id: "2",title: "Graduation!", date: "2018-12-04 00:10:00", location: "Mom's House"},
          {_id: "3",title: "Appointment", date: "2018-11-21 00:11:00", location: "Dr. Feelgood"},
          {_id: "4",title: "Hair Cut", date: "2018-11-21 00:12:00", location: "Lure Salon"},
        ]
    res.json(calendarResults);
})

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => console.log(`Server started on port ${port}`));