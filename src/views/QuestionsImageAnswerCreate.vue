<template>
  <div id="image-answer-create" class="container">
    <div class="main-page">
      <div class="page-detail-head text-center mt-5">
        <div class="portfolio-title">
          <h1 >{{question.title}}</h1>
        </div>
        <div class="m-5 text-dim">
          <p>{{question.content}}</p>
        </div>
        <div class="portolio-meta">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <span class="text-dim">
                <i class="mdi mdi-account"></i> 
                OP: {{question.op}}
              </span>
            </li>
            <li class="list-inline-item">
              <span class="text-dim">
                <i class="mdi mdi-poll"></i> 
                Category: {{question.category}}
              </span>
            </li>
            <li class="list-inline-item">
              <span class="text-dim">
                <i class="mdi mdi-calendar-range"></i> 
                Date: {{relativeDate(question.created_at)}}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div id="app" class="main portfolio-detail-content mb-5">
        <div class="editor-container port-featured-img">
          <div class="editor">
            <div class="current-color" :style="{ backgroundColor: color }"></div>
            <Tool :event="() => undo()" :iconClass="'fas fa-undo-alt fa-lg'" />
            <Tool :event="() => redo()" :iconClass="'fas fa-redo-alt fa-lg'" />
            <Tool :event="() => clear()" :iconClass="'fas fa-trash-alt fa-lg'" />
            
            <Tool
            :event="() => setTool('freeDrawing')"
            :iconClass="'fas fa-pencil-alt fa-lg'"
            :class="{ 'active-tool': currentActiveMethod === 'freeDrawing' }" 
            />
            <Tool
              :event="() => setTool('text')"
              :iconClass="'fas fa-font fa-lg'"
              :class="{ 'active-tool': currentActiveMethod === 'text' }"
            />
            <Tool
              :event="() => setTool('arrow')"
              :iconClass="'fas fa-long-arrow-alt-down fa-lg'"
              :class="{ 'active-tool': currentActiveMethod === 'arrow' }"
            />
            <Tool
              :event="() => setTool('selectMode')"
              :iconClass="'fas fa-arrows-alt fa-lg'"
              :class="{ 'active-tool': currentActiveMethod === 'selectMode' }"
            />
            <Tool
              :event="() => applyCropping()"
              :iconClass="'far fa-check-circle fa-lg'"
              v-show="croppedImage"
              :class="{ 'active-tool': currentActiveMethod === 'crop' }"
            />

            <Tool
              :event="() => cropImage()"
              :iconClass="'fas fa-crop-alt fa-lg'"
              v-show="!croppedImage"
            />



            <Tool 
              :event="() => saveImage()" 
              :iconClass="'fas fa-save fa-lg'" 
            />
              
          </div>

          <Editor 
            :canvasWidth="canvasWidth" 
            :canvasHeight="canvasHeight" 
            ref="editor"
          />

          <form v-on:submit.prevent="createAnswer()">
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <label class="text-dim">Respond:</label>
          <div class="form-group">
            <input type="text" class="form-control" v-model="content">
          </div>

          <div>
            <label class="text-dim">Picture: </label>
            <br>
            <input type="file" class="form-control" v-on:change="setFile($event)" ref="fileInput">
          </div>
          <br>
          <input class="btn btn-primary mb-5" type="submit" value="Create">
          </form>

        </div>

        <div class="icon-bar colors">
          <ColorPicker :color="'#e40000'" :event="changeColor" />
          <ColorPicker :color="'#e8eb34'" :event="changeColor" />
          <ColorPicker :color="'#a834eb'" :event="changeColor" />
          <ColorPicker :color="'#65c31a'" :event="changeColor" />
          <ColorPicker :color="'#34b7eb'" :event="changeColor" />
          <ColorPicker :color="'#eb34df'" :event="changeColor" />
          <ColorPicker :color="'#1a10ad'" :event="changeColor" />
          <ColorPicker :color="'#000000'" :event="changeColor" />
        </div>
      </div>
    </div>
  </div>

</template>


<script>
var axios = require("axios");
import Editor from 'vue-image-markup';
import Tool from "../components/Tool/Tool.vue";
import ColorPicker from "../components/ColorPicker/ColorPicker.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import moment from "moment";
// import "../public/app.scss";

export default {
  name: "app",
  components: {
    ColorPicker,
    Tool,
    Editor,
  },

  data: function() {
    return {
      question: [],
      content: "",
      image: "",
      currentActiveMethod: null,
      params: {},
      color: "black",
      imageUrl: null,
      croppedImage: false,

      errors: []
    };
  },
  props: {
    canvasWidth: {
      default: 600,
    },
    event: {
      type: Function,
    },
    labelForUploadImage: {
      type: Boolean,
      default: false
    },
    iconClass: {
      type: String,
    },
    canvasHeight: {
      default: 600,
    },
  },

  mounted() {
    if (this.imageUrl) {
      this.$refs.editor.setBackgroundImage(this.imageUrl);
      this.croppedImage = this.$refs.editor.croppedImage;
    }
    this.$watch(
      () => {
        return this.$refs.editor.croppedImage;
      },
      val => {
        this.croppedImage = val;
      },
    );
  },

  created: function() {
    axios
    .get("/api/questions/" + this.$route.params.id)
    .then(response => {
      this.question = response.data;
      console.log(this.question)
      fetch(response.data.image_url)
        .then(res => res.blob())
        .then(blob => {
          this.$refs.editor.uploadImage({target: {files: [blob]}});
        });
        
    });
    
  },

  methods: {
    cropImage() {
      this.currentActiveMethod = "crop";
      this.setTool("crop");
    },
    applyCropping() {
      this.currentActiveMethod = "";
      this.$refs.editor.applyCropping();
    },
    changeColor(colorHex) {
      this.color = colorHex;
      this.$refs.editor.changeColor(colorHex);
    },
    saveImage(){
      let image = this.$refs.editor.saveImage();
      this.saveImageAsFile(image);
    },
    saveImageAsFile(base64) {
      let link = document.createElement("a");
      link.setAttribute("href", base64);
      link.setAttribute("download", "image-markup");
      link.click();
    },
    setTool(type, params) {
      this.currentActiveMethod = type;
      this.$refs.editor.set(type, params);
    },
    uploadImage(e) {
      this.$refs.editor.uploadImage(e);
    },
    clear() {
      this.currentActiveMethod = this.clear;
      this.$refs.editor.clear();
    },
    undo() {
      this.currentActiveMethod = this.undo;
      this.$refs.editor.undo();
    },
    redo() {
      this.currentActiveMethod = this.redo;
      this.$refs.editor.redo();
    },
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    createAnswer: function() {
      var formData = new FormData();
          formData.append("answerable_id", this.question.id);
          formData.append("answerable_type", "Question");
          formData.append("content", this.content);
          formData.append("image", this.image);
        console.log(formData)
        axios
          .post("/api/answers", formData)
          .then(response => {
            this.$router.push("/questions/" + this.question.id);
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
    },
    relativeDate: function(date) {
        return moment(date).format('MMMM Do YYYY, h:mm a');
      }
  }
};
</script>

<style lang="scss">
  
  .main {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    .editor-container {
      display: flex;
      flex-direction: column;
      .editor {
        display: flex;
        justify-content: space-between;
        .current-color {
          border-radius: 5px;
          min-width: 28px;
          min-height: 28px;
        }
        .active-tool {
          cursor: pointer;
          color: #4287f5;
        }
      }
    }

    .colors {
      display: flex;
      flex-direction: column;
      margin: 40px 25px 0 25px;
      align-items: center;
      justify-content: center;
    }
  }


  .custom-editor {
    margin-top: 20px;
  }

  canvas {
      border: 1px solid #00000021;
    }
</style>