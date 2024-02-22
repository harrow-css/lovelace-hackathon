<template>
<div>
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <!-- <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> -->
            <img src="~/assets/lightpunchcard.svg" alt="logo" width="72" height="72">
            <span class="fs-2 pagetitle">Lovelace <br>Hackathon <span style="color: #B8DDB8;">'24</span></span>
        </a>

        
        <div v-if="(userdata) && this.$auth.loggedIn" class="col-md-3 text-end align-items-center" >
            <div class="row"><span class="fs-4">{{ userdata.given_name }} {{userdata.family_name }}</span></div>
            <div class="row"><span class="fs-6">{{ userdata.email.split('@').pop().split('.')[0] }}</span></div>
        </div>
    
        </header>

        <div v-if="!isMobile()"> 
            <Nuxt /> 
        </div>

        <div v-if="isMobile()"> 
            This site is not designed for mobile use. Please use a desktop or laptop.
        </div>

    </div>
    


</div>
</template>

<style>
.cardcolour1 {
    background-color: #494647;
}
body { 
    background-color: #211A1D;
}

* {
    color: #F8F0FB;
    font-family: 'Source Code Pro', monospace;
}

.pagetitle{
    font-family: 'Source Code Pro', monospace;
    font-weight: bold;
    line-height: 1.2em;
    font-size: 2.5em;
}

.btn-primary {
    background-color: #8075FF;
    border-color: #8075FF;
}

.btn-primary:hover {
    background-color: #6320EE;
    border-color: #6320EE;
}

.btn-primary:focus {
    background-color: #56339B !important;
    border-color: #56339B;
}

.btn-primary:active {
    background-color: #56339B !important;
    border-color: #56339B;
}

.btn-warning {
    background-color: #B8DDB8;
    border-color: #98d498;
    color:white;
}

.btn-warning:hover {
    background-color: #98d498;
    border-color: #98d498;
}

.btn-warning:focus {
    background-color: #72a872 !important;
    border-color: #72a872;
}

.btn-warning:active {
    background-color: #72a872 !important;
    border-color: #72a872;
}

</style>


<script>
export default {
  data() {
    return {
      userdata: null
    }
  },
  mounted() {
    this.userdata = this.$nuxt.context.app.$auth.$storage.getUniversal('jwt_decoded');
  },
  methods : {
    isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
        }
        }
  }
}
</script>