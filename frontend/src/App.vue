<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
nav {
  top: 0;
  margin: 0 2rem;
  padding: 2rem;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  background-color: black;
  color: white;
  font-size: 30px;
}

.link {
  text-decoration-line: none;
  color: white;
}

.link:hover {
  color: red;
}

h1 {
  margin: 10rem;
}
</style>
