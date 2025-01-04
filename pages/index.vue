<template>
    <v-app>
        <!-- Combined Welcome and Social Links Section -->
        <v-parallax height="100vh" src="/images/background.jpg" id="home" class="parallax-section">
            <div class="parallax-content">
                <h2 class="text-h2">Welcome to My Portfolio</h2>
                <p class="text-h6 mb-4">Creating delicious desserts, one masterpiece at a time.</p>
                <div class="social-links mb-5">
                    <v-btn icon href="https://www.facebook.com" target="_blank">
                        <v-icon large>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn icon href="https://www.instagram.com" target="_blank">
                        <v-icon large>mdi-instagram</v-icon>
                    </v-btn>
                    <v-btn icon href="https://www.pinterest.com" target="_blank">
                        <v-icon large>mdi-pinterest</v-icon>
                    </v-btn>
                    <v-btn icon href="https://www.linkedin.com" target="_blank">
                        <v-icon large>mdi-linkedin</v-icon>
                    </v-btn>
                    <v-btn icon href="https://www.gmail.com" target="_blank">
                        <v-icon large>mdi-gmail</v-icon>
                    </v-btn>
                </div>
                <v-btn color="primary" dark @click="goTo('#carousel-parallax-section')">
                    View My Work
                </v-btn>
            </div>
        </v-parallax>

        <!-- Parallax with Carousel Section -->
        <v-parallax height="100vh" src="/images/background.jpg" id="carousel-parallax-section"
            class="carousel-parallax-section">
            <div class="carousel-overlay">
                <v-container>
                    <h2 class="text-h4 text-center mb-5">My Best Creations</h2>
                    <v-carousel>
                        <v-carousel-item v-for="(image, i) in images" :key="i">
                            <v-sheet height="100%" class="d-flex align-center justify-center"
                                :style="{ background: `url(${image}) center center / cover no-repeat` }"></v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-container>
            </div>
        </v-parallax>

        <!-- Description Section -->
        <v-container class="description-section my-10">
            <v-row justify="space-between" align="center">
                <v-col cols="12" md="6" class="text-center">
                    <v-avatar size="350">
                        <img src="/images/creator-photo.jpg" alt="Creator Photo" />
                    </v-avatar>
                </v-col>
                <v-col cols="12" md="6">
                    <h2 class="text-h4 font-weight-medium">About the Creator</h2>
                    <p class="text-body-1">
                        I am a passionate pastry chef who specializes in creating beautiful,
                        delicious desserts. With years of experience and a love for creativity,
                        my goal is to make every treat an unforgettable experience.
                    </p>
                </v-col>
            </v-row>
        </v-container>

        <!-- Contact Section -->
        <v-container class="contact-section py-10" id="contact">
            <v-row justify="center" align="center">
                <v-col cols="12" md="6">
                    <h2 class="text-h5 font-weight-medium">Contact Me</h2>
                    <p class="text-body-1">
                        Phone: +123 456 7890<br />
                        Email: pastrychef@example.com<br />
                        Location: 123 Sweet Street, Dessert City
                    </p>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGoTo } from 'vuetify'; // Vuetify's `useGoTo`

// Carousel images
const images = ref([
    '/images/photo1.webp',
    '/images/photo2.webp',
    '/images/photo3.webp',
    '/images/photo4.webp',
    '/images/photo5.webp',
]);

// useGoTo composable
const goTo = useGoTo();
</script>

<style scoped>
.parallax-section {
    position: relative;
}

.parallax-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
}

.social-links {
    display: flex;
    gap: 16px;
}

.carousel-parallax-section {
    position: relative;
}

.carousel-overlay {
    background: linear-gradient(rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.9));
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.description-section {
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-section {
    background: #ffe7e9;
    border-radius: 8px;
    padding: 20px;
}
</style>