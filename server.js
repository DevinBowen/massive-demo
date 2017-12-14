const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const connectionString = 'postgres://xizctcmuiremxe:cfae0b6a20a8a0ebad1077dd27ce448ca111982012a3eaa1c45861210772a1c9@ec2-23-21-231-58.compute-1.amazonaws.com:5432/deaan9t5m75c3d?ssl=true'


const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get('db' );
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  })
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db' );
  const state = req.query.state;
  if(state){
    db.getIncidentsByState([state]).then(incidents => {
      res.send(incidents);
    })
  }
  else {
  db.getAllIncidents().then(incidents => {
    res.send(incidents);
  })
}
});

app.post('/incidents', (req, res) => {
  const incident = req.body;
  // console.log(incident)
  const db = req.app.get('db' );

  db.createIncident([
    incident.state,
    incident.injuryID,
    incident.causeID
  ]).then(results => {
    res.send(results[0]);
  })
});

app.patch('/incidents/:id', (req, res) => {
  const id = req.params.id;
  const fields = req.body;
  const db = req.app.get('db' );

  db.updateIncidents([fields.state, id]).then(results => {
    res.send(results);
  });
});


massive(connectionString).then(db => {

  app.set('db', db);
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
});
