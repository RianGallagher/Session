export default {
  whitelist: [
    "pop",
    "rock",
    "singer-songwriter",
    "blues",
    "blues-rock",
    "metal",
    "mumble-rap",
    "rap",
    "punk",
    "pop-punk",
    "hip-hop"
  ],
  inWhiteList: function (genres){
    return genres.find((genre) => {
      return this.whitelist.includes(genre);
    })
  }
}
