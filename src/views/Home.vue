<template>
  <div class="home">
    <img id="home-logo" alt="Ebooks" src="/ebooks-logo.png">
    <div class="error">
      CONTRASENYA INCORRECTA
    </div>
    <div class="password">
      <input v-model="password" placeholder="CONTRASENYA" />
    </div>
    <div class="enter">
      <button @click="enter()">
        ENTRA
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { stringToHash } from './../helpers';
import router from './../router/router';

export default {
  name: 'Home',
  setup() {
    const password = ref('');

    const enter = () => {
      const hashedPassword = stringToHash(password.value).toString();

      if (hashedPassword === process.env.VUE_APP_SECRET) {
        window.localStorage.setItem(
          'password',
          hashedPassword
        );
        router.push({ name: 'ebooks' });
      } else {
        const errorElem = document.querySelector('.home .error');

        errorElem.classList.add('show');
        setTimeout(() => {
          errorElem.classList.remove('show');
        }, 2000);
      }
    };

    return {
      password,
      enter
    }
  }
}
</script>

<style>
.home {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.home .error {
  display: none;
  margin-top: 50px;
  font-size: 12px;
  letter-spacing: 1px;
  color: red;
}
.home .error.show {
  display: block;
}
.home .password {
  margin-top: 20px;
}
.home input {
  color: white;
  font-size: 14px;
  letter-spacing: 1px;
  text-align: center;
  padding: 10px 20px;
  border-width: 0 0 1px 0;
  border-color: #d4ec68;
  background-color: transparent;
}
.home input:focus-visible {
  outline: none;
}
.home .enter {
  margin-top: 25px;
}
.home button {
  color: white;
  letter-spacing: 1px;
  padding: 10px 20px;
  border: 1px solid #d4ec68;
  border-radius: 20px;
  background-color: transparent;
  box-shadow: 0 0 10px #d4ec68;
  transition: all .5s linear;
}
.home button:hover {
  cursor: pointer;
  color: black;
  background-color: #d4ec68;
}
#home-logo {
  width: 250px;
  height: 250px;
}
</style>
