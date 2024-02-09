const firstRow = prompt('Введите первую строку:');
const secondRow = prompt('Введите вторую строку:');

function countLetters(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i].toLowerCase() === letter.toLowerCase()) {
            count++;
        }
    }
    return count;
}

function getRow(firstRow, secondRow) {
    const letter = prompt('Введите букву для подсчета:');

    const countFirstRow = countLetters(firstRow, letter);
    const countSecondRow = countLetters(secondRow, letter);

    if (countFirstRow > countSecondRow) {
        return firstRow;
    } else if (countSecondRow > countFirstRow) {
        return secondRow;
    } else {
        return 'Количество букв в обеих строках одинаково';
    }
}

alert(getRow(firstRow, secondRow));

function formattedPhone(phone) {
    
    const digitsOnly = phone.replace(/\D/g, '');

    
    const regex = /^(\+?7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/;
    const match = digitsOnly.match(regex);

    if (!match) {
        return 'Неверный формат номера';
    }

    
    const [, countryCode, regionCode, firstPart, secondPart, thirdPart] = match;

    
    const formattedNumber = `+38 (${regionCode}) ${firstPart}-${secondPart}-${thirdPart}`;

    return formattedNumber;
}


console.log(formattedPhone('+71234567890')); 
console.log(formattedPhone('89211234567'));
console.log(formattedPhone('9211234567'));  
console.log(formattedPhone('79211234567'));
console.log(formattedPhone('123456789'));

