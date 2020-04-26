function generarSecuencia(n){//Genera las secuencias para el simon dice
    var arregloSecuencias = new Array(n)
    for (i=0; i<n; i++) {
        arregloSecuencias[i]   = Math.round(Math.random() * (7 - 1) + 1);
      
    }
    return arregloSecuencias
}
function shining(element,nString){
    element.classList.remove("myCanvas"+nString);
    element.classList.add("shine"+nString);
    setTimeout(()=>{
        element.classList.remove("shine"+nString);
        element.classList.add("myCanvas"+nString);
    }, 500)
}
function Asincrono(secuence){
    let cont = 0;
    function print(){
        setTimeout(()=>{
            var element = document.getElementById("take"+ secuence[cont].toString())
    
         shining(element, secuence[cont])
         cont++
         if(cont < secuence.length)
             print()
        },1000)
    }
     print() 
 }
///OBJETOS------------
function Nivel(){//objeto que indicar el nivel e dificultad
    this.n = 0;
    return this.n
}
Nivel.prototype.Mas = function(){
    this.n++;  
}
Nivel.prototype.Reinicio = function(){
    this.n = 0;
}
function Juego(element){//oBJETO DONDE CORRERA TODO EL JUEGO
    this.element = element;
    this.life = 1;
    this.anwers = [];
    this.respuestas = [];//iluminandoAlClick 
    return this
}
Juego.prototype.AsignarEvent = function(){
    function iluminandoAlClick (element, n){
        let number = n.toString();
        var element = document.getElementById("take"+number)
        element.addEventListener("click", ()=>{
               shining(element, number); 
               this.anwers.push(parseInt(number))
        if(this.anwers.length ==  this.respuestas.length)
             var comparar1 = this.anwers.join('')
             var comparar2 = this.respuestas.join('')
             this.continues= (comparar1 ==  comparar2) ? 1 : 0
        });
     return n;  
    }
    for(i=1; i<8; i++){
        let n = i.toString();
        iluminandoAlClick(this.element+n, i);  
    }
}
Juego.prototype.IniciandoJuego = function(){
    var level = new Nivel()
    function global(object){
    function Main(object){
        object.Mas()
        var difficulty = level.n+3;
        console.log(difficulty);
        this.respuestas = generarSecuencia(difficulty);
        this.anwers = new Array(0)
        Asincrono(this.respuestas)
        return difficulty;
    }
    var another = Main(object) *2+3;
    setTimeout(function(){
        if(this.continues == 1){
            console.log('ganaste 1')
            this.anwers = [];
            this.respuestas = [];//iluminandoAlClick 
             this.continues = undefined
            global(object)
        }else{
            console.log('perdiste')
        }
       
    }, another*1000)
}
global(level);

}


const newGame = new Juego('element');
newGame.AsignarEvent();
newGame.IniciandoJuego();


