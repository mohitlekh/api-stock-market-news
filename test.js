function add(a){
    return function (b) {
        var total = a
        if (b){
            total = a + b;
            return add(total);
        }             
        else
            return (total);
    }
}

console.log(add(5)(2)(3)(1)());