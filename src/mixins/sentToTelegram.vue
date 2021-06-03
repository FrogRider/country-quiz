<script>

  let myMixin = {
    data: function() {
      return {
        sendTo: '-291259123',
        token: `789463521:AAF7Dpt3vt9kAqqx4C-M2k9IMPu5xpxWeoM`
      }
    },
    methods: {
      sendToTelegram: function (msg) {
        const endpointUrl = `https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.sendTo}&text=${msg}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', endpointUrl);
        xhr.send();
      }
    },
    mounted () {
      
    }
  }

  export default myMixin
</script>
