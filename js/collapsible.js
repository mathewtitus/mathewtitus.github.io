
// Add collapsing activity to `collapsible` class items

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
    var icos = this.children[0].children[0].children
    for (j=0; j < icos.length; j++){
      icos[j].classList.toggle("hide");
    }
  });
}
