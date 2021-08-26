<template>
  <form @submit.prevent="submitSearch" class=" justify-content-center row g-1">
    <div class="col-4">
    <input v-model="cari" type="text" class="form-control" placeholder="Cari obat .....">
    </div>
        <div class="col-auto">
    <button @click.prevent="startTxtToSpeech" class="btn btn-light mb-3 mx-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
        <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
        </svg>
    </button>
    <button class="btn btn-warning mb-3" type="submit">Cari</button>
    </div>
    </form>
</template>

<script>
export default {
    name:"ButtonSearch",
    data(){
      return{
        cari:"",
        runtimeTranscription_: "",
        transcription_: [],
        lang_: "id-ID"
      }
  },
  methods:{
    startTxtToSpeech() {
        // initialisation of voicereco
        window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new window.SpeechRecognition();
        recognition.lang = this.lang_;
        recognition.interimResults = true;
        // event current voice reco word
        recognition.addEventListener("result", event => {
        const text = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join("");
        this.runtimeTranscription_ = text;
    });
    // end of transcription
    recognition.addEventListener("end", () => {
        this.transcription_.push(this.runtimeTranscription_);
        this.cari += `${this.runtimeTranscription_} `
        this.runtimeTranscription_ = "";
        recognition.stop();
    });
    recognition.start();
    },
    startSpeechToTxt() {
        // start speech to txt
        var utterance = new SpeechSynthesisUtterance("Message Envoyé");
        window.speechSynthesis.speak(utterance);
    },
    submitSearch(){
      const payload = {
        cari : this.cari
      }
      this.$store.dispatch("submitSearch",payload)
      .then((data)=>{
        console.log(data);
        this.$router.push(`/search/${payload.cari}`).catch(()=>{})
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
}
</script>

<style>

</style>