'use strict';

var phoneBook = {};

/**
 * Добавляет записи в телефонную книгу
 * @param {String} name
 * @param {String} phone
 * @param {String} email
 */
module.exports.add = function add(name, phone, email) {
    if (phoneBook[name]) {
        console.log('Это имя уже существует');
        return;
    }

    if(!isNameValid(name) || !isPhoneValid(phone) || !isEmailValid(email)) {
        console.log('Запись не добавлена. Данные не валидны');
        return;
    }

    phoneBook[name] = {
        phone: phone,
        email: email
    };
};

/**
 * Ищет записи в телефонной книге по всем полям.
 * @param {String} query Искомая строка
 * @param {Boolean} isCalledAnyMethod Вызван из другого метода
 * @returns {String[]} Массив найденных имен
 */
module.exports.find = function find(query, isCalledAnyMethod) {
    var findedRecordsNames = [];

    Object.keys(phoneBook).forEach(function (name) {
        var value = phoneBook[name];
        var queryResult = name.indexOf(query) !== -1 || value.phone.indexOf(query) !== -1 || value.email.indexOf(query) !== -1;

        if (!query || queryResult) {
            !isCalledAnyMethod && printFindedRecords(name, value.phone, value.email);

            findedRecordsNames.push(name);
        }
    });

    return findedRecordsNames;
};

/**
 * Удаляет записи из телефонной книги
 * @param {String} query Искомая строка
 */
module.exports.remove = function remove(query) {
    var items = module.exports.find(query, true);

    items.forEach(function (item) {
        delete phoneBook[item];
    });
    console.log(getDeletedMessage(items.length));
};

/**
 * Выводит найденную запись
 * @param {String} name
 * @param {String} phone
 * @param {String} email
 */
function printFindedRecords (name, phone, email) {
    console.log(name + ', ' + phone + ', ' + email);
}

/**
 * Возвращает текст о кол-ве удаленных контактов
 * @param {Number} num Кол-во удаленных контактов
 * @returns {String}
 */
function getDeletedMessage(num) {
    if (num === 0) {
        return 'Удалять нечего';
    }

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
    if ((num > 10 && num < 20) || units === 0) {
        contacts = pluralContacts[5];
        deleted = deletedContacts[2];
    } else {
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
    }
    return deleted + ' ' + num + ' ' + contacts;
}

/**
 * Валидирует имя
 * @param {String} name
 * @returns {Boolean}
 */
function isNameValid (name) {
   return name && typeof name === 'string';
}

/**
 * Валидирует номер телефона
 * @param {String} phone
 * @returns {Boolean}
 */
function isPhoneValid (phone) {
   return /^\+?\d*\s*(\d{3}|\(\d{3}\))\s*(\d{7}|(\d{3}(\s|-)?\d(\s|-)?\d{3})|\d{3}(\s|-)?\d{2}(\s|-)?\d{2})$/gim.test(phone);
}

/**
 * Валидирует email
 * @param {String} email
 * @returns {Boolean}
 */
function isEmailValid (email) {
    return /^\w+@[\wа-яё-]+(\.[\wа-яё]{2,3})+$/gim.test(email);
}
