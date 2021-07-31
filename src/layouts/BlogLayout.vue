<template>
    <div class="blog-layout">
        <Header />
        <div class="blog">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2">
                         <LeftSide >dsfsdfdsfsdfbkjfkajs</LeftSide>
                    </div>
                    <div class="col-lg-8">
                       <div class="blog-content"> 
                          <slot />
                       </div>
                    </div>
                    <div class="col-lg-2">
                        <RightSide />
                    </div>
                </div>   
            </div>
            <div class="left-side"></div>
        </div>
        <Footer />
    </div>
</template>
<script>
import Header from "../components/header";
import Footer from "../components/footer"
import LeftSide from "../components/sidebar/left-side";
import RightSide from "../components/sidebar/right-side"
export default {
    components:{Header, Footer, LeftSide, RightSide}
    
}
</script>