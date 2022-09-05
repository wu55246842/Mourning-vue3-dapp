<template>
      <!-- Blog Area Start Here -->
        <section class="blog-wrap-layout16 container-xl">
            <div class="container" v-if="dataList && dataList.length>0">
                <div class="row gutters-50">
                    <div class="col-xl-9 col-lg-8">

                        <div class="blog-wrap-layout17" v-if="dataList.length>4">
                            <div class="row gutters-40">
                                <div class="col-xl-7 col-lg-12">
                                    <div class="blog-box-layout1 text-left">
                                        <div class="item-img">
                                            <a @click="goToReadBook(dataList[0].tokenId)">
                                                <!-- <img src="../assets/img/blog/blog118.jpg" alt="blog"> -->
                                                <img :src="dataList[0].image">
                                            </a>
                                        </div>

                                        <base-blog-data :data="dataList[0]"></base-blog-data>
                                    </div>
                                </div>
                                <div class="col-xl-5 col-lg-12">
                                    <div class="blog-box-layout14">

                                        <!-- <base-blog-data :data="d" :key="d.publicationDate" v-for="d in dataList.splice(1,4)"></base-blog-data> -->

                                        <base-blog-data :data="dataList[1]"></base-blog-data>
                                        <base-blog-data :data="dataList[2]"></base-blog-data>
                                        <base-blog-data :data="dataList[3]"></base-blog-data>
                                        <base-blog-data :data="dataList[4]"></base-blog-data>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row gutters-40">
                            <div class="col-md-6 col-12" :key="index+data.publicationDate" v-for="(data,index) in dataList">
                                <div class="blog-box-layout3">
                                    <div class="item-img">
                                        <a @click="goToReadBook(data.tokenId)">
                                            <img :src="data.image" alt="blog">
                                        </a>
                                    </div>
                                    <base-blog-data :data="data" :decShowFlag="true"></base-blog-data>
                                </div>
                            </div>
                        </div>
                        <div class="pagination-layout1">
                            <ul>
                                <li class="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                            </ul>
                        </div>
                    </div>




                    <div class="col-xl-3 col-lg-4 sidebar-widget-area sidebar-break-md">
                        <right-widget :dataList="dataList"></right-widget>
                    </div>
                </div>
            </div>
        </section>
        <!-- Blog Area End Here -->
</template>

<script>

import commonMixin from "@/utils/commonMixin.js"
import RightWidget from './RightWidget.vue' 
import BaseBlogData from './BaseBlogData'

export default {
    mixins:[commonMixin],
    components: {RightWidget,BaseBlogData},
    props:{
      
        dataList:{
            type:Object,
            required: true,
            default:function(){
                return []
            }
        },
        title:{
            type:String,
            require:false,
            default:function(){
                return ''
            }
        }

        
    },
    computed: {

    },
    data(){
        return {

        }
    },

    methods: {

    }
}
</script>
