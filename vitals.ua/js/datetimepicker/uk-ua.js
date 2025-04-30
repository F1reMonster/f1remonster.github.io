//! moment.js locale configuration
//! locale : ukrainian (uk)
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion ElensГєle : https://github.com/Oire

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';


    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': 'С…РІРёР»РёРЅР°_С…РІРёР»РёРЅРё_С…РІРёР»РёРЅ',
            'hh': 'РіРѕРґРёРЅР°_РіРѕРґРёРЅРё_РіРѕРґРёРЅ',
            'dd': 'РґРµРЅСЊ_РґРЅС–_РґРЅС–РІ',
            'MM': 'РјС–СЃСЏС†СЊ_РјС–СЃСЏС†С–_РјС–СЃСЏС†С–РІ',
            'yy': 'СЂС–Рє_СЂРѕРєРё_СЂРѕРєС–РІ'
        };
        if (key === 'm') {
            return withoutSuffix ? 'С…РІРёР»РёРЅР°' : 'С…РІРёР»РёРЅСѓ';
        }
        else if (key === 'h') {
            return withoutSuffix ? 'РіРѕРґРёРЅР°' : 'РіРѕРґРёРЅСѓ';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    function monthsCaseReplace(m, format) {
        var months = {
            'nominative': 'СЃС–С‡РµРЅСЊ_Р»СЋС‚РёР№_Р±РµСЂРµР·РµРЅСЊ_РєРІС–С‚РµРЅСЊ_С‚СЂР°РІРµРЅСЊ_С‡РµСЂРІРµРЅСЊ_Р»РёРїРµРЅСЊ_СЃРµСЂРїРµРЅСЊ_РІРµСЂРµСЃРµРЅСЊ_Р¶РѕРІС‚РµРЅСЊ_Р»РёСЃС‚РѕРїР°Рґ_РіСЂСѓРґРµРЅСЊ'.split('_'),
            'accusative': 'СЃС–С‡РЅСЏ_Р»СЋС‚РѕРіРѕ_Р±РµСЂРµР·РЅСЏ_РєРІС–С‚РЅСЏ_С‚СЂР°РІРЅСЏ_С‡РµСЂРІРЅСЏ_Р»РёРїРЅСЏ_СЃРµСЂРїРЅСЏ_РІРµСЂРµСЃРЅСЏ_Р¶РѕРІС‚РЅСЏ_Р»РёСЃС‚РѕРїР°РґР°_РіСЂСѓРґРЅСЏ'.split('_')
        },
        nounCase = (/D[oD]? *MMMM?/).test(format) ?
            'accusative' :
            'nominative';
        return months[nounCase][m.month()];
    }
    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'РЅРµРґС–Р»СЏ_РїРѕРЅРµРґС–Р»РѕРє_РІС–РІС‚РѕСЂРѕРє_СЃРµСЂРµРґР°_С‡РµС‚РІРµСЂ_РївЂ™СЏС‚РЅРёС†СЏ_СЃСѓР±РѕС‚Р°'.split('_'),
            'accusative': 'РЅРµРґС–Р»СЋ_РїРѕРЅРµРґС–Р»РѕРє_РІС–РІС‚РѕСЂРѕРє_СЃРµСЂРµРґСѓ_С‡РµС‚РІРµСЂ_РївЂ™СЏС‚РЅРёС†СЋ_СЃСѓР±РѕС‚Сѓ'.split('_'),
            'genitive': 'РЅРµРґС–Р»С–_РїРѕРЅРµРґС–Р»РєР°_РІС–РІС‚РѕСЂРєР°_СЃРµСЂРµРґРё_С‡РµС‚РІРµСЂРіР°_РївЂ™СЏС‚РЅРёС†С–_СЃСѓР±РѕС‚Рё'.split('_')
        },
        nounCase = (/(\[[Р’РІРЈСѓ]\]) ?dddd/).test(format) ?
            'accusative' :
            ((/\[?(?:РјРёРЅСѓР»РѕС—|РЅР°СЃС‚СѓРїРЅРѕС—)? ?\] ?dddd/).test(format) ?
                'genitive' :
                'nominative');
        return weekdays[nounCase][m.day()];
    }
    function processHoursFunction(str) {
        return function () {
            return str + 'Рѕ' + (this.hours() === 11 ? 'Р±' : '') + '] LT';
        };
    }

    var uk = moment.defineLocale('uk', {
        months : monthsCaseReplace,
        monthsShort : 'СЃС–С‡_Р»СЋС‚_Р±РµСЂ_РєРІС–С‚_С‚СЂР°РІ_С‡РµСЂРІ_Р»РёРї_СЃРµСЂРї_РІРµСЂ_Р¶РѕРІС‚_Р»РёСЃС‚_РіСЂСѓРґ'.split('_'),
        weekdays : weekdaysCaseReplace,
        weekdaysShort : 'РЅРґ_РїРЅ_РІС‚_СЃСЂ_С‡С‚_РїС‚_СЃР±'.split('_'),
        weekdaysMin : 'РЅРґ_РїРЅ_РІС‚_СЃСЂ_С‡С‚_РїС‚_СЃР±'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY СЂ.',
            LLL : 'D MMMM YYYY СЂ., HH:mm',
            LLLL : 'dddd, D MMMM YYYY СЂ., HH:mm'
        },
        calendar : {
            sameDay: processHoursFunction('[РЎСЊРѕРіРѕРґРЅС– '),
            nextDay: processHoursFunction('[Р—Р°РІС‚СЂР° '),
            lastDay: processHoursFunction('[Р’С‡РѕСЂР° '),
            nextWeek: processHoursFunction('[РЈ] dddd ['),
            lastWeek: function () {
                switch (this.day()) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return processHoursFunction('[РњРёРЅСѓР»РѕС—] dddd [').call(this);
                case 1:
                case 2:
                case 4:
                    return processHoursFunction('[РњРёРЅСѓР»РѕРіРѕ] dddd [').call(this);
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'Р·Р° %s',
            past : '%s С‚РѕРјСѓ',
            s : 'РґРµРєС–Р»СЊРєР° СЃРµРєСѓРЅРґ',
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : 'РіРѕРґРёРЅСѓ',
            hh : relativeTimeWithPlural,
            d : 'РґРµРЅСЊ',
            dd : relativeTimeWithPlural,
            M : 'РјС–СЃСЏС†СЊ',
            MM : relativeTimeWithPlural,
            y : 'СЂС–Рє',
            yy : relativeTimeWithPlural
        },
        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
        meridiemParse: /РЅРѕС‡С–|СЂР°РЅРєСѓ|РґРЅСЏ|РІРµС‡РѕСЂР°/,
        isPM: function (input) {
            return /^(РґРЅСЏ|РІРµС‡РѕСЂР°)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'РЅРѕС‡С–';
            } else if (hour < 12) {
                return 'СЂР°РЅРєСѓ';
            } else if (hour < 17) {
                return 'РґРЅСЏ';
            } else {
                return 'РІРµС‡РѕСЂР°';
            }
        },
        ordinalParse: /\d{1,2}-(Р№|РіРѕ)/,
        ordinal: function (number, period) {
            switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
            case 'w':
            case 'W':
                return number + '-Р№';
            case 'D':
                return number + '-РіРѕ';
            default:
                return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });

    return uk;

}));