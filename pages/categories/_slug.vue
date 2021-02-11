<template>
    <section class="grid gap-md">
        <c-card-1
            class="col-6@sm col-4@lg"
            v-for="(product, index) in products"
            :key="index"
            v-bind="product"
        />
    </section>
</template>

<script>
import CCard1 from '~/components/component/c-card-1.vue'

export default {
    components: {
        CCard1
    },

    data() {
        return {
            products: []
        }
    },

    async asyncData({ params, app }) {
        let response = await app.$axios.$get('products?category=' + params.slug)

        return {
            products: response.data
        }
    },
}
</script>

<style lang="scss">
</style>
