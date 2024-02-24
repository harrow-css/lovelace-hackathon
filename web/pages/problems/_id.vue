<template>
  <div class="container">
    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row align-items-start">
            <div class="col-lg-9">
              <h1>
                Problem {{ $route.params.id }}: {{ questionData.QuestionTitle }}
              </h1>
              <h5>
                {{ questionData.Difficulty }} difficulty. Question by
                {{ questionData.QuestionAuthor }}
              </h5>
            </div>
            <div class="col-lg-3">
              <div class="d-grid gap-2 d-md-block float-end">
                <NuxtLink class="btn btn-light" type="button" to="/welcome"
                  >Home</NuxtLink
                >
                <button
                  class="btn btn-outline-danger"
                  @click="
                    $auth.logout()
                    $auth.$storage.setUniversal('jwt_decoded', null)
                  "
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row align-items-start">
            <div v-html="$md.render(questionData.QuestionDescription)"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4" v-show="!this.questionData.solved">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow">
          <div class="row align-items-start">
            <div class="row">
              <div class="col">
                <h3>Submit a solution</h3>
              </div>
              <div class="col">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="languagePicker"
                >
                  <option style="color: black" selected value="Python">
                    Python 3.12.0
                  </option>
                  <option style="color: gray" value="Node.js" disabled>
                    Node.js 18.15.0
                  </option>
                  <option style="color: gray" value="c++" disabled>
                    c++ 10.2.0
                  </option>
                </select>
              </div>
            </div>

            <div
              id="solutionBox"
              :disabled="this.questionData.solved"
              style="color: black"
            ></div>

            <div class="d-grid gap-2 d-md-block py-3">
              <button
                class="btn btn-primary"
                type="button"
                @click="runCode()"
                :disabled="
                  this.questionData.solved || spinners.run || !inTimeRange
                "
              >
                <span v-if="spinners.run"
                  ><div class="spinner-border" role="status"></div
                ></span>
                <span v-if="!spinners.run">Run</span>
              </button>
              <button
                class="btn btn-warning"
                type="button"
                @click="autoMark()"
                :disabled="
                  this.questionData.solved || spinners.submit || !inTimeRange
                "
              >
                <span v-if="spinners.submit"
                  ><div class="spinner-border" role="status"></div
                ></span>
                <span v-if="!spinners.submit">Submit</span>
              </button>
            </div>

            <div
              style="
                color: white;
                height: 300px;
                background-color: #737373;
                overflow-y: scroll;
              "
            >
              <div v-if="codeResponses">
                <span v-for="codeResponse in codeResponses">
                  <span
                    v-html="codeResponse.run.output"
                    v-if="codeResponse.type == 'run'"
                  ></span>
                  <span
                    v-html="codeResponse.run.output"
                    v-if="codeResponse.type == 'submit'"
                    class="text-warning"
                  ></span>
                  <br />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4" v-show="this.questionData.solved">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow">
          <h3>Your team solved the problem!</h3>
          <p>Your team solved the problem with the following solution:</p>
          <!-- display the python code in a code block -->
          <pre><code>{{ questionData.solution }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/*

    Name:       Bespin
    Author:     Mozilla / Jan T. Sott

    CodeMirror template by Jan T. Sott (https://github.com/idleberg/base16-codemirror)
    Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16)

*/

.cm-s-bespin.CodeMirror {
  background: #28211c;
  color: #9d9b97;
}
.cm-s-bespin div.CodeMirror-selected {
  background: #59554f !important;
}
.cm-s-bespin .CodeMirror-gutters {
  background: #28211c;
  border-right: 0px;
}
.cm-s-bespin .CodeMirror-linenumber {
  color: #666666;
}
.cm-s-bespin .CodeMirror-cursor {
  border-left: 1px solid #797977 !important;
}

.cm-s-bespin span.cm-comment {
  color: #937121;
}
.cm-s-bespin span.cm-atom {
  color: #9b859d;
}
.cm-s-bespin span.cm-number {
  color: #9b859d;
}

.cm-s-bespin span.cm-property,
.cm-s-bespin span.cm-attribute {
  color: #54be0d;
}
.cm-s-bespin span.cm-keyword {
  color: #cf6a4c;
}
.cm-s-bespin span.cm-string {
  color: #f9ee98;
}

.cm-s-bespin span.cm-variable {
  color: #54be0d;
}
.cm-s-bespin span.cm-variable-2 {
  color: #5ea6ea;
}
.cm-s-bespin span.cm-def {
  color: #cf7d34;
}
.cm-s-bespin span.cm-error {
  background: #cf6a4c;
  color: #797977;
}
.cm-s-bespin span.cm-bracket {
  color: #9d9b97;
}
.cm-s-bespin span.cm-tag {
  color: #cf6a4c;
}
.cm-s-bespin span.cm-link {
  color: #9b859d;
}

.cm-s-bespin .CodeMirror-matchingbracket {
  text-decoration: underline;
  color: white !important;
}
.cm-s-bespin .CodeMirror-activeline-background {
  background: #404040;
}
</style>

<script>
export default {
  middleware: 'isAuthenticated',

  mounted() {

    // get saved question from nuxt store 
    var savedQuestion = this.$store.state.programs[this.$route.params.id]

    if (savedQuestion) {
      console.log('using saved question')
      var value = savedQuestion
    } else {
      var value = 'def solution():\n    return "Hello World"'
    }

    this.myCodeMirror = CodeMirror(document.querySelector('#solutionBox'), {
      lineNumbers: true,
      tabSize: 2,
      value: value,
      theme: 'bespin',
      mode: 'python',
    })
  },
  data() {
    return {
      spinners: {
        run: false,
        submit: false,
      },
      myCodeMirror: null,
      languagePicker: 'Python',
      codeResponses: [],
      now: new Date(),
    }
  },

  computed: {
    counddownTimeUntilEnd: function () {
      const targetDate = new Date('2024-02-25T00:00:00Z')
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
      return this.now < new Date('2024-02-25T00:00:00Z')
    },
  },

  methods: {
    confettiRun() {
      this.$confetti.start()
      // stop the confetti after 5 seconds
      setTimeout(() => {
        this.$confetti.stop()
      }, 5000)
    },
    runCode() {
      this.$store.commit('updateProgram', [this.myCodeMirror.getValue(), this.$route.params.id])
      this.spinners.run = true
      this.$axios
        .$post('/api/runCode', {
          questionID: this.$route.params.id,
          solution: this.myCodeMirror.getValue(),
          language: this.languagePicker,
        })
        .then((response) => {
          this.spinners.run = false
          // add the response to the codeResponses array
          response.type = 'run'
          this.codeResponses.push(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    autoMark() {
      this.$store.commit('updateProgram', [this.myCodeMirror.getValue(), this.$route.params.id])
      
      this.spinners.submit = true
      this.$axios
        .$post('/api/autoMark', {
          questionID: this.$route.params.id,
          solution: this.myCodeMirror.getValue(),
          language: this.languagePicker,
        })
        .then((response) => {
          this.spinners.submit = false
          // add the response to the codeResponses array
          this.questionData.solved = response.correct
          this.questionData.syntaxError = response.syntaxError

          // if the response.correct is true, run the confetti
          if (response.correct) {
            this.confettiRun()
            this.questionData.solution = this.myCodeMirror.getValue()
          } else {
            if (response.syntaxError) {
              var a = {
                type: 'submit',
                run: {
                  output: 'Your solution had a syntax error. Please try again.',
                },
              }
              this.codeResponses.push(a)
            } else {
              var a = {
                type: 'submit',
                run: {
                  output:
                    'Your solution was incorrect. Please try again. It passed ' +
                    response.results +
                    ' test cases.',
                },
              }
              this.codeResponses.push(a)
            }
            
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  async asyncData(context) {
    var questionData = await context.app.$axios.$get('/api/getQuestionInfo', {
      params: {
        questionID: context.params.id,
      },
    })

    return {
      userdata: context.app.$auth.$storage.getUniversal('jwt_decoded'),
      questionData: questionData
    }
  },

  watch: {
    // whenever question changes, this function will run
    languagePicker: function (newLanguage, oldLanguage) {
      if (newLanguage === 'Python') {
        this.myCodeMirror.setOption('mode', 'python')
      } else if (newLanguage === 'Node.js') {
        this.myCodeMirror.setOption('mode', 'javascript')
      } else if (newLanguage === 'c++') {
        this.myCodeMirror.setOption('mode', 'clike')
      }
    },
  },
}
</script>
