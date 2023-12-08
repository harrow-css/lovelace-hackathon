<template>
<div class="container">

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 cardcolour1 rounded-3 shadow d-flex flex-column"
        >
          <div class="row align-items-start">
            <div class="col-lg-11">
              <h1>
                Hey,
                <i>{{ userdata.given_name }} {{ userdata.family_name }}</i>
              </h1>
              <h3>
                You're representing <i>{{ userdata.upn.split('@').pop().split('.')[0] }}</i> in team 
              </h3>

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
</div>
</template>

<script>
export default {
    middleware: 'isAuthenticated',


        asyncData (context) {
    return {
      userdata: context.app.$auth.$storage.getUniversal('jwt_decoded')
    }
  },
  data () {
    return { userdata: null }
  }
}
</script>
