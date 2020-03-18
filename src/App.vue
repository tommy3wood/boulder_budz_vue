<template>
  <div id="app">
    <div id="nav">
      <router-link to="/Signup">Signup</router-link> |
      <router-link to="/Login">Login</router-link> |
      <router-link to="/Logout">Logout</router-link> |
      <router-link to="/">Questions Index</router-link> |
      <router-link to="/questions/new">New Question</router-link> |

    </div>
    <router-view/>
  </div>
</template>

<style>
</style>
