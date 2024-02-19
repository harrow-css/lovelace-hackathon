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
                {{ questionData.Difficulty }} difficulty. Question by {{ questionData.QuestionAuthor }}
                </h5>
            </div>
            <div class="col-lg-3">

            <div class="d-grid gap-2 d-md-block float-end">
              <NuxtLink class="btn btn-light" type="button" to="/welcome">Home</NuxtLink>
              <button class="btn btn-outline-danger" @click="$auth.logout()" type="button">Logout</button>
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

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column">
          <div class="row align-items-start">
            <h3>Submit a solution</h3>

            <div id="solutionBox" style="color:black;"></div>

            <div class="d-grid gap-2 d-md-block float-end pt-5">
              <button class="btn btn-primary" type="button" @click="submitSolution()">Submit</button>
            </div>

          </div>
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

.cm-s-bespin.CodeMirror {background: #28211c; color: #9d9b97;}
.cm-s-bespin div.CodeMirror-selected {background: #59554f !important;}
.cm-s-bespin .CodeMirror-gutters {background: #28211c; border-right: 0px;}
.cm-s-bespin .CodeMirror-linenumber {color: #666666;}
.cm-s-bespin .CodeMirror-cursor {border-left: 1px solid #797977 !important;}

.cm-s-bespin span.cm-comment {color: #937121;}
.cm-s-bespin span.cm-atom {color: #9b859d;}
.cm-s-bespin span.cm-number {color: #9b859d;}

.cm-s-bespin span.cm-property, .cm-s-bespin span.cm-attribute {color: #54be0d;}
.cm-s-bespin span.cm-keyword {color: #cf6a4c;}
.cm-s-bespin span.cm-string {color: #f9ee98;}

.cm-s-bespin span.cm-variable {color: #54be0d;}
.cm-s-bespin span.cm-variable-2 {color: #5ea6ea;}
.cm-s-bespin span.cm-def {color: #cf7d34;}
.cm-s-bespin span.cm-error {background: #cf6a4c; color: #797977;}
.cm-s-bespin span.cm-bracket {color: #9d9b97;}
.cm-s-bespin span.cm-tag {color: #cf6a4c;}
.cm-s-bespin span.cm-link {color: #9b859d;}

.cm-s-bespin .CodeMirror-matchingbracket { text-decoration: underline; color: white !important;}
.cm-s-bespin .CodeMirror-activeline-background { background: #404040; }
</style>

<script>
export default {
  middleware: 'isAuthenticated',

  mounted() {
    this.myCodeMirror = CodeMirror(document.querySelector('#solutionBox'), {
          lineNumbers: true,
          tabSize: 2,
          value: 'console.log("Hello, World");',
          theme: 'bespin'
        });
  },
  data() {
    return {
      myCodeMirror: null
    }
  },

  methods: { 
    submitSolution() {
      console.log(this.myCodeMirror.getValue());
    }
  },
  async asyncData(context) {
    var questionData = await context.app.$axios.$get('/api/getQuestionInfo', {
      params: {
        questionID: context.params.id
      }
    })

    return {
      userdata: context.app.$auth.$storage.getUniversal('jwt_decoded'),
      questionData: questionData
    }
  }
}
</script>
