<template>
    <v-container class="photos-section">
        <!-- Search Bar -->
        <v-row class="my-4" justify="center">
            <v-col cols="12" md="6">
                <v-text-field v-model="searchQuery" label="Search tags" variant="outlined" clearable
                    class="search-bar" />
            </v-col>
        </v-row>

        <!-- Tags Chip Bar -->
        <v-row justify="center">
            <v-col cols="12" class="tags-bar">
                <div class="chips-container">
                    <v-chip v-for="(tag, index) in visibleTags" :key="index" @click="filterPhotos(tag)"
                        :color="selectedTag === tag ? 'primary' : 'default'" class="tag-chip">
                        {{ tag }}
                    </v-chip>
                    <v-chip v-if="showMoreChips" @click="toggleShowMore" color="secondary" class="tag-chip">
                        {{ isExpanded ? 'Show Less' : 'Show More' }}
                    </v-chip>
                </div>
            </v-col>
        </v-row>

        <!-- Clear Filters Button -->
        <v-row justify="center" class="my-2">
            <v-btn v-if="selectedTag" @click="clearFilters" class="clear-filters" rounded color="error">
                <v-icon start>mdi-close-circle</v-icon>
                Clear Filters
            </v-btn>
        </v-row>

        <!-- Photos Gallery -->
        <v-row justify="center" class="gallery">
            <v-col v-for="(photo, index) in filteredPhotos" :key="index" cols="12" md="4" lg="3">
                <v-card>
                    <v-img :src="photo.url" :alt="photo.tags.join(', ')" aspect-ratio="1.5" />
                    <v-card-actions>
                        <v-btn v-for="tag in photo.tags" :key="tag" @click="filterPhotos(tag)" variant="text"
                            color="primary" class="tag-link">
                            {{ tag }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Mock photos and tags data
const photos = ref([
    { url: '/images/photo1.webp', tags: ['Cakes', 'Desserts'] },
    { url: '/images/photo2.webp', tags: ['Cookies', 'Chocolate'] },
    { url: '/images/photo3.webp', tags: ['Pastries', 'Desserts'] },
    { url: '/images/photo4.webp', tags: ['Cakes', 'Weddings'] },
    { url: '/images/photo5.webp', tags: ['Cupcakes', 'Birthdays'] },
]);

// Extract unique tags
const allTags = computed(() => {
    const tagsSet = new Set<string>();
    photos.value.forEach(photo => photo.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet);
});

// Search and filter
const searchQuery = ref('');
const selectedTag = ref('');
const isExpanded = ref(false);
const showMoreChips = computed(() => filteredTags.value.length > 10);

// Tags filtered by search input
const filteredTags = computed(() =>
    allTags.value.filter(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

// Limit visible tags
const visibleTags = computed(() => {
    const tags = filteredTags.value;
    return isExpanded.value ? tags : tags.slice(0, 10);
});

// Photos filtered by selected tag
const filteredPhotos = computed(() =>
    selectedTag.value
        ? photos.value.filter(photo => photo.tags.includes(selectedTag.value))
        : photos.value
);

// Functions
const filterPhotos = (tag: string) => {
    selectedTag.value = tag;
};

const clearFilters = () => {
    selectedTag.value = '';
    searchQuery.value = '';
};

const toggleShowMore = () => {
    isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.search-bar {
    margin-bottom: 16px;
}

.tags-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
}

.chips-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
}

.tag-chip {
    margin: 4px;
}

.clear-filters {
    margin-top: 8px;
    display: flex;
    align-items: center;
}

.gallery {
    margin-top: 24px;
}

.tag-link {
    margin-right: 8px;
}
</style>