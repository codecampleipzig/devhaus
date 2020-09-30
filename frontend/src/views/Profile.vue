<template>
  <div class="mx-auto w-screen max-w-md mt-8">
    <section class="flex space-x-4 mb-4">
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
    <section class="middle mb-4">
      <h2>About</h2>
      <h3>Question?</h3>
      <p>Answer</p>
      <h3>Question?</h3>
      <p>Answer</p>
    </section>
    <section class="mb-4">
      <div class="project-info">
        <h2>Recent Projects</h2>
        <h3>Project Title</h3>
        <p>
          Project description
        </p>
        <div class="flex space-x-4 mt-4">
          <a
            class="button"
            href="celestial-weather.netlify.app"
          >Website</a>
          <a
            class="button"
            href="https://github.com/mnapearson/celestial-weather"
          >View on Github</a>
        </div>
      </div>
    </section>
    <section class="contact">
      <div class="contact-form">
        <h2>Contact</h2>
        <textarea
          id="message"
          class="resize-none contact-input"
          name="message"
          cols="50"
          rows="8"
          placeholder="Your message..."
        />
        <button class="button">
          Send
        </button>
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
}

h2 {
  font-weight: bold;
  font-size: 16px;
}

h3 {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #2E354F;
}

p {
  color: #2E354F
}

a {
  font-size: 16px;
  color: #2E354F
}

.profile-picture {
  width: 160px;
  height: 160px;
  border: 1px solid #000000;
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

.button {
  @apply border border-black py-2 px-6 text-center font-bold cursor-pointer
}

</style>
