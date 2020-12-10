document.addEventListener("DOMContentLoaded",()=>{
    if(screen.width>900){
        let section_1_1=document.getElementById("section-1-1");
        let parallax=new Parallax(section_1_1);
        
        let section_1_2=document.getElementById("section-1-2");
        parallax=new Parallax(section_1_2);
        
        let section_1_3=document.getElementById("section-3");
        parallax=new Parallax(section_1_3);
    }
})