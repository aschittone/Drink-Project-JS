document.addEventListener("DOMContentLoaded", function() {
  $('#search-box').keypress(function(e) {
    if(e.keyCode==13){
      e.preventDefault();
      drinkByIndgredient($('#search-box')[0].value)
    }
  })
})
