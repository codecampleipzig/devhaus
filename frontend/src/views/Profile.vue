<template>
  <div class="profile-page">
    <section class="name">
      <div class="profile-picture" />
      <div class="info">
        <h1>John Doe</h1>
        <p class="role">
          Class #3 Alumni
        </p>

        <a
          href="github.com/mnapearson"
          class="github"
        >Fork me on GitHub</a>
      </div>
    </section>
    <section class="middle">
      <div class="about-info">
        <h2>About</h2>
        <h3>Question?</h3>
        <p>Answer</p>
        <h3>Question?</h3>
        <p>Answer</p>
      </div>
      <div class="project-info">
        <h2>Recent Projects</h2>
        <h3>Project Title</h3>
        <p>
          Project description
        </p>
        <div class="project-website">
          <a href="celestial-weather.netlify.app">Website</a>
        </div>
        <div class="project-github">
          <a href="https://github.com/mnapearson/celestial-weather">View on Github</a>
        </div>
      </div>
    </section>
    <section class="contact">
      <div class="contact-form">
        <h2>Contact</h2>
        <div class="contact-input">
          <textarea
            id="message"
            name="message"
            cols="50"
            rows="8"
            placeholder="Your message..."
          />
        </div>
        <button>Send</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>

<style scoped>

h1 {
font-style: normal;
font-weight: bold;
font-size: 24px;
color: #2E354F;
text-decoration-line: underline;

}

h2 {
  font-weight: bold;
  font-size: 16px;
}

h3 {
font-style: normal;
font-weight: bold;
font-size: 20px;
color: #2E354F;

}

p {
  font-size: 18px;
  color: #2E354F
}

a {
  font-size: 16px;
  color: #2E354F
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.middle {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.name {
  display: flex;
  flex-direction: row;
  margin-top: 3rem;
  justify-content: center;
}

.profile-picture {
margin: 1rem;
width: 160px;
height: 160px;
left: 374px;
top: 114px;
border: 1px solid #000000;
box-sizing: border-box;
}

.contact{
  display: flex;
  justify-content: center;
  padding: 1rem;
  align-content: center;
}

.contact-input {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  border: solid 1px black;
  padding: 1rem;
}

button {
  color: #2E354F;
  font-weight: 500;
  border: solid 1px;
  padding: .5rem 2rem;
}

.project-website {
  margin: 1rem;
  border: solid 1px;
  padding: .5rem;
  text-align: center;
  max-width: 100px;
}
.project-github {
  margin: 1rem;
  border: solid 1px;
  padding: .5rem;
  text-align: center;
  max-width: 150px;
}
</style>
