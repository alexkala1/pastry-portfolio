<template>
  <v-app>
    <v-app-bar app color="pink lighten-3" dark>
      <v-toolbar-title>Pastry Portfolio</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="goHome">Home</v-btn>
      <v-btn text @click="goToCarousel">Gallery</v-btn>
      <v-btn text @click="goToContact">Contact</v-btn>
      <v-btn text to="/photos">Photos</v-btn>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useGoTo } from 'vuetify';

const goTo = useGoTo();
const router = useRouter();

function goToCarousel() {
  // Check if in home page and if not navigate to home first
  if (window.location.pathname !== '/') {
    router.push('/');
  }
  goTo('#carousel-parallax-section');
}

function goHome() {
  if (window.location.pathname !== '/') {
    router.push('/');
  }

  goTo('#home');
}

function goToContact() {
  if (window.location.pathname !== '/') {
    router.push('/');
  }

  goTo('#contact');
}
</script>

<style>
.v-main {
  background-color: #ffe6f0;
}
</style>