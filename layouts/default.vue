<template>
    <div>
        <Navigation />
        <div class="container max-width-lg padding-y-lg">
            <nuxt/>
        </div>
    </div>
</template>

<script>
import Navigation from '~/components/globals/Navigation.vue'

export default {
    components: {
        Navigation
    }
}
</script>
