module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'eagerclient',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            { src: 'https://unpkg.com/codyhouse-framework/main/assets/js/util.js', async: true }
        ],
        htmlAttrs: {
            class: 'js'
        }
    },

    /*
    ** Nuxt Modules
    */
    modules: [
        ['@nuxtjs/style-resources']
    ],

    /*
    ** Style Resources
    */
    styleResources: {
        scss: [
            '~/assets/scss/resources/_breakpoints.scss',
            '~/assets/scss/resources/_mixins.scss'
        ]
    },

    /*
    ** Global CSS
    */
    css: [
        '@/assets/scss/app.scss'
    ],

    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {}
    }
}
