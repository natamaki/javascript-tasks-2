'use strict';

var phoneBook = {};

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    if (phoneBook[name]) {
        console.log('Это имя уже существует');
        return;
    }

    if(!isPhoneValid(phone) || !isEmailValid(email)) {
        console.log('Запись не добавлена. Данные не валидны');
        return;
    }

    phoneBook[name] = {
        phone: phone,
        email: email
    };
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    Object.keys(phoneBook).forEach(function (name) {
        var value = phoneBook[name];
        if (!query) {
            printFindedRecords (name, value.phone, value.email)
        } else if (name.indexOf(query) !== -1 || value.phone.indexOf(query) !== -1 || value.email.indexOf(query) !== -1) {
            printFindedRecords (name, value.phone, value.email)
        }
    });
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var keys = Object.keys(phoneBook).filter(function (key) {
        return key.indexOf(query) !== -1;
    });

    if (keys.length) {
        keys.forEach(function (key) {
            delete phoneBook[key];
        });
        console.log(getDeletedMessage(keys.length));
    }
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {

    // Ваша чёрная магия здесь

};

function printFindedRecords (name, phone, email) {
    console.log(name + ', ' + phone + ', ' + email);
}

function getDeletedMessage(num) {
    var pluralContacts = {
        1: 'контакт',
        2: 'контакта',
        5: 'контактов'
    };
    var deletedContacts = {
        1: 'Удалён',
        2: 'Удалёно'
    };

    var deleted;
    var contacts;
    var units = num % 10;
    if (units >= 2 && units < 5) {
        contacts = pluralContacts[2];
        deleted = deletedContacts[2];
    } else if (units >= 5) {
        contacts = pluralContacts[5];
        deleted = deletedContacts[2];
    } else {
        contacts = pluralContacts[1];
        deleted = deletedContacts[1];
    }
    return deleted + ' ' + num + ' ' + contacts;
}

function isPhoneValid (phone) {
   return /^\+?\d*\s*(\d{3}|\(\d{3}\))\s*\d{3}(\s|-)?\d(\s|-)?\d{3}$/gim.test(phone);
}

function isEmailValid (email) {
    return /^\w+@[\wа-яё-]+(\.[\wа-яё]{2,3})+/gim.test(email);
}
