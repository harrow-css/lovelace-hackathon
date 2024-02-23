<template>
  <div class="container">
    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row align-items-start">
            <div class="col-lg-9">
              <h1>
                Hey,
                <i>{{ userdata.given_name }} {{ userdata.family_name }}</i>
              </h1>
              <h5>
                You're representing
                <i>{{ userdata.email.split('@').pop().split('.')[0] }}</i>
              </h5>
            </div>
            <div class="col-lg-3">
              <a
                class="btn btn-outline-danger float-end"
                type="button"
                @click="
                  $auth.logout()
                  $auth.$storage.setUniversal('jwt_decoded', null)
                "
                >Logout</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row align-items-start">
            <h1>Your Team</h1>

            <OldTerminal>
              <div class="row">
                <div class="col-3">
                  <u>Team Name</u><br />
                  <span>{{ teamdata['TeamName:1'] }}</span>
                </div>
                <div class="col-9">
                  <u>Team Members</u><br />
                  {{ teamdata.members }}
                </div>
              </div>

              <br />
              <div class="row">
                <div class="col-3">
                  <u>School</u><br />
                  {{ teamdata.School }}
                </div>

                <div class="col-9">
                  <div v-if="!editingParticipationLevel">
                    <u>Main participation level</u><br />
                    {{ teamdata.ChosenQuestionLevel }}
                    <span
                      class="hoverunderline"
                      v-on:click="
                        editingParticipationLevel = !editingParticipationLevel
                      "
                      >[change]</span
                    >
                  </div>
                  <div v-if="editingParticipationLevel">
                    <u>Change participation level</u><br />
                    <span>[{{ teamdata.ChosenQuestionLevel }}]</span> -> [<span
                      v-on:click="selectParticipationLevel('Red')"
                      class="flash hoverunderline"
                      >Red</span
                    >] [<span
                      v-on:click="selectParticipationLevel('Yellow')"
                      class="flash hoverunderline"
                      >Yellow</span
                    >] [<span
                      v-on:click="selectParticipationLevel('Green')"
                      class="flash hoverunderline"
                      >Green</span
                    >]
                  </div>
                </div>
              </div>

              <br />

              <div class="row">
                <div class="col-5">
                  <u>Points</u>
                  <pre>
+----------------------------+
| Points Summary             |
+========================+===+
| Red Problems Solved    |{{ paddedpointsSummary.red }}|
+------------------------+---+
| Yellow Problems Solved |{{ paddedpointsSummary.yellow }}|
+------------------------+---+
| Green Problems Solved  |{{ paddedpointsSummary.green }}|
+------------------------+---+
| Total Problems Solved  |{{ paddedpointsSummary.total }}|
+------------------------+---+</pre
                  >
                </div>

                <div class="col-7">
                  <u>Solved Problems</u>
                  <br />

                  <div v-for="problem in solvedProblems">
                    <span v-if="problem.level == 'red'" style="color: red"
                      >({{ problem.id }})
                    </span>
                    <span v-if="problem.level == 'yellow'" style="color: yellow"
                      >({{ problem.id }})</span
                    >
                    <span v-if="problem.level == 'green'" style="color: #00ff00"
                      >({{ problem.id }})</span
                    >
                    {{ problem.title }}
                    <br />
                  </div>
                </div>
              </div>
            </OldTerminal>

            <p>
              Teams can choose what category they would like to compete in.
              Teams can answer questions from any category, but they will only
              be scored on their chosen category.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row align-items-start">
            <h1>Questions</h1>

            <OldTerminal>
              <center>{{ counddownTimeUntilEnd }}</center>
              <center>{{ counddownTimeFromStart }}</center>
              <br />
              <div class="row">
                <div class="col-4">
                  <pre style="display: flex; justify-content: center">
  ,=====================.
  |.-------------------.|
  ||[=========]| o  (@) |
  |`---------=='/u\ --- |
  |------_--------------|
  | (/) (_)           []|
  |---==--==----------==|
  |||||||||||||||||||||||
  |||||||||||||||||||||||
  |||||||||||||||||||||||
  |||||||||||||||||||||||
  |||||||||||||||||||||||
  |||||||||||||||||||||||
  |||||||||||||||||||||||
  |=====================|</pre
                  >
                  <br />
                </div>
                <div class="col-4">
                  <pre style="display: flex; justify-content: center">

   +--------------+
   |.------------.|
   ||            ||
   ||            ||
   ||            ||
   ||            ||
   |+------------+|
   +-..--------..-+
   .--------------.
  / /============\ \
 / /==============\ \
/____________________\
\____________________/</pre
                  >
                  <br />
                </div>
                <div class="col-4">
                  <pre style="display: flex; justify-content: center">



     _________
    / ======= \
   / __________\
  | ___________ |
  | | -       | |
  | |         | |
  | |_________| |
  \=____________/ 
  / """"""""""" \ 
 / ::::::::::::: \ 
(_________________)</pre
                  >
                  <br />
                </div>
              </div>

              <div class="row">
                <div class="col-4 text-center">
                  <u>Red Questions</u> <br />
                  For experienced programmers.<br />
                  Targeted to 14-18 year olds
                </div>
                <div class="col-4 text-center">
                  <u>Yellow Questions</u> <br />
                  For intermediate programmers. <br />
                  Targeted to 11-13 year olds
                </div>
                <div class="col-4 text-center">
                  <u>Green Questions</u> <br />
                  For beginner programmers. <br />
                  Targeted for 6-10 year olds
                </div>
              </div>

              <br />
              <div class="row">
                <div class="col-4 text-center">
                  <div v-for="question in questiondata.red">
                    <NuxtLink :to="'/problems/' + question.id" class="NuxtLink">
                      <span
                        v-if="question.solved"
                        style="text-decoration: line-through"
                        >({{ question.id }}) {{ question.Questiontitle }}</span
                      >
                      <span v-if="!question.solved"
                        >({{ question.id }}) {{ question.Questiontitle }}</span
                      >
                    </NuxtLink>
                  </div>
                </div>
                <div class="col-4 text-center">
                  <div v-for="question in questiondata.yellow">
                    <NuxtLink :to="'/problems/' + question.id" class="NuxtLink">
                      <span
                        v-if="question.solved"
                        style="text-decoration: line-through"
                        >({{ question.id }}) {{ question.Questiontitle }}</span
                      >
                      <span v-if="!question.solved"
                        >({{ question.id }}) {{ question.Questiontitle }}</span
                      >
                    </NuxtLink>
                  </div>
                </div>
                <div class="col-4 text-center">
                  <div v-for="question in questiondata.green">
                    <NuxtLink :to="'/problems/' + question.id" class="NuxtLink">
                      <span
                        v-if="question.solved"
                        style="text-decoration: line-through"
                        >({{ question.id }}) {{ question.Questiontitle }}</span
                      >
                      <span v-if="!question.solved"
                        >({{ question.id }}) {{ question.Questiontitle }}</span
                      >
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </OldTerminal>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row align-items-start">
            <h1>Information</h1>

            <div class="py-3">
              <h3>How does the scoring work?</h3>
              <p>
                Teams can answer questions from any category (red, yellow,
                green), but they only the scores on their chosen category will
                be counted.
              </p>
              <p>
                Teams can view or edit their chosen category at any time on the
                'Your Team' tab above under 'Main participation level'.
              </p>
              <p>
                Feel free to tackle any questions, but please ensure that you
                choose a final category that matches the skill level of your
                team.
              </p>
            </div>

            <div class="py-3">
              <h3>What languages can I use?</h3>
              <p>
                Python is the only language we are currently supporting with the
                automarker. Solutions in C++ and NodeJS are accepted over email
                <a
                  href="mailto:19kainthd@harrowschool.org.uk,19songy@harrowschool.org.uk?subject=Alternative Language Solution Request"
                  class="text-white"
                  >here</a
                >, but will not be automatically marked.
              </p>
            </div>

            <div class="py-3">
              <h3>What resources can I use?</h3>
              <p>You can use any resources online to aid your problem solving. However, please do not submit AI generated solutions, as they ruin the spirit of the competition.</p>
            </div>

            <div class="py-3">
              <h3>Team Changes</h3>
              <p>If you've joined in a team with less than 4 people and would like to add an additional person, please get in touch via email <a
                  href="mailto:19kainthd@harrowschool.org.uk,19songy@harrowschool.org.uk?subject=Team Enquiry"
                  class="text-white"
                  >here</a
                ></p>
            </div>

            <div class="py-3">
              <h3>I'm having trouble with the automarker</h3>
              <p>
                If you're struggling with the automarker, please contact us via
                email
                <a
                  href="mailto:19kainthd@harrowschool.org.uk,19songy@harrowschool.org.uk?subject=Automark Problem"
                  class="text-white"
                  >here</a
                >. Include the number of the question you're struggling with and
                attach your code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row align-items-start">
            <h1>Acknowledgements</h1>

            <h5><u>Organisers</u></h5>
            <p>Vincent S and Dylan K</p>

            <div class="row">
              <div class="col">
                <h5><u>Question Writing Team</u></h5>
                <p>
                  Vincent S
                </p>
                <p>
                  Alex H
                </p>
                <p>
                  Alex Y
                </p>
                <p>
                  Hayden L
                </p>
                <p>
                  Andrew P
                </p>
                <p>
                  Vinsson L
                </p>
                 <p>
                  Richard Z
                </p>
                
              </div>
              <div class="col">
              <h5><u>Web Development</u></h5>
              <p>
                Dylan K
              </p>

              <h5><u>Many thanks to</u></h5>
              <p>
                Dr C M Crowe
              </p>

              <h5><u>Hosted using</u></h5>
              <p>
                <a href="https://digitalocean.com/" class="text-white">DigitalOcean</a> - Thank you for free credits!
              </p>
               <p>
                Powered by  <a href="https://www.getgrist.com/" class="text-white">Grist</a>
              </p>

              </div>
            </div>




      
          </div>
        </div>
      </div>
    </div>


    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row">

          <center>
            <img style="height:100px; width:auto;" src="/templogoceladon.png"> 
            </center>
            <p class="text-center">Harrow School Computer Science Society</p>
      
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',

  created() {
    setInterval(() => (this.now = new Date()), 1000)
  },

  async asyncData(context) {
    var teamdata = await context.app.$axios.$get('/api/getTeamInfo')
    var questiondata = await context.app.$axios.$get('/api/getQuestionsInfo')

    var pointsSummary = {
      red: 0,
      yellow: 0,
      green: 0,
      total: 0,
    }

    // calculate the points summary
    for (var i = 0; i < questiondata.red.length; i++) {
      if (questiondata.red[i].solved) {
        pointsSummary.red++
        pointsSummary.total++
      }
    }
    for (var i = 0; i < questiondata.yellow.length; i++) {
      if (questiondata.yellow[i].solved) {
        pointsSummary.yellow++
        pointsSummary.total++
      }
    }
    for (var i = 0; i < questiondata.green.length; i++) {
      if (questiondata.green[i].solved) {
        pointsSummary.green++
        pointsSummary.total++
      }
    }

    // create paddedpointsSummary, which makes each value a string of length 3
    var paddedpointsSummary = {
      red: pointsSummary.red.toString().padStart(3, '0'),
      yellow: pointsSummary.yellow.toString().padStart(3, '0'),
      green: pointsSummary.green.toString().padStart(3, '0'),
      total: pointsSummary.total.toString().padStart(3, '0'),
    }

    // create one solved problems list with names and numbers of all the problems solved
    var solvedProblems = []

    for (var i = 0; i < questiondata.red.length; i++) {
      if (questiondata.red[i].solved) {
        solvedProblems.push({
          level: 'red',
          id: questiondata.red[i].id,
          title: questiondata.red[i].Questiontitle,
        })
      }
    }
    for (var i = 0; i < questiondata.yellow.length; i++) {
      if (questiondata.yellow[i].solved) {
        solvedProblems.push({
          level: 'yellow',
          id: questiondata.yellow[i].id,
          title: questiondata.yellow[i].Questiontitle,
        })
      }
    }
    for (var i = 0; i < questiondata.green.length; i++) {
      if (questiondata.green[i].solved) {
        solvedProblems.push({
          level: 'green',
          id: questiondata.green[i].id,
          title: questiondata.green[i].Questiontitle,
        })
      }
    }

    // sort the problems by id
    solvedProblems.sort((a, b) => a.id - b.id)

    return {
      userdata: context.app.$auth.$storage.getUniversal('jwt_decoded'),
      teamdata: teamdata.team,
      questiondata: questiondata,
      paddedpointsSummary: paddedpointsSummary,
      solvedProblems: solvedProblems,
    }
  },
  methods: {
    selectParticipationLevel: function (level) {
      this.teamdata.ChosenQuestionLevel = level
      this.editingParticipationLevel = false

      this.$axios.post('/api/setParticipationLevel', { level: level })
    },
  },
  data() {
    return { userdata: null, editingParticipationLevel: false, now: new Date() }
  },
  computed: {
    counddownTimeUntilEnd: function () {
      const targetDate = new Date('2024-02-24T12:00:00Z')
      const currentDate = this.now
      const timeUntilTarget = targetDate.getTime() - currentDate.getTime()

      const days = Math.floor(timeUntilTarget / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (timeUntilTarget % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor(
        (timeUntilTarget % (1000 * 60 * 60)) / (1000 * 60)
      )
      const seconds = Math.floor((timeUntilTarget % (1000 * 60)) / 1000)

      return `Time until end: ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    },
    counddownTimeFromStart: function () {
      const targetDate = new Date('2024-02-23T12:00:00Z')
      const currentDate = this.now
      const timeUntilTarget = currentDate.getTime() - targetDate.getTime()

      const days = Math.floor(timeUntilTarget / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (timeUntilTarget % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor(
        (timeUntilTarget % (1000 * 60 * 60)) / (1000 * 60)
      )
      const seconds = Math.floor((timeUntilTarget % (1000 * 60)) / 1000)

      return `Time from start: ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    },
    inTimeRange: function () {
      // if after new Date('2024-02-24T12:00:00Z');, set to false, otherwise true
      return this.now < new Date('2024-02-24T12:00:00Z')
    },
  },
}
</script>

<style>
.NuxtLink {
  text-decoration: none;
}
.NuxtLink:hover {
  text-decoration: underline;
  /* set underline to white */
  color: white;
}
.flash {
  animation: flashinganimation 1s step-start infinite;
}
@keyframes flashinganimation {
  50% {
    opacity: 0.5;
  }
}

.hoverunderline:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
