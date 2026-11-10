const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

let studySessions = [
  {
    subject: 'C237 Software Application Development',
    date: '2026-05-17',
    duration: 2,
    rating: 4,
    notes: 'Practised Express routes and EJS rendering'
  },
  {
    subject: 'Mathematics',
    date: '2026-05-18',
    duration: 1.5,
    rating: 3,
    notes: 'Revised algebra questions'
  }
];

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/sessions', (req, res) => {
  const selectedSubject = req.query.subject;

  let filteredSessions = studySessions;

  if (selectedSubject) {
    filteredSessions = studySessions.filter(session => session.subject === selectedSubject);
  }

  const subjects = [...new Set(studySessions.map(session => session.subject))];

  res.render('sessions', {
    studySessions: filteredSessions,
    selectedSubject: selectedSubject,
    subjects:subjects
  });
});


app.get('/add', (req, res) => {
  res.render('addSession',
    {    
        subject: '',
        date: '',
        duration: '',
        rating: '',
        notes:' '


    });
});

app.post('/submit', (req, res) => {
  const newSession = {
    subject: req.body.subject,
    date: req.body.date,
    duration: req.body.duration,
    rating: req.body.rating,
    notes: req.body.notes
  };

  studySessions.push(newSession);

  res.redirect('/sessions');
});

app.get('/sessions/:id', (req, res) => {
  const id = req.params.id;
  const session = studySessions[id];

  res.render('sessionDetails', { session });
});

app.get('/sessions/:id/edit', (req, res) => {
  const id = req.params.id;
  const session = studySessions[id];

  res.render('editSession', { session, id });
});

app.post('/submit2/:id', (req, res) => {
  const id = req.params.id;

  studySessions[id] = {
    subject: req.body.subject,
    date: req.body.date,
    duration: req.body.duration,
    rating: req.body.rating,
    notes: req.body.notes
  };

  res.redirect('/sessions');
});

app.post('/sessions/:id/delete', (req, res) => {
  const id = req.params.id;

  studySessions.splice(id, 1);

  res.redirect('/sessions');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});