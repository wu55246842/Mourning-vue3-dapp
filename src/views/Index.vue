<template>
    <div>
        <home-banner-static-block></home-banner-static-block>
        <!-- <home-banner-block :dataListLast="dataListLast"></home-banner-block> -->
        <div class="row pt-5"></div>
        <tf-slider-block :isForHomeBanner="false" :views="viewsNumber" :space="spaceWidth" :contents="dataListLast" 
            :comTitle="tfSliderTitle" :comDec="tfSliderDec"></tf-slider-block>

        <div style="height:5rem"></div>
        <landing-main-block  :dataList="dataList"></landing-main-block>

    </div>


</template>

<script>
import UI from "@/utils/ui"
import CommonFunction from "@/utils/commonFunction"
import {request} from "@/utils/request"
import commonMixin from "@/utils/commonMixin"
import IPFS from "@/utils/ipfs"
import init from "@/config/init" 

import HomeBannerBlock from '../components/HomeBanner'
import HomeBannerStaticBlock from '../components/HomeBannerStatic'
import LandingMainBlock from '../components/LandingMain'
import TfSliderBlock from '../components/TfSlider'

export default {
    name:'Home',
    mixins:[commonMixin],
    components: {HomeBannerBlock,HomeBannerStaticBlock, LandingMainBlock,TfSliderBlock},
    data() {
        return {
            title:'',
            currentAccount: window.connectedAddress,
            testResult: null,
            testResultSend: null,
            dataList:[],
            dataListLast:[],
            dataListPopular:[],
            tfSliderTitle:'Remembrance of the month',
            tfSliderDec:'',
            viewsNumber:4,
            spaceWidth:10
        }
    },
    created(){
    },

    mounted(){
        this.initData()
    },
    methods: {
        async initData(){
            // TODO)
            if(this.$store.state.currentAccount){
                const lastTokenId = await Contract.RKB.lastTokenId()
                let max = 0
                for (let tokenId = lastTokenId; tokenId > 100000; tokenId--) {
                    const tokenInfor = await Contract.RKB.getInfo(tokenId)
                    request({
                        url:tokenInfor._tokenURI,
                        methods:'Get'
                    }).then(res=>{
                        max++
                        res.tokenId = tokenId
                        this.dataList.push(res)    
                        if(max <= 6){
                            this.dataListLast.push(res)
                        }  
                    }).catch(err=>{
                        console.log(err)
                    })
                }

            }else{
                let max = 0
                const res = await IPFS.getIpfsPinList()
                res.forEach(async o =>{

                    request({
                        url:'https://ipfs.io/ipfs/'+o.cid.string,
                        methods:'Get'
                    }).then(res=>{
                        max++
                        res.id = o.cid.string
                        this.dataList.push(res)    
                        if(max <= 6){
                            this.dataListLast.push(res)
                        }  
                    }).catch(err=>{
                        console.log(err)
                    })
                    
                })
                
            }
            
        },
        async tryTest(){
            const address = this.currentAccount
            //const result = await Contract.USDT.balanceOf(address)
            const result = await Contract.RKB.balanceOf(address)
            this.testResult = result
        },
        async tryTestSend(){
            UI.loading('Send..')
            const to = '0xC53ec510525CF8E7cC38D5657fd58E9De58d2441'
            const amount = 1
            Contract.WBNB.transfer(to, amount).then(res => {
                UI.closeLoading()
                this.testResultSend = res
                console.log(res)
            }).catch(err => {
                UI.closeLoading()
                console.log(err)
            })
        },
        async tryTestSendBNB(){
            const to = '0xC53ec510525CF8E7cC38D5657fd58E9De58d2441'
            const amount = CommonFunction.systemBalance(0.01, 18)
            CommonFunction.transfer(to, amount)
        },
    }
}
</script>

<style lang="less" scoped>
.page-con{
    padding: 65px 10px;
}
.title{
    font-size: 13px;
    margin-bottom: 5px;
    margin-top: 10px;
}
.code{
    font-size: 12px;
    font-weight: bold;
    background-color: #eee;
    border-radius: 5px;
    overflow-x: scroll;

    pre{
        margin: 10px 10px 0 10px;
        width: auto;
    }
}
.btn{
    line-height: 26px;
    background-color: #131629;
    width: 100px;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    color: #fff;
}
.result{
    background-color: #eee;
    padding: 10px 6px;
    border-radius: 5px;
    font-size: 13px;
    margin-top: 10px;
}
</style>
