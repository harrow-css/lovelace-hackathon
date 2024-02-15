export default async function({ store, redirect , route}) {
    if (!store.state.auth.loggedIn) {

      store.$auth.$storage.setUniversal('redirect', route.path);
      return redirect("/auth/logon");  

    } else {
      const email = (store.$auth.$storage.getUniversal('jwt_decoded').upn)

      // include axios
      const axios = require('axios')

      // send a request with the user's email to the server to check if the user is allowed to access the application
      // use axios
      var response = await axios.get('/api/checkLogin', {
        params: {
          email: email
        }
      })
      
      if (response.data.allowed == true) {
        return
      }
      else if (response.data.allowed == false){
        return redirect("/auth/notapproved");
      } else {
        return redirect("/auth/logon");
      }

    }
  }