<template>
    <div class="item-content">
        <ul class="entry-meta meta-color-dark">
            <!-- <li><i class="fas fa-tag"></i>{{data.name}}</li> -->
            <!-- <li :key="c+new Date().getTime()" v-for="c in data.category"><i class="fas fa-tag"></i>{{c}}</li> -->
            <li><i class="fas fa-tag"></i>{{data.category}}</li>
            <li><i class="fas fa-calendar-alt"></i>{{msToDate(data.publicationDate)}}</li>
            <!-- <li><i class="fas fa-user"></i>BY <a href="#">Mark Willy</a></li> -->
        </ul>
        <h2 class="item-title"> <a @click="goToReadBook(data.tokenId)">{{data.name}}</a></h2>
        <p v-if="decShowFlag">{{data.description}}</p>
    </div>
</template>

<script>

import commonMixin from "@/utils/commonMixin.js"
import CategoriesWidget from '../components/Categories' 

export default {
    mixins:[commonMixin],
    components: {CategoriesWidget},
    props:{
        data:{
            type:Object,
            required: true,
            default:function(){
                return {}
            }
        },
        decShowFlag:false
     
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
