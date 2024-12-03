$("#toEncrypt").on("input", function() {
  var el = $("#toDecrypt");
  $(this).val() ? el.val(Cypher.cypher($(this).val())) : el.val("")
})

$("#toDecrypt").on("input", function() {
  var el = $("#toEncrypt");
  $(this).val() ? el.val(Cypher.decypher($(this).val())) : el.val("")
})

function copyText(btn, target) {
  navigator.clipboard.writeText($(target).val());
  var orgHtml = $(btn).html();
  $(btn).html("<md-icon><img src='assets/done.svg'/></md-icon>");
  
  setTimeout(function() {
    $(btn).html(orgHtml)
  }, 3000);
}