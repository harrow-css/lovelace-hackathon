<template>
<div class="container">
    <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="h-100 p-5 cardcolour1 rounded-3">
          <h2>START</h2>
          <h1 class="fs-1" style="color:#B8DDB8">12:00GMT</h1>
          <h3 style="color:#B8DDB8">Friday 23rd February 2024</h3>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 cardcolour1 rounded-3">
          <h2>FINISH</h2>
          <h1 class="fs-1" style="color:#60AAF4">12:00GMT</h1>
          <h3 style="color:#60AAF4">Friday 24th February 2024</h3>
        </div>
      </div>
  </div>
  <div class="mt-5 p-5 text-center rounded-3 cardcolour1">
    <h1>Join the Hackathon</h1>
    <p class="col-lg-8 mx-auto fs-5">
      The Lovelace Hackathon is a 24 hour event where you can compete in a series of coding challenges to win prizes and gain experience.
      <br>
      Teams of up to 4 can complete as many problems as possible, submitting answers here.
    </p>
    <div class="d-inline-flex gap-2">
      <Nuxt-Link to="welcome" class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
        Get Started
            <span class="material-symbols-outlined">
              chevron_right
            </span>
      </Nuxt-Link>
    </div>
  </div>

  
</div>
</template>

<script>
</script>
