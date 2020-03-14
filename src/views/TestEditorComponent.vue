<template>
  <div id="app">
    <div class="container">
      <h1>{{question.title}}</h1>
    </div>
    <div class="editor-container">
      
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
          :event="e => uploadImage(e)"
          :iconClass="'fas fa-file-upload fa-lg'"
          :labelForUploadImage="true"
        />
        <Tool :event="() => saveImage()" :iconClass="'fas fa-save fa-lg'" />
          
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
      <h5>Respond:</h5>
      <div class="form-group">
        <input type="text" v-model="content">
      </div>

      <div>
        <label>Picture: </label>
        <input type="file" v-on:change="setFile($event)" ref="fileInput">
      </div>

      <input class="btn btn-info" type="submit" value="Create">
      </form>

    </div>

    <div class="colors">
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
</template>


<script>
var axios = require("axios");
import Editor from 'vue-image-markup';
import Tool from "../components/Tool/Tool.vue";
import ColorPicker from "../components/ColorPicker/ColorPicker.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

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
      // console.log(response.data);
      this.question = response.data;

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