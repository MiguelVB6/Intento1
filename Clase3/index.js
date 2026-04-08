var cont1=0;
var cont2=0;
var cont3=0;
console.log("hola:3")
function traduce1(){
    parrafo=document.getElementById("txt1");
    if (cont1 % 2 == 0){
        parrafo.innerHTML = 
        `<p>Welcome to the coziest cat café in town.</p>
        <p>Every cup of coffee comes with purrs and fluffy company.</p>`;
    }
    else{
        parrafo.innerHTML = 
        `<p>Bienvenido al cat café más acogedor de la ciudad.</p>
        <p>Cada taza de café viene con ronroneos y compañía esponjosa.</p>`;
    }
    cont1 = cont1+1;
}
function traduce2(){
    parrafo=document.getElementById("txt2");
    if (cont2 % 2 == 0){
        parrafo.innerHTML = 
        `<p>Relájate y juega con nuestros gatos rescatados.</p>
        <p>Disfruta la combinación perfecta de comodidad, café y cariño.</p>`;
    }
    else{
        parrafo.innerHTML = 
        `<p> Relax and play with our rescued cats.</p>
        <p>Enjoy the perfect blend of comfort, coffee, and cuddles.</p>`;
    }
    cont2 = cont2+1;
}
function random_cat(){
    numero = Math.floor(Math.random() * 3) + 1;

    img = document.querySelector("#img2 img");

    switch(numero) {
        case 1:
            img.src = "gato.jpeg";
            break;
        case 2:
            img.src = "gato2.jpg";
            break;
        case 3:
            img.src = "gato3.jpeg";
            break;
    }
}
function change_background(){
    let fondo = document.body;
    if (cont3 % 2 == 0){
        fondo.style.backgroundImage = "url(background2.avif)";
        fondo.style.backgroundSize = "cover";      
        fondo.style.backgroundPosition = "center";
        fondo.style.backgroundRepeat = "no-repeat";
    }
    else{
        fondo.style.backgroundImage="url(cafe_image.png)";
        fondo.style.backgroundSize="cover";
        fondo.style.backgroundPosition="center"; 
        fondo.style.backgroundRepeat="no-repeat";
    }
    cont3=cont3+1;

}