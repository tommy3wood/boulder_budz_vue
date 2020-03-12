<template>
  <div id="app">


    <Editor 
      :canvasWidth="canvasWidth" 
      :canvasHeight="canvasHeight" 
      ref="editor"
    />


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

<style>
  canvas {
    border: 1px solid red;
    cursor: crosshair;
  }
  body {
    padding: 2em;
  }
</style>

<script>
import Editor from 'vue-image-markup';
import Tool from "../components/Tool/Tool.vue";
import ColorPicker from "../components/ColorPicker/ColorPicker.vue";
// import "@fortawesome/fontawesome-free/css/all.css";
// import "@fortawesome/fontawesome-free/js/all.js";

export default {
  name: "app",
  components: {
    ColorPicker,
    Tool,
    Editor
  },

  data: function() {
    return {
      currentActiveMethod: null,
      params: {},
      color: "black",
      imageUrl: null,
      croppedImage: false,
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

  created: function() {},

  methods: {
    drawOnImage(){
      let customizeFreeDrawing = { stroke: 'black',strokeWidth: "15" }
      this.$refs.editor.set('freeDrawing',customizeFreeDrawing)
    },
    clearCanvas(){
      this.$refs.editor.clear();
    },
    undoLast(){
      this.$refs.editor.undo()
    },
    redoLast(){
      this.$refs.editor.redo()
    },
    typeOnImage(){
      let textModeOptions = { fill: 'black', fontFamily: 'Verdana',fontSize: 12, placeholder: 'Type something'}
      this.$refs.editor.set('text')
    },
    save(){
      this.$refs.editor.saveImage()
    }
    // uploadBackground(){
    //   this.$refs.editor.uploadImage(e)
    // },
    // saveMarkup(){
    //   this.$refs.editor.saveImage()
    // },
  }
};
</script>