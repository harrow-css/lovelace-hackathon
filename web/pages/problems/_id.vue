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
