let name = "Nata";
let dict = {};

for (let i=0; i < name.length; i++){
    const num = name[i];
    dict[num] ? dict[num]++ : (dict[num] = 1);
    // dict[num]++;
};

console.log(dict);