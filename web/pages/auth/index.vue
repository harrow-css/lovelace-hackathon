<template>
  <div />
</template>

<script>
// eslint-disable-next-line camelcase
import { jwtDecode } from "jwt-decode";

export default {
  created () {

    if (this.$store.state.auth.strategy == 'google') {
      // google auth
      var token = this.$route.hash.split('&').find(param => param.startsWith('id_token=')).split('=')[1];

      const decodedBearer = jwtDecode(token)

      decodedBearer.given_name = decodedBearer.email.split('@')[0]

      this.$auth.$storage.setUniversal('jwt_decoded', decodedBearer)

      var userdata  = this.$auth.$storage.getUniversal('jwt_decoded')

    } else {
      // microsoft auth
      var token = this.$auth.$storage.getUniversal('_token.aad');

      // remove the "Bearer " from the start of the token
      
      token = token.replace('Bearer ', '')

      const decodedBearer = jwtDecode(token)

      // create a new attribute of the decodedBearer token that's the same as the upn
      decodedBearer.email = decodedBearer.upn

      this.$auth.$storage.setUniversal('jwt_decoded', decodedBearer)

      var userdata  = this.$auth.$storage.getUniversal('jwt_decoded')


    }
    
    console.log(token)

     

    const path = this.$auth.$storage.getUniversal('redirect') || '/';
    this.$auth.$storage.setUniversal('redirect', null);
    this.$router.push(path);


    // // if the microsoft login is used
    // 
    
    // const decodedBearer = jwtDecode(token)

    // this.$auth.$storage.setUniversal('jwt_decoded', decodedBearer)

    // var userdata  = this.$auth.$storage.getUniversal('jwt_decoded') 

    // const path = this.$auth.$storage.getUniversal('redirect') || '/';
    // this.$auth.$storage.setUniversal('redirect', null);
    // this.$router.push(path);

  }
}
</script>