<template>
  <b-modal 
    id="modal-new-shot"
    size="xl" hide-header hide-footer
    >
  </b-modal>
</template>

<script>
export default {
  name: 'ShotCreate',
  data () {
    return {
      shot:{
        title:'',
        content:'',
        movie_char:'',
      },
    }
  },
  methods: {
    createShot(shot){
      if (this.shot.image === ''){
        alert('이미지를 넣어주세요')
      } else {
        this.$store.dispatch('createShot', shot)
        this.$bvModal.hide('modal-new-shot')
      }
    },
  },
}
</script>

<style scoped>
 #modal-1___BV_modal_body_ {
   padding: 0;
 }
</style>