const express = require('express')
const app = express()
// include axios
const axios = require('axios')

//import and run dotenv
require('dotenv').config()
app.use(express.json())

import { jwtDecode } from "jwt-decode";

// this route is fired on auth to check if the user is allowed to access the application
app.get('/checkLogin', (req, res) => {
  // make email lower case
  const email = req.query.email.toLowerCase()
  // get the domain from the email
  const domain = email.split('@').pop().split('.').shift()
    // get part of email before @ (username)
  const username = email.split('@')[0]

  // send an axios request
  axios.get('https://admin.lovelacehackathon.com/api/docs/aaYvahhciDrtFrFytKRZwy/sql', {
    params: {
      'q': "select * from Users where school='"+domain+"' and user='"+username+"'"
    },
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer '+ process.env.GRIST_API,
    }
  }).then(function (response) {
    // get length of response.data.records
    const length = response.data.records.length
    
    if (length == 1) {
      // if the length is greater than 0, then the user is allowed to access the application
      res.send({allowed: true})
    }
    else {
      // if the length is 0, then the user is not allowed to access the application
      res.send({allowed: false})
    }
  })
});


app.get('/getTeamInfo', async (req, res) => {
  // get authorization  header
  const token = req.headers.authorization

  // decode the token
  const decoded = jwtDecode(token)

  // get the email from the decoded token
  const email = decoded.upn.toLowerCase()

  // get the domain from the email
  const domain = email.split('@').pop().split('.').shift()

  // get part of email before @ (username)
  const username = email.split('@')[0]

  // send an axios request
  var teamdetails = await axios.get('https://admin.lovelacehackathon.com/api/docs/aaYvahhciDrtFrFytKRZwy/sql', {
    params: {
      'q': "SELECT * FROM users U LEFT JOIN teams T ON (U.gristHelper_Display2 = T.TeamName) WHERE U.User = '"+username+"'"
    },
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer '+ process.env.GRIST_API,
    }
  })

  var teammembers = await axios.get('https://admin.lovelacehackathon.com/api/docs/aaYvahhciDrtFrFytKRZwy/sql', {
    params: {
      'q': "SELECT * FROM users where TeamName = '"+teamdetails.data.records[0].fields.TeamName+"'"
    },
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer '+ process.env.GRIST_API,
    }
  })


  var teamdescription = teamdetails.data.records[0].fields
  teamdescription.members = teammembers.data.records.map(record => record.fields.User)
  res.send({team: teamdescription})

});

app.post('/setParticipationLevel', async (req, res) => {
  const token = req.headers.authorization

  // decode the token
  const decoded = jwtDecode(token);

  // get the email from the decoded token
  const email = decoded.upn.toLowerCase();

  // get the domain from the email
  const domain = email.split('@').pop().split('.').shift();

  // get part of email before @ (username)
  const username = email.split('@')[0];

  const newParticipationLevel = req.body.level;
  
  // get team of user
  var userteam = await axios.get('https://admin.lovelacehackathon.com/api/docs/aaYvahhciDrtFrFytKRZwy/sql', {
    params: {
      'q': "SELECT Teamname FROM users WHERE User = '"+username+"'"
    },
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer '+ process.env.GRIST_API,
    }
  })

  var teamNumber = userteam.data.records[0].fields.Teamname

  // send an axios request
  var teamChange = await axios.patch(
    'https://admin.lovelacehackathon.com/api/docs/aaYvahhciDrtFrFytKRZwy/tables/Teams/records',
    {
      'records': [
        {
          'id': parseInt(teamNumber),
          'fields': {
            'ChosenQuestionLevel': newParticipationLevel
          }
        }
      ]
    },
    {
      headers: {
        'accept': '*/*',
        'Authorization': 'Bearer '+ process.env.GRIST_API,
        'Content-Type': 'application/json'
      }
    }
  )

  res.sendStatus(200);

});

app.get('/getQuestionInfo', async (req, res) => {
   // get authorization  header
   const token = req.headers.authorization

   // decode the token
   const decoded = jwtDecode(token)
 
   // get the email from the decoded token
   const email = decoded.upn.toLowerCase()
 
   // get the domain from the email
   const domain = email.split('@').pop().split('.').shift()
 
   // get part of email before @ (username)
   const username = email.split('@')[0]

    // send an axios request
  var teamdetails = await axios.get('https://admin.lovelacehackathon.com/api/docs/aaYvahhciDrtFrFytKRZwy/sql', {
    params: {
      'q': "SELECT QuestionsSolved FROM users U LEFT JOIN teams T ON (U.gristHelper_Display2 = T.TeamName) WHERE U.User = '"+username+"'"
    },
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer '+ process.env.GRIST_API,
    }
  })

  var questionsSolved = (JSON.parse(teamdetails.data.records[0].fields.QuestionsSolved))

  var questionInfo = await axios.get('https://admin.lovelacehackathon.com/api/docs/aaYvahhciDrtFrFytKRZwy/sql', {
    params: {
      'q': "SELECT Questiontitle, id, Difficulty FROM Questions"
    },
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer '+ process.env.GRIST_API,
    }
  })

  var questions = questionInfo.data.records.map(record => record.fields)

  questions.forEach(question => {
    if (questionsSolved.includes(question.id)) {
      question.solved = true
    }
    else {
      question.solved = false
    }
  })

  // sort questions into difficulty (red,yellow,green)
  var red = questions.filter(question => question.Difficulty == "Red")
  var yellow = questions.filter(question => question.Difficulty == "Yellow")
  var green = questions.filter(question => question.Difficulty == "Green")

  res.send({red: red, yellow: yellow, green: green});
});

// Needed for nuxt.js
module.exports = {
  path: '/api',
  handler: app,
}
