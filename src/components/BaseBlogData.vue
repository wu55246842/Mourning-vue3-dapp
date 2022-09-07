<template>
    <div class="item-content">
        <h2 class="item-title"> <a @click="goToReadBook(data)">{{data.name}}</a></h2>
        <ul class="entry-meta meta-color-dark">
            <li :style="inlineFlag?'display:inline':'display:block'"><i class="fas fa-calendar-alt"></i>{{msToDate(data.nDob)}}</li>
            <li :style="inlineFlag?'display:inline':'display:block'"><i class="fas fa-calendar-alt"></i>{{msToDate(data.nDod)}}</li>
        </ul>
        <ul class="entry-meta meta-color-dark">
            <li :style="inlineFlag?'display:inline':'display:block'"><i class="fas fa-university"></i>{{data.place}}</li>
            <li :style="inlineFlag?'display:inline':'display:block'"><i class="fas fa-location-arrow"></i>{{data.nCountry}}</li>
        </ul>
        <ul v-if="decShowFlag" class="entry-meta meta-color-dark">
            <li style="display:block">{{data.description}}</li>
        </ul>
        
    </div>
</template>

<script>

import commonMixin from "@/utils/commonMixin.js"

export default {
    mixins:[commonMixin],
    components: {},
    props:{
        data:{
            type:Object,
            required: true,
            default:function(){
                return {}
            }
        },
        decShowFlag:false,
        inlineFlag:false
     
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
