let taa = [1,5,10,4,7,3]
function nilaiTertinggi(arr){
    let max = arr[0];
    for(let i = 1; i < arr.length; i++){
        if(arr[i] > max){
            max = arr[i];
        }
    }
    return max;
}

function nilairatarata(arr){
    let total = 0;
    for(let i = 0; i < arr.length; i++){
        total += arr[i];
    }
    return total / arr.length;
}
console.log(nilairatarata(taa));