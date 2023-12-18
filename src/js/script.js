const image1 = document.querySelector(".logo__menu");
const image2 = document.querySelector(".logo__menu2");
const menuList = document.getElementById("menuList");
const ok =document.querySelector(".fork-app__article");
image1.addEventListener("click", function() {
   image1.style.display = "none";
   image2.style.display = "block";
   menuList.style.display = "block";
   ok.style.display = "none";
}

);

image2.addEventListener("click", function() {
   image2.style.display = "none";
   image1.style.display = "block";
   menuList.style.display = "none";
   ok.style.display = "block";
});





const menuList2 = document.getElementById("menuList");
const image = document.getElementById("image");
const text = document.getElementById("text");


menuList2.addEventListener("click", function(event) {
   const listItem = event.target;
   
   if (listItem.classList.contains("menu__mobail-a")) {
   
      
      const activeItem = menuList2.querySelector(".menu__mobail-a.active");
      if (activeItem) {
         activeItem.classList.remove("active");
      }
      
      listItem.classList.add("active");
     
   }
});










