<template>
  <div class="container">
    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row align-items-start">
            <div class="col-lg-11">
              <h1>
                Hey,
                <i>{{ userdata.given_name }} {{ userdata.family_name }}</i>
              </h1>
              <h5>
                You're representing
                <i>{{ userdata.upn.split('@').pop().split('.')[0] }}</i>
              </h5>
            </div>
            <div class="col-lg-1">
              <a
                class="btn btn-outline-light"
                type="button"
                @click="$auth.logout()"
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
| Red Problems Solved    |   |
+------------------------+---+
| Yellow Problems Solved |   |
+------------------------+---+
| Green Problems Solved  |   |
+------------------------+---+
| Total Problems Solved  |   |
+------------------------+---+</pre
                  >
                </div>

                <div class="col-7">
                  <u>Solved Problems</u>
                  <br />
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
                    <span
                      v-if="question.solved"
                      style="text-decoration: line-through"
                      >({{ question.id }}) {{ question.Questiontitle }}</span
                    >
                    <span v-if="!question.solved"
                      >({{ question.id }}) {{ question.Questiontitle }}</span
                    >
                  </div>
                </div>
                <div class="col-4 text-center">
                  <div v-for="question in questiondata.yellow">
                    <span
                      v-if="question.solved"
                      style="text-decoration: line-through"
                      >({{ question.id }}) {{ question.Questiontitle }}</span
                    >
                    <span v-if="!question.solved"
                      >({{ question.id }}) {{ question.Questiontitle }}</span
                    >
                  </div>
                </div>
                <div class="col-4 text-center">
                  <div v-for="question in questiondata.green">
                    <span
                      v-if="question.solved"
                      style="text-decoration: line-through"
                      >({{ question.id }}) {{ question.Questiontitle }}</span
                    >
                    <span v-if="!question.solved"
                      >({{ question.id }}) {{ question.Questiontitle }}</span
                    >
                  </div>
                </div>
              </div>
            </OldTerminal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',

  async asyncData(context) {
    var teamdata = await context.app.$axios.$get('/api/getTeamInfo')
    var questiondata = await context.app.$axios.$get('/api/getQuestionInfo')

    return {
      userdata: context.app.$auth.$storage.getUniversal('jwt_decoded'),
      teamdata: teamdata.team,
      questiondata: questiondata,
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
    return { userdata: null, editingParticipationLevel: false }
  },
}
</script>

<style>
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
