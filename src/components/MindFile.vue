<template>


  <div class="drive-item module text-center" :style="display_none?'display:none':''">
    <div class="drive-item-inner module-inner">
      <div class="drive-item-title"><a href="#">
        {{ file.name }}
      </a></div>
      <div class="drive-item-thumb"><a href="#">


        <img v-if="file_type==='img'" class="file-img img-thumbnail"
             :src="preview"
             :alt="file.url">
        <!--        <i class="fa-solid fa-file"></i>-->
        <i v-else class="fa-solid fa-file fa-2xl file-icon"></i>


      </a></div>

    </div>
    <div class="drive-item-footer module-footer">
      <ul class="utilities d-flex justify-content-around">
        <span class="file-btns"><a data-toggle="tooltip" data-placement="top" title="" data-original-title="Download"><i
            class="fa fa-download"></i></a></span>
        <span @click="clickOnDelete" class="delete-file file-btns"><a data-toggle="tooltip" data-placement="top"
                                                                      title="" data-original-title="Delete"><i
            class="fa fa-trash"></i></a></span>
      </ul>
    </div>
  </div>


</template>

<script>

export default {
  props: {
    file: {
      type: Object,
      required: true
    },
    mind: {
      type: Object,
      required: true
    },
    got_hashword: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      hashed_mind: null,
      preview: null,
      file_type: '', // 'img', other
      display_none: false,
    }
  },
  methods: {
    getFile() {
      this.$store.dispatch('getFileById', this.file.id)
          .catch((err) => {
            alert(err)
          })
          .then((res) => {
            this.file._file_data = new File([res.data], this.file.name);
            this.fileReader()
          })
    },
    fileReader() {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target.result;
      }

      reader.readAsDataURL(this.file._file_data);
    },
    convertWordArrayToUint8Array(wordArray) {
      // buni stackoverflow dan olganman
      var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
      var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
      var uInt8Array = new Uint8Array(length), index = 0, word, i;
      for (i = 0; i < length; i++) {
        word = arrayOfWords[i];
        uInt8Array[index++] = word >> 24;
        uInt8Array[index++] = (word >> 16) & 0xff;
        uInt8Array[index++] = (word >> 8) & 0xff;
        uInt8Array[index++] = word & 0xff;
      }
      return uInt8Array;
    },
    autoSetFileType() {
      var types = ['jpg', 'jpeg', 'gif', 'bmp', 'png',]
      for (let type of types) {
        if (this.file.name.endsWith(type)) {
          this.file_type = 'img'
        }
      }
    },
    clickOnDelete() {

      const data = {
        file_id: this.file.id,
        mind_id: this.mind.id,
      }

      this.$store.dispatch('deleteFileFromMind', data)
          .catch((err) => {
            alert(err)
          })
          .then((res) => {
            this.display_none = true
          })
    },
  },
  mounted() {
    this.getFile()

    this.autoSetFileType()
    if (this.file.hashed_id) {
      this.file._state_hashed = true
    }

  },
  watch: {
    got_hashword() {
      if (!this.file.hashed_id)
        return

      var file = this.file._file_data;
      var reader = new FileReader();
      reader.onload = () => {
        var key = this.mind._hashword;

        var decrypted = CryptoJS.AES.decrypt(reader.result, key);               // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
        var typedArray = this.convertWordArrayToUint8Array(decrypted);               // Convert: WordArray -> typed array

        var fileDec = new Blob([typedArray]);                                   // Create blob from typed array

        var file = new File([fileDec], this.file.name, {type: this.file._file_data.type});
        this.file._file_data = file

        this.fileReader()
      };
      reader.readAsText(file);

    }
  },
}
</script>


<style scoped>

.drive-item {
  width: 11.6vw;
  margin-right: 0.7em;
  display: inline-block;
  float: left
}

.drive-item:hover {
  box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
  z-index: 1
}

.drive-item-inner {
  padding: 0.7em
}

.drive-item-title {
  margin-bottom: 1em;
  height: 1.6em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #6dbd63;
}

.drive-item-title a {
  color: #494d55
}

.drive-item-title a:hover {
  color: navy;
}


/* todo */
.drive-item-thumb {
  width: 100px;
  height: 80px;
  margin: 0 auto;
  color: #616670;
  overflow: hidden;
}

.drive-item-thumb a {
  -webkit-opacity: .7;
  -moz-opacity: .7;
  opacity: .7
}

.drive-item-thumb a:hover {
  -webkit-opacity: 1;
  -moz-opacity: 1;
  opacity: 1
}

.drive-item-thumb .fa {
  display: inline-block;
  font-size: 36px;
  margin: 0 auto;
  margin-top: 20px
}

.drive-item-footer .utilities {
  margin-bottom: 0
}

.drive-item-footer .utilities li:last-child {
  padding-right: 0
}

.file-icon {
  padding: 1.1em;
  border-radius: .3em;
}

.file-icon:hover {
  background-color: lightslategrey;
  color: blue;
}

.file-btns {
  padding: 0.36em;
  border-radius: 0.2em;
}

.delete-file:hover {
  background-color: black;
}

/*
@media (max-width: 767px) {
  .view-account .content-panel .title {
    text-align: center
  }

  .view-account .side-bar .user-info {
    padding: 0
  }

  .view-account .side-bar .user-info .img-profile {
    width: 60px;
    height: 60px
  }

  .view-account .side-bar .user-info .meta li {
    margin-bottom: 5px
  }

  .view-account .content-panel .content-header-wrapper .actions {
    position: static;
    margin-bottom: 30px
  }

  .view-account .content-panel {
    padding: 0
  }

  .view-account .content-panel .content-utilities .page-nav {
    position: static;
    margin-bottom: 15px
  }

  .drive-item {
    width: 100px;
    margin-right: 5px;
    float: none
  }

  .drive-item-thumb {
    width: auto;
    height: 54px
  }

  .drive-item-thumb .fa {
    font-size: 24px;
    padding-top: 0
  }

  .view-account .content-panel .avatar .figure img {
    float: none;
    margin-bottom: 15px
  }

  .view-account .file-uploader {
    margin-bottom: 15px
  }

  .view-account .mail-subject {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  .view-account .content-panel .mails-wrapper .mail-item .time-container {
    position: static
  }

  .view-account .content-panel .mails-wrapper .mail-item .time-container .time {
    width: auto;
    text-align: left
  }
}

@media (min-width: 768px) {
  .view-account .side-bar .user-info {
    padding: 0;
    padding-bottom: 15px
  }

  .view-account .mail-subject .subject {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
}

@media (min-width: 992px) {
  .view-account .content-panel {
    min-height: 800px;
    border-left: 1px solid #f3f3f7;
    margin-left: 200px
  }

  .view-account .mail-subject .subject {
    max-width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  .view-account .side-bar {
    position: absolute;
    width: 200px;
    min-height: 600px
  }

  .view-account .side-bar .user-info {
    margin-bottom: 0;
    border-bottom: none;
    padding: 30px
  }

  .view-account .side-bar .user-info .img-profile {
    width: 120px;
    height: 120px
  }

  .view-account .side-bar .side-menu {
    text-align: left
  }

  .view-account .side-bar .side-menu .nav {
    display: block
  }

  .view-account .side-bar .side-menu .nav > li {
    display: block;
    float: none;
    font-size: 14px;
    border-bottom: 1px solid #f3f3f7;
    margin-right: 0;
    margin-bottom: 0
  }

  .view-account .side-bar .side-menu .nav > li > a {
    display: block;
    color: #9499a3;
    padding: 10px 15px;
    padding-left: 30px
  }

  .view-account .side-bar .side-menu .nav > li > a:hover {
    background: #f9f9fb
  }

  .view-account .side-bar .side-menu .nav > li.active a {
    background: #f9f9fb;
    border-right: 4px solid #40babd;
    border-bottom: none
  }

  .theme-2 .view-account .side-bar .side-menu .nav > li.active a {
    border-right-color: #6dbd63
  }

  .theme-3 .view-account .side-bar .side-menu .nav > li.active a {
    border-right-color: #497cb1
  }

  .theme-4 .view-account .side-bar .side-menu .nav > li.active a {
    border-right-color: #ec6952
  }

  .view-account .side-bar .side-menu .nav > li .icon {
    font-size: 24px;
    vertical-align: middle;
    text-align: center;
    width: 40px;
    display: inline-block
  }
}
*/

.module {
  border: 1px solid aliceblue;
  border-bottom-width: 2px;
  background: darkgray;
  margin-bottom: 1em;
  position: relative;
  border-radius: .36em;
  background-clip: padding-box;
}

.module .module-footer {
  background: #494d55;
  border-top: 1px solid #f3f3f7;
  padding: 15px;
  border-radius: .36em;
  padding-right: 3em;
}

.module .module-footer a {
  color: #a2a6af;
}


.module .module-footer .fa-trash {
  color: lightslategrey;
}


.file-img {
  background-color: darkolivegreen;
  overflow: hidden;
}

.drive-item-thumb:hover {
  overflow: visible;
}

</style>
