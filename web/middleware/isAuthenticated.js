export default function({ store, redirect , route}) {
    if (!store.state.auth.loggedIn) {

      store.$auth.$storage.setUniversal('redirect', route.path);
      return redirect("/auth/logon");  

    } else {
      const email = (store.$auth.$storage.getUniversal('jwt_decoded').upn)
      const domain = email.split('@').pop()

      const allowedDomains = ['harrowschool.org.uk', 'oxcoll.com']

      // if the domain is in the list of allowed domains, then allow the user to continue
        if (allowedDomains.includes(domain)) {
            return
        } else {
            return redirect("/auth/notapproved");
        }
    }
    
  }