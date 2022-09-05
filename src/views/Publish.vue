<template>
  <a-card>
    
    <div id="axiosForm">
      <div class="loader" v-if="loading"></div>
      <a-form
        :model="formState"
        name="mint_book"
        v-bind="formItemLayout"
    >

        <a-form-item label="Article Name" name="name">
            <a-input v-model:value="formState.name" placeholder="article"/>
        </a-form-item>

        <a-form-item name="description" label="Description" has-feedback>
            <a-textarea
                v-model:value="formState.description"
                placeholder="short description"
                :auto-size="{ minRows: 2, maxRows: 5 }"
            />
        </a-form-item>


        <a-form-item label="Upload Image" name="image">
            <a-row>
                <a-button @click="toggleShow" class="">Upload</a-button>
                <my-upload field="img"
                    @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess"
                    @crop-upload-fail="cropUploadFail"
                    langType="en"
                    v-model="showFlag"
                    :width="300"
                    :height="300"
                    url="/upload"
                    :params="params"
                    :headers="headers"
                    noCircle="true"
                    img-format="jpg/png"></my-upload>
            </a-row>
            <a-row>
                <img :src="imgDataUrl">
            </a-row>
        </a-form-item>

        <a-form-item name="cover" label="Cover" extra="select your favourite image as your blog's cover"> 

            <!-- <a-upload
                v-model:fileList="bookImageCover"
                name="imageCover"
                :multiple="false"
                :customRequest="uploadImage"
                :remove="deleteImageItem"
                accept="image/png, image/jpeg"
            >
                <a-button>
                    <template #icon><UploadOutlined /></template>
                    Click to upload
                </a-button>
            </a-upload> -->

            <!-- <a-row>
                <viewer :options="options" :images="dataImages"
                        @inited="inited"
                        @options="defaultOptions"
                        @show="showFlag"
                        class="viewer" ref="viewer"
                        >
                    <template #default="scope">
                        <img v-for="src in scope.images" :src="src" :key="src">
                        {{scope.options}}
                    </template>
                </viewer>
            </a-row>
            <a-row justify="start" style="padding-top:2rem">
                <a-col :span="2">
                    <a-button type="primary" shape="round" @click="selectImg">Select</a-button>
                </a-col>
                <a-col :span="2">
                    <a-button type="primary" shape="round" ghost @click="refreshImg">Refresh</a-button>
                </a-col> 
            </a-row>
            
            <a-row justify="start" style="padding-top:2rem">
                <div class="showImg">
                    <img v-if="formState.image" :src="formState.image">
                </div>
            </a-row>-->
            
            <crop-image-upload></crop-image-upload>


            
        </a-form-item>

        <a-form-item name="Content" label="Content" extra="upload the book content with txt format">
            <!-- <a-upload
                v-model:fileList="bookContentFile"
                name="content"
                :multiple="false"
                :customRequest="uploadFiles"
                :remove="deleteFileItem"
                accept=".txt"
            >
                <a-button>
                    <template #icon><UploadOutlined /></template>
                    Click to upload
                </a-button>
                
            </a-upload> -->
            <Tinymce v-model:value="formState.content"  @change="handleChange" width="100%" />
        </a-form-item>



        <a-form-item name="Category" label="Category">
            <!-- <a-checkbox-group v-model:value="formState.category" :options="categories">
            </a-checkbox-group> -->
            <a-radio-group v-model:value="formState.category" :options="categories">
            </a-radio-group>
        </a-form-item>


        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
            <a-button type="primary" @click="handleMint()">Mint</a-button>
        </a-form-item>
    </a-form>
    </div>
  </a-card>
</template>


<script>
    import { UploadOutlined, InboxOutlined } from '@ant-design/icons-vue';
    import Tinymce from "@/components/Tinymce.vue";
    import { message } from 'ant-design-vue';
    import category from "@/config/category"
    import IPFS from "../utils/ipfs"
    import commonMixin from "@/utils/commonMixin.js"

    import 'viewerjs/dist/viewer.css'
    import { component as Viewer } from "v-viewer"

    import MyUpload from 'vue-image-crop-upload'


    import CropImageUpload from '@/components/CropImageUpload'


    

    export default {
        name: "Publish",
        mixins:[commonMixin],
        components: {
            UploadOutlined,
            InboxOutlined,
            Tinymce,
            Viewer,
            MyUpload,
            // VueCropper,
            CropImageUpload
        },

        data() {
            return {
                loading :false,
                bookContentFile:[],
                bookImageCover:[],

                dataImages:[
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                ],
                 defaultOptions: {
                    'inline': false,
                    'button': true, //右上角按钮
                    "navbar": true, //底部缩略图
                    "title": false, //当前图片标题
                    "toolbar": true, //底部工具栏
                    "tooltip": true, //显示缩放百分比
                    "movable": true, //是否可以移动
                    "zoomable": true, //是否可以缩放
                    "rotatable": true, //是否可旋转
                    "scalable": false, //是否可翻转
                    "transition": true, //使用 CSS3 过度
                    "fullscreen": false, //播放时是否全屏
                    "keyboard": true, //是否支持键盘
                    "url": "data-source",
                },

                formState:{
                    name : '',
                    description : '',
                    image : '',
                    content : '',
                    category:[],
                    publicationDate : null,
                    attributes : [
                        {
                            "trait_type": "Platform",
                            "value": "NFT Market"
                        }
                    ],
                    platform : 'Book NFT Market',
                    
                },
                formItemLayout:{ 
                    labelCol: { span: 6 },
                    wrapperCol: { span: 14 }
                },


                categories :category.categories,

                showFlag:false,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    smail: '*_~'
                },
                imgDataUrl: '', // the datebase64 url of created image


            }
        },

        computed:{
        
        },

        watch: {

        },

        mounted(){
        },
        created() {
            //console.log('categories--------',categories)
            //this.categories = categories
        },
        methods: {

            
            async uploadImage(info) {
                const key = 'updatable'
                this.loading = true
                message.loading({ content: 'Uploading ...', key});
                //const res = await IPFS.saveToIPFS(info.file,'moralis')
                const res = await IPFS.saveToIPFS(info.file)
                //console.log("res===================>",res)
                if(res &&  res.ipfsHash){
                    //this.formState.image = res.url
                    this.formState.image = 'https://ipfs.io/ipfs/' + res.ipfsHash.path
                }
                this.loading = false
                message.success({ content: 'Uploaded Successfully!', key, duration: 2 });

                // setTimeout(() => {
                //     this.loading = false
                // }, 5000);
            },

            async uploadFiles(info) {
                const key = 'updatable';
                this.loading = true
                message.loading({ content: 'Uploading ...', key});
                //const res = await IPFS.saveToIPFS(info.file,'moralis')
                const res = await IPFS.saveToIPFS(info.file)
                if(res &&  res.url){
                    this.formState.content = res.url
                }
                this.loading = false
                message.success({ content: 'Uploaded Successfully!', key, duration: 2 });

            },
                /******************删除文件记录条目******************/
            deleteImageItem(img) {
                //找到当前文件所在列表的索引
                let index = this.bookImageCover.indexOf(img);
                //从列表中移除该文件
                this.bookImageCover.splice(index, 1);
                return true;
            },

            deleteFileItem(file) {
                //找到当前文件所在列表的索引
                let index = this.bookContentFile.indexOf(file);
                //从列表中移除该文件
                this.bookContentFile.splice(index, 1);
                return true;
            },

            async handleMint(){
                console.log('matedata',this.formState)
                if(this.formState && this.formState.image && this.formState.content 
                    && this.formState.name && this.formState.description && this.formState.category){
                    const key = 'updatable'
                    this.loading = true
                    message.loading({ content: 'Processing ...', key});
                    this.formState.publicationDate = new Date().getTime()
                    let Base64 = require('js-base64').Base64
                    this.formState.content =  Base64.encode(this.formState.content)
                    console.log('matedata',this.formState)
                    const res = await IPFS.saveToIPFS(this.formState)
                    console.log('metadata ipfs:',res)
                    if(res && res.ipfsHash){
                        await Contract.RKB.createToken('https://ipfs.io/ipfs/'+res.ipfsHash.path)
                        const result =  await Contract.RKB.lastTokenId()
                        
                        console.log('lastTokenId',result)
                        this.loading = false
                        message.success({ content: 'Congratulation! Your NFT Minted Successfully!', key, duration: 2 });
                        this.reset()
                    }
                }

            },

            reset(){
                this.formState.name =''
                this.formState.description =''
                this.formState.image =''
                this.formState.content =''
                this.formState.category =[]
                this.formState.publicationDate =null
                this.formState.attributes = [
                        {
                            "trait_type": "Platform",
                            "value": "NFT Market"
                        }
                    ],
                this.formState.platform ='Book NFT Market'
            },

            handleChange (item) {

            },

            inited (viewer) {
                this.$viewer = viewer
            },
            selectImg () {
               this.formState.image = this.$viewer.image.src
            },
            show(e){
                //console.log(this.$viewer.sel)
                
            },  
            refreshImg(){
                this.dataImages = [
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                    "https://picsum.photos/id/"+this.randomNum(100,1000)+"/500",
                ]
            },

            toggleShow() {
                this.showFlag = !this.showFlag;
            },

            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
            },

            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },

            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }

        }
    }
</script>

<style lang="less" scoped>

    #axiosForm{  /* Components Root Element ID */
        position: relative;
    }

    .viewer img{
        width: 200px;
        height: 200px;
    }

    .showImg img{
        width: 299px;
        height: 299px;
    }

</style>
