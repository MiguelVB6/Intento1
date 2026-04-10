//Miguel Eduardo Vega A01781892
//1. Escribe una función llamada firstNonRepeating que encuentre el primer 
//carácter de un cadena de texto que no se repite. Prueba tu función con: 'abacddbec'

function firstNonRepeating(cadenaDeTexto) {
    for (let i = 0; i<cadenaDeTexto.length; i++) {
        let letter= cadenaDeTexto[i];
        let cont=0;
        for(let j=0; j<cadenaDeTexto.length; j++){
            if(cadenaDeTexto[j]===letter){
                cont++;
            }
        }
        if (cont === 1) {
            return letter;
        }
    }
    return null;
}
console.log(firstNonRepeating('abacddbec'));

//2. Escribe una función llamada bubbleSort que implemente el algoritmo 'bubble-sort' para ordenar una lista de números.

function bubbleSort(numbers) {
    let n = numbers.length;
    for (let i=0; i< n - 1; i++) {
        for (let j=0; j<n-i-1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
            }
        }
    }
    return numbers;
}
console.log(bubbleSort([7,2,6,3]))

// 3. Escribe dos funciones: la primera con nombre invertArray que invierta un arreglo de números y regrese un nuevo arreglo 
//con el resultado; la segunda, con nombre invertArrayInplace,que modifique el mismo arreglo que se pasa como argumento. 
//No se permite usar la función integrada 'reverse'.

function invertArray(numbers) {
    let new_array = [];
    for (let i = numbers.length - 1; i>=0; i--) {
        new_array.push(numbers[i]);
    }
    return new_array;
}
let numbers=[1,2,3,4,5,7];
console.log(invertArray(numbers));
console.log(numbers); //el arreglo de numeros original no ha cambiado

function invertArrayInPlace(numbers) {
    let end=numbers.length-1;
    for (let i =0; i<end; i++) {
        let temp = numbers[i];
        numbers[i] = numbers[end];
        numbers[end] = temp;
        end--;
    }
}
invertArrayInPlace(numbers);
console.log(numbers);

//4. Escribe una función llamada capitalize que reciba una cadena de texto y regrese una nueva con la primer letra 
//de cada palabra en mayúscula.

function capitalize(cadena){
    let nueva_cadena = cadena[0].toUpperCase();
    for (let i=1; i<cadena.length; i++) {
        if (cadena[i-1]===' '){
            nueva_cadena += cadena[i].toUpperCase();
        }
        else{
            nueva_cadena+=cadena[i];
        }
    }
    return nueva_cadena
}
console.log(capitalize('hola como estas'));

//5. Escribe una función llamada mcd que calcule el máximo común divisor de dos números.

function mcd (num_a, num_b){
    let divisible=[];
    for (let i=1; i<=num_a; i++) {
        if (num_a%i===0 && num_b%i===0){
            divisible.push(i);
        }
    }
    return divisible[divisible.length-1];
}

console.log(mcd(6, 12));

//6. Crea una función llamada hackerSpeak que cambie una cadena de texto a 'Hacker Speak'. 
//Por ejemplo, para la cadena 'Javascript es divertido', su hacker speak es: 'J4v45c1pt 35 d1v3rt1d0'.

function hackerSpeak(texto){
    let new_texto="";
    for (let i=0; i<texto.length; i++) {
        if(texto[i]==='a' || texto[i]==='A'){
            new_texto+='4';
        }
        else if(texto[i]==='e' || texto[i]==='E'){
            new_texto+='3';
        }
        else if(texto[i]==='s' || texto[i]==='S'){
            new_texto+='5';
        }
        else if(texto[i]==='o' || texto[i]==='O'){
            new_texto+='0';
        }
        else if(texto[i]==='i' || texto[i]==='I'){
            new_texto+='1';
        }
        else{
        new_texto+=texto[i];
        }
    }
    return new_texto;
}
console.log(hackerSpeak('Javascript es divertido'));

//7. Escribe una función llamada factorize que reciba un número, y regrese una lista con todos sus factores. Por ejemplo:
//factorize(12) -> [1, 2, 3, 4, 6, 12]

function factorize(num){
    let divisible=[];
    for (let i=1; i<=num; i++) {
        if (num%i===0 ){
            divisible.push(i);
        }
    }
    return divisible;
}
console.log(factorize(12));

//8. Escribe una función llamada deduplicate que quite los elementos duplicados de un arreglo y regrese una lista con los elementos 
//que quedan. Por ejemplo: deduplicate([1, 0, 1, 1, 0, 0]) -> [1, 0]

function deduplicate(array){
    let new_array=[]
    for (let i=0; i<array.length; i++) {
        if(!new_array.includes(array[i])){
            new_array.push(array[i]);
            }
    }
    return new_array;
}
console.log(deduplicate([1,0,1,1,0,0]))

//9. Escribe una función llamada findShortestString que reciba como parámetro una lista de cadenas de texto, y regrese la longitud 
//de la cadena más corta.

function findShortestString(arrayOfStrings){
    let shortest=arrayOfStrings[0];
    for (let i=0; i<arrayOfStrings.length; i++) {
        if (arrayOfStrings[i].length <shortest.length){
            shortest=arrayOfStrings[i];
        }
    }
    return shortest.length;
}

console.log(findShortestString(['hola','alo','computadora']));

//10. Escribe una función llamada isPalindrome que revise si una cadena de texto es un palíndromo o no.

function isPalindrome(text){
    while(text.length>1){
        if(text[0]!==text[text.length-1]){
            return false;
        }
        text=text.slice(1,-1); //busqué esta función para quitar el primer y ultimo caracter de un string más facil

    }
    return true;
}
console.log(isPalindrome('olo'));

//11. Escribe una función llamada sortStrings que tome una lista de cadena de textos y devuelva una nueva lista con todas las 
//cadenas en orden alfabético.

function sortStrings(array){
    let new_array = array.slice();
    for (let i=0;i<new_array.length; i++) {
        for (let j = 0; j < new_array.length -1; j++) {
            if (new_array[j].localeCompare(new_array[j + 1])> 0) { //esta función igual la tuve que buscar para comparar strings
                let temp = new_array[j];
                new_array[j] = new_array[j + 1];
                new_array[j + 1] = temp;
            }
        }
    }
    return new_array;
}
console.log(sortStrings(['arriba', 'perro', 'zombie', 'manzana']));

//12. Escribe una función llamada stats que tome una lista de números y devuelva una lista con dos elementos: el promedio y la moda. 
//Por ejemplo: stats([8, 4, 2, 6, 8, 13, 17, 2, 4, 8]) -> [ 7.2, 8 ]

function stats(numlist){
    let suma=0
    for (let i=0;i<numlist.length; i++){
        suma+=numlist[i];
    }
    let average=suma/numlist.length;
    let count={};
    let mostcommon=0;
    let mode=numlist[0];
    for (let i=0;i<numlist.length; i++){
        let num =numlist[i];
        count[num]= (count[num]||0)+1;
        if (count[num]>mostcommon){
            mostcommon= count[num];
            mode =num;
        }
    }
    return [average, mode];
}
console.log(stats([8, 4, 2, 6, 8, 13, 17, 2, 4, 8]));

//13. Escribe una función llamada popularString que tome una lista de cadenas de texto y devuelva la cadena más frecuente.

function popularString (cadenaTexto){
    let count={};
    let mostcommon=0;
    let popular=cadenaTexto[0];
    for (let i=0;i<cadenaTexto.length; i++){
        let num =cadenaTexto[i];
        count[num]= (count[num]||0)+1;
        if (count[num]>mostcommon){
            mostcommon= count[num];
            popular =num;
        }
    }
    return popular;
}
console.log(popularString(['hola','adios','hola','alo']));

//14. Escribe una función llamada isPowerOf2 que tome un número y devuelva verdadero si es una potencia de dos, falso de lo contrario.

function isPowerOf2(n){
    if (n < 1){
    return false;
    }
    while (n%2 ===0){
        n= n/2;
    }
    if(n ===1){
        return true;
    }
    else{
        return false;
    }
}

console.log(isPowerOf2(10));

//15. Escribe una función llamada sortDescending que tome una lista de números y devuelva una nueva lista con todos los números en orden 
//descendente.

function sortDescending(numbers){
    let new_numbers = numbers
    for (let i=0; i<new_numbers.length; i++) {
        for (let j=0; j<new_numbers.length - 1; j++) {
            if (new_numbers[j]<new_numbers[j+1]) {
                let temp= new_numbers[j];
                new_numbers[j] =new_numbers[j + 1];
                new_numbers[j+1] = temp;
            }
        }
    }
    return new_numbers;
}
console.log(sortDescending([3,5,2,1]));