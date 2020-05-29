<template>
  <div class="q-pa-md">
    <q-uploader :factory="factoryFnNew" style="max-width: 300px" />
    <q-uploader :factory="factoryFn" style="max-width: 300px" />
  </div>
</template>
<script>
import { axiosInstance } from "boot/axios";
export default {
  data() {
    return {
      selected_file: "",
      check_if_document_upload: false,
      mobileData: true,
      bluetooth: false
    };
  },
  methods: {
    factoryFn(file) {
      // console.log(file);
      let total;
      var formData = new FormData();
      // var imagefile = document.querySelector("#file");
      formData.append("file", file[0]);
      // console.log(formData);
      axiosInstance
        .post("/fileupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(resp => {
          // console.log(resp.data);
          total = resp.data;
        })
        .catch(err => {
          // console.log(err);
          total = err;
        });
      return total;
    },
    factoryFnNew(files) {
      // returning a Promise
      // console.log(files)
      let formData = new FormData();
      // var imagefile = document.querySelector("#file");
      formData.append("file", files[0]);
      return new Promise(resolve => {
        // simulating a delay of 2 seconds
        setTimeout(() => {
          resolve({
            url: "http://localhost:9876/fileupload",
            methods: "POST",
            headers: [
              {
                "Content-Type": "multipart/form-data"
              }
            ],
            data: {
              formData
            }
          });
        }, 100);
      });
    }
  }
};
</script>
