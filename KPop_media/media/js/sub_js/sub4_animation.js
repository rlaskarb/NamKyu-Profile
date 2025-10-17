document.addEventListener("DOMContentLoaded",function(){
    const ainElements= document.querySelectorAll(".scroll-ani");

    if(ainElements.length>0){
        const aniObserver= new IntersectionObserver(function(entries,observer){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("is-visible");

                }else{
                    entry.target.classList.remove("is-visible");
                }
            });
        },{threshold:0.1});
        ainElements.forEach(function(element){
            aniObserver.observe(element);
        });
    }
});