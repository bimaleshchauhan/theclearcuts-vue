<template>
    <div class="main-layout">
        <Header />
        <div class="main">
            <slot />
        </div>
        <Footer />
    </div>
</template>
<script>
import Header from "../components/header";
import Footer from "../components/footer"
export default {
    components:{Header, Footer}
    
}
</script>