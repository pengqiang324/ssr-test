const mixins = {
    title() {
        const { title } = this.$route.meta
        console.log(this.$route.meta)
        return title
    }
}

export default mixins