<template>
  <div>
    <div class="cards">
      <div class="info-card">
        <h2>Michaela Pearson</h2>
        <p class="role">
          Class #3 Alumni
        </p>
        <p>Interested in CSS animation, database structures, and cloud services!</p>
        <a
          href="github.com/mnapearson"
          class="github"
        >Fork me on GitHub</a> |
        <a
          href="kedin.com/in/michaela-pearson-58643260/"
          class="linkedin"
        >Add me on LinkedIn
        </a>
      </div>
      <div class="about-card">
        <h2>About Me</h2>
        <p>Job Title: Fullstack Web Developer</p>
        <p>Company: Artsy</p>
        <p>Programming since: 2020</p>
        <p>Knowledge of: CSS, JS, Vue, Firebase</p>
        <p>Hobbies: Writing, painting, walking</p>
        <p />
      </div>

      <div class="projects-card">
        <h2>Recent Projects</h2>
        <h3>Celestial Weather</h3>
        <p>
          A weather update, making API calls to various sources
          and providing daily horoscope information.
        </p>
        <a href="celestial-weather.netlify.app">check it out</a>
        <h3>Zen Cal </h3>
        <p>
          A Calendar with task/event adding.  Using
          firebase for authentication and data storage.
        </p><a href="zencal-b5217.web.app">check it out</a>
      </div>
      <div class="contact-card">
        <h2>Contact Me</h2>
        <div class="contact-input">
          <textarea
            id="message"
            name="message"
            cols="30"
            rows="10"
            placeholder="write your message..."
          />
          <input
            type="text"
            placeholder="insert link"
          >
          <input
            type="text"
            placeholder="attach documents"
          >
          <button>Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>

<style scoped>

.cards {
  margin: 3rem;
}

p {
  font-size: 20px;
  margin: .5rem 0;
  color: #2E354F
}

a {
  font-size: 16px;
  color: #2E354F
}

.info-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 450px;
  max-height: 250px;
  text-align: left;
  padding: 1rem;
  background-color: #FFF7F4;

}

h2 {
  font-size: 30px;
 text-align: center;
  color: #2E354F
}

.about-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 450px;
  max-height: 300px;
  text-align: left;
  padding: 1rem;
  background-color: #FFF7F4;
}

h3 {
  margin-top: 1rem;
  font-size: 24px;
  color: #2E354F
}

.projects-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 450px;
  text-align: left;
  padding: 1rem;
  background-color: #FFF7F4;
}

.contact-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 450px;
  padding: 1rem;
  background-color: #FFF7F4;
  align-content: center;
}

.contact-input {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
}

input {
  padding: .5rem;
  margin: 1rem;
}

button {
  color: #2E354F;
  font-weight: 500;
  border: solid 1px;

}

</style>
