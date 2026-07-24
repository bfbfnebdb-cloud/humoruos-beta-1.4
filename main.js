const en = document.querySelector('.en');
const ru = document.querySelector('.ru');

let currentLang = 'ru';

// Хранилище для значений из форм
const userData = {
    name2: { ru: '', en: '' },
    name3: { ru: '', en: '' },
    old2: { ru: '', en: '' },
    look2: { ru: '', en: '' },
    sleepTime2: { ru: '', en: '' },
    item2: { ru: '', en: '' },
    item3: { ru: '', en: '' },
    partOfBody2: { ru: '', en: '' },
    betray2: { ru: '', en: '' },
    betray3: { ru: '', en: '' },
    Profession2: { ru: '', en: '' },
    curse2: { ru: '', en: '' },
    broke2: { ru: '', en: '' },
    fly2: { ru: '', en: '' },
    game2: { ru: '', en: '' },
    call2: { ru: '', en: '' },
    person2: { ru: '', en: '' },
    party2: { ru: '', en: '' },
    party3: { ru: '', en: '' },
    red2: { ru: '', en: '' },
    wanting2: { ru: '', en: '' },
    miss2: { ru: '', en: '' },
    dogFall2: { ru: '', en: '' },
    fell2: { ru: '', en: '' },
    socks2: { ru: '', en: '' },
    zebra2: { ru: '', en: '' },
    duck2: { ru: '', en: '' },
    sofa2: { ru: '', en: '' },
    cups2: { ru: '', en: '' },
    hug2: { ru: '', en: '' },
    trafficJam2: { ru: '', en: '' },
    fridge2: { ru: '', en: '' },
    reread2: { ru: '', en: '' },
    button2: { ru: '', en: '' },
    laugh2: { ru: '', en: '' },
    realise2: { ru: '', en: '' }
};

// Встроенный словарь переводов
const translationDict = {
    
};

// Функция перевода с использованием словаря
function translateWithDict(text, fromLang, toLang) {
    if (!text || text.trim() === '') return text;
    if (fromLang === toLang) return text;
    
    let words = text.split(' ');
    let translatedWords = [];
    
    for (let word of words) {
        let lowerWord = word.toLowerCase();
        let translated = word;
        let isUpperCase = word[0] === word[0].toUpperCase();
        
        if (fromLang === 'en' && toLang === 'ru') {
            for (let [ruWord, enWord] of Object.entries(translationDict)) {
                if (enWord.toLowerCase() === lowerWord) {
                    translated = ruWord;
                    break;
                }
            }
        }
        
        // Сохраняем регистр
        if (isUpperCase && translated) {
            translated = translated[0].toUpperCase() + translated.slice(1);
        }
        
        translatedWords.push(translated);
    }
    
    return translatedWords.join(' ');
}

// Функция перевода с fallback на словарь
async function translateText(text, fromLang, toLang) {
    if (!text || text.trim() === '') return text;
    if (fromLang === toLang) return text;
    
    // Сначала пробуем перевести через словарь
    let dictTranslation = translateWithDict(text, fromLang, toLang);
    
    // Если словарь дал тот же текст (не нашел перевода), пробуем API
    if (dictTranslation === text) {
        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                if (data && data[0]) {
                    let translated = '';
                    for (let i = 0; i < data[0].length; i++) {
                        translated += data[0][i][0];
                    }
                    return translated;
                }
            }
        } catch (error) {
            console.log('API недоступен, используем словарь');
        }
        
        return dictTranslation;
    }
    
    return dictTranslation;
}

// Функция для перевода всех данных пользователя
async function translateAllUserData(fromLang, toLang) {
    if (fromLang === toLang) return;
    
    console.log(`Перевод всех данных с ${fromLang} на ${toLang}`);
    
    for (let key in userData) {
        const word = userData[key][fromLang];
        if (word && word.trim() !== '') {
            const translated = await translateText(word, fromLang, toLang);
            userData[key][toLang] = translated;
            console.log(`${key}: ${word} -> ${translated}`);
        }
    }
}

// Переключение на английский
en.onclick = async function(){
    en.style.display = 'none';
    ru.style.display = 'block';
    
    // Переводим все данные с русского на английский
    await translateAllUserData('ru', 'en');
    
    currentLang = 'en';
    updateAllTexts();
}

// Переключение на русский
ru.onclick = async function(){
    ru.style.display = 'none';
    en.style.display = 'block';
    
    // Переводим все данные с английского на русский
    await translateAllUserData('en', 'ru');
    
    currentLang = 'ru';
    updateAllTexts();
}

function updateAllTexts() {
    // Обновляем обычные тексты с data-lang
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (langConfig[currentLang] && langConfig[currentLang][key]) {
            if (el.tagName === 'INPUT' && el.type === 'button') {
                el.value = langConfig[currentLang][key];
            } else {
                el.innerHTML = langConfig[currentLang][key];
            }
        }
    });
    
    updateSantaText();
    updatePhilosopherText();
}

function updateSantaText() {
    const santaTextEl = document.querySelector('#SantaText p');
    if (!santaTextEl) return;
    
    let template = langConfig[currentLang].santaText;
    template = template.replace(/{name2}/g, userData.name2[currentLang] || '');
    template = template.replace(/{name3}/g, userData.name3[currentLang] || '');
    template = template.replace(/{old2}/g, userData.old2[currentLang] || '');
    template = template.replace(/{look2}/g, userData.look2[currentLang] || '');
    template = template.replace(/{sleepTime2}/g, userData.sleepTime2[currentLang] || '');
    template = template.replace(/{item2}/g, userData.item2[currentLang] || '');
    template = template.replace(/{item3}/g, userData.item3[currentLang] || '');
    template = template.replace(/{partOfBody2}/g, userData.partOfBody2[currentLang] || '');
    template = template.replace(/{betray2}/g, userData.betray2[currentLang] || '');
    template = template.replace(/{betray3}/g, userData.betray3[currentLang] || '');
    template = template.replace(/{Profession2}/g, userData.Profession2[currentLang] || '');
    template = template.replace(/{curse2}/g, userData.curse2[currentLang] || '');
    template = template.replace(/{broke2}/g, userData.broke2[currentLang] || '');
    template = template.replace(/{fly2}/g, userData.fly2[currentLang] || '');
    template = template.replace(/{game2}/g, userData.game2[currentLang] || '');
    template = template.replace(/{call2}/g, userData.call2[currentLang] || '');
    template = template.replace(/{person2}/g, userData.person2[currentLang] || '');
    template = template.replace(/{party2}/g, userData.party2[currentLang] || '');
    template = template.replace(/{party3}/g, userData.party3[currentLang] || '');
    template = template.replace(/{red2}/g, userData.red2[currentLang] || '');
    template = template.replace(/{wanting2}/g, userData.wanting2[currentLang] || '');
    template = template.replace(/{miss2}/g, userData.miss2[currentLang] || '');
    template = template.replace(/{dogFall2}/g, userData.dogFall2[currentLang] || '');
    
    santaTextEl.innerHTML = template;
}

function updatePhilosopherText() {
    const philosopherTextEl = document.querySelector('#philosopherText p');
    if (!philosopherTextEl) return;
    
    let template = langConfig[currentLang].philosopherText;
    template = template.replace(/{fell2}/g, userData.fell2[currentLang] || '');
    template = template.replace(/{socks2}/g, userData.socks2[currentLang] || '');
    template = template.replace(/{zebra2}/g, userData.zebra2[currentLang] || '');
    template = template.replace(/{duck2}/g, userData.duck2[currentLang] || '');
    template = template.replace(/{sofa2}/g, userData.sofa2[currentLang] || '');
    template = template.replace(/{cups2}/g, userData.cups2[currentLang] || '');
    template = template.replace(/{hug2}/g, userData.hug2[currentLang] || '');
    template = template.replace(/{trafficJam2}/g, userData.trafficJam2[currentLang] || '');
    template = template.replace(/{fridge2}/g, userData.fridge2[currentLang] || '');
    template = template.replace(/{reread2}/g, userData.reread2[currentLang] || '');
    template = template.replace(/{button2}/g, userData.button2[currentLang] || '');
    template = template.replace(/{laugh2}/g, userData.laugh2[currentLang] || '');
    template = template.replace(/{realise2}/g, userData.realise2[currentLang] || '');
    
    philosopherTextEl.innerHTML = template;
}

function Santa(){
    document.getElementById('form1').style.display = 'block';
    document.getElementById('h').style.display = 'none';
    document.getElementById('SantaText').style.display = 'none';
    document.getElementById('form2').style.display = 'none';
    document.getElementById('philosopherText').style.display = 'none';
}

async function submit(){
    // Получаем значения
    const name = document.getElementById('name').value;
    const old = document.getElementById('old').value;
    const broke = document.getElementById('broke').value;
    const sleepTime = document.getElementById('sleepTime').value;
    const fly = document.getElementById('fly').value;
    const betray = document.getElementById('betray').value;
    const curse = document.getElementById('curse').value;
    const partOfBody = document.getElementById('partOfBody').value;
    const red = document.getElementById('red').value;
    const Profession = document.getElementById('Profession').value;
    const game = document.getElementById('game').value;
    const dogFall = document.getElementById('dogFall').value;
    const party = document.getElementById('party').value;
    const miss = document.getElementById('miss').value;
    const item = document.getElementById('item').value;
    const wanting = document.getElementById('wanting').value;
    const look = document.getElementById('look').value;
    const call = document.getElementById('call').value;
    const person = document.getElementById('person').value;

    // Определяем язык ввода (проверяем, на каком языке введен текст)
    // Если текст содержит русские буквы - язык ввода русский, иначе английский
    function detectLanguage(text) {
        if (!text || text.trim() === '') return currentLang;
        const hasCyrillic = /[а-яё]/i.test(text);
        return hasCyrillic ? 'ru' : 'en';
    }
    
    // Сохраняем значения в оба языка
    const values = {
        name2: name, name3: name, old2: old, broke2: broke,
        sleepTime2: sleepTime, fly2: fly, betray2: betray, betray3: betray,
        curse2: curse, partOfBody2: partOfBody, red2: red,
        Profession2: Profession, game2: game, dogFall2: name,
        party2: party, party3: party, miss2: miss, item2: item,
        item3: item, wanting2: wanting, look2: look, call2: call,
        person2: person
    };

    // Для каждого поля определяем язык и сохраняем
    for (let key in values) {
        const text = values[key];
        if (text && text.trim() !== '') {
            const detectedLang = detectLanguage(text);
            const otherLang = detectedLang === 'ru' ? 'en' : 'ru';
            
            // Сохраняем на обнаруженном языке
            userData[key][detectedLang] = text;
            
            // Переводим на другой язык
            const translated = await translateText(text, detectedLang, otherLang);
            userData[key][otherLang] = translated;
        }
    }

    // Показываем результат на текущем языке сайта
    document.getElementById('form1').style.display = 'none';
    document.getElementById('SantaText').style.display = 'block';
    updateSantaText();
}

function philosopher(){
    document.getElementById('h').style.display = 'none';
    document.getElementById('SantaText').style.display = 'none';
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'block';
    document.getElementById('philosopherText').style.display = 'none';
}

async function submitsec(){
    const fell = document.getElementById('fell').value;
    const socks = document.getElementById('socks').value;
    const zebra = document.getElementById('zebra').value;
    const duck = document.getElementById('duck').value;
    const sofa = document.getElementById('sofa').value;
    const cups = document.getElementById('cups').value;
    const hug = document.getElementById('hug').value;
    const trafficJam = document.getElementById('trafficJam').value;
    const fridge = document.getElementById('fridge').value;
    const reread = document.getElementById('reread').value;
    const button = document.getElementById('button').value;
    const laugh = document.getElementById('laugh').value;
    const realise = document.getElementById('realise').value;

    // Определяем язык ввода
    function detectLanguage(text) {
        if (!text || text.trim() === '') return currentLang;
        const hasCyrillic = /[а-яё]/i.test(text);
        return hasCyrillic ? 'ru' : 'en';
    }
    
    const values = {
        fell2: fell, socks2: socks, zebra2: zebra, duck2: duck,
        sofa2: sofa, cups2: cups, hug2: hug, trafficJam2: trafficJam,
        fridge2: fridge, reread2: reread, button2: button,
        laugh2: laugh, realise2: realise
    };

    // Для каждого поля определяем язык и сохраняем
    for (let key in values) {
        const text = values[key];
        if (text && text.trim() !== '') {
            const detectedLang = detectLanguage(text);
            const otherLang = detectedLang === 'ru' ? 'en' : 'ru';
            
            // Сохраняем на обнаруженном языке
            userData[key][detectedLang] = text;
            
            // Переводим на другой язык
            const translated = await translateText(text, detectedLang, otherLang);
            userData[key][otherLang] = translated;
        }
    }

    // Показываем результат на текущем языке сайта
    document.getElementById('form2').style.display = 'none';
    document.getElementById('philosopherText').style.display = 'block';
    updatePhilosopherText();
}

const langConfig = {
    ru: {
        nav1:"Письмо деду Морозу",
        nav2:"Я философ",
        let2:"1. Как твое имя?",
        let3:"2. Сколько тебе лет?",
        let4:"3. Что чаще всего ломается ?",
        let5:"4. Во сколько ты ложишся спать?",
        let6:"5. Что обычно любят мухи ?",
        let7:"6. Напиши любую фразу",
        let8:"7. Как бы ты назвал человека, который предал тебя ?",
        let9:"8. Какое ты знаешь ругательство? Ругнись!",
        let10:"9. Любимая часть твоего тела ?",
        let11:"10. Что бывает красным ?",
        let12:"11. Профессия?",
        let13:"12. Любимая детская игра?",
        let14:"13. Что будет собаке, если скинуть её с 9-го этажа ?",
        let15:"14. Каково обычно после большой пьянки?",
        let16:"15. Чего не хватает в твоем доме?",
        let17:"16. Бытовой предмет",
        let18:"17. Чего тебе хочется сейчас ?",
        let19:"18. Место где не станут искать",
        let20:"19. Как зовут твою собаку ? Если нет, то как бы ты её назвал ?",
        let21:"20. Нехороший человек - ...",
        let22:"1. Что произошло, когда я решил стать философом?",
        let23:"2. Сколько носков я нашел в стиральной машине?",
        let24:"3. Ходила ли зебра в школу?",
        let25:"4. Что пыталась сделать утка в пруду?",
        let26:"5. Что было внутри моего мягкого дивана?",
        let27:"6. Сколько чашек кофе я выпил утром?",
        let28:"7. Кого я обнимал после кофе?",
        let29:"8. Сколько минут мне потребовалось, чтобы попасть в пробку?",
        let30:"9. Сколько раз я проверял холодильник?",
        let31:"10. Что мне удалось перечитать в маршрутке?",
        let32:"11. Какую кнопку я нажал, не прикасаясь к ней?",
        let33:"12. Как долго я смеялся над этим?",
        let34:"13. Что я понял в конце концов?",
        textHelper:"Здравствуйте, это сайт humoruos",
        qest:"Тестовые вопросы",
        submitBtn: "Подтвердить",
        santaText: 'Здравствуй Дедушка Мороз ! Меня зовут {name2}. Мне {old2} лет ! Не много не мало, но я верю и надеюсь в то, что ты есть и сейчас читаешь моё письмо. Моя мама очень злая тётя. Она не разрешает писать мне письма тебе, и поэтому я сижу в {look2} и пишу это письмо. Мама выпускает меня гулять только до {sleepTime2}. Когда я её не слушаюсь, она бросает в меня {item2} и частенько попадает мне прямо в {partOfBody2} = Однажды я не вытерпел и сказал ей: "{betray2}". Мой папа работает {Profession2} и приходя с работы с плохим настроением, он кричит: "{curse2}" И заставляет меня чинить его {broke2}. Но я не умею ничего ремонтировать, и поэтому у меня получается {fly2}. Он злится ещё сильнее, и запрещает мне играть в {game2} с друзьями. Ещё папа придумал мне кличку, и зовёт меня не {name3}, а {call2} ! Это очень обидно. В общем, дедушка мороз, если ты не {person2}, то ты поймёшь как мне {party2}. Дорогой Дедушка мороз - красный {red2} забери меня к себе или вышли мне {item3}. Ещё сделай так, что бы близкие мне люди любили меня и почаще давали мне денег на {wanting2}. Любимый дед мороз, ты мой последний шанс. Я надеюсь на новый год я найду под ёлочкой {miss2}. Дед Мороз, пойми как мне {party3}. Если ты не прочтёшь это письмо или оно не дойдёт до тебя, мне {dogFall2}. Помни что я верю в тебя {betray3} !',
        philosopherText: 'Я вчера решил стать философом. Начал с того, что уронил {fell2} — и понял, что Вселенная просто издевается. Потом заглянул в стиральную машину и нашёл там {socks2} носка, хотя закидывал четыре. В холодильнике темно, только если не открывать дверцу — проверял {fridge2} раза. Увидел в зоопарке зебру и подумал: учиться ей явно {zebra2}. Утка на пруду пыталась {duck2}, хотя никто её не просил — может, у неё кризис среднего возраста. Диван я купил мягкий, но внутри оказались {sofa2}, похожие на камни. Выпил утром {cups2} чашки кофе — и наконец-то обнял {hug2}. В маршрутке ехал так медленно, что успел перечитать {reread2}, а в пробке, когда никуда не спешил, — приехал за {trafficJam2} минут. Включил музыку, а там уже играла моя же песня — нажал {button2}, хотя пальцем не касался. Смеялся над этим {laugh2}. Значит, {realise2}.'
    },
    en: {
        nav1: "Letter to Santa Claus",
        nav2: "I am a philosopher",
        let2: "1. What is your name?",
        let3: "2. How old are you?",
        let4: "3. What time do you go to sleep?",
        let5: "4. What breaks most often?",
        let6: "5. What do flies usually like?",
        let7: "6. Write any phrase",
        let8: "7. What would you call a person who betrayed you?",
        let9: "8. What curse word do you know? Swear!",
        let10: "9. Your favorite part of your body?",
        let11: "10. What is red?",
        let12: "11. Profession?",
        let13: "12. Favorite children's game?",
        let14: "13. What will happen to a dog if you throw it off the 9th floor?",
        let15: "14. How do you feel after a big party?",
        let16: "15. What is missing in your house?",
        let17: "16. Household item",
        let18: "17. What do you want right now?",
        let19: "18. A place where they won't look",
        let20: "19. What is your dog's name? If not, what would you name it?",
        let21: "20. A bad person - ...",
        let22: "1. What happened when I decided to become a philosopher?",
        let23: "2. How many socks did I find in the washing machine?",
        let24: "3. Did the zebra go to school?",
        let25: "4. What was the duck trying to do in the pond?",
        let26: "5. What was inside my soft sofa?",
        let27: "6. How many cups of coffee did I drink in the morning?",
        let28: "7. Who did I hug after coffee?",
        let29: "8. How many minutes did it take me to get into a traffic jam?",
        let30: "9. How many times did I check the refrigerator?",
        let31: "10. What did I manage to re-read on the minibus?",
        let32: "11. What button did I press without touching it?",
        let33: "12. How long did I laugh about it?",
        let34: "13. What did I realize in the end?",
        textHelper: "Hello, this is a humorous website",
        qest: "Test questions",
        submitBtn: "Confirm",
        santaText: 'Hello Santa Claus! My name is {name2}. I am {old2} years old! Not too many, not too few, but I believe and hope that you exist and are reading my letter right now. My mother is a very mean aunt. She does not allow me to write letters to you, so I am sitting in {look2} and writing this letter. Mom lets me go for a walk only until {sleepTime2}. When I disobey her, she throws {item2} at me and often hits me right in the {partOfBody2}. Once I could not stand it and told her: "{betray2}". My dad works as a {Profession2} and when he comes home from work in a bad mood, he yells: "{curse2}" And makes me fix his {broke2}. But I do not know how to fix anything, so I end up with {fly2}. He gets even angrier and forbids me to play {game2} with my friends. Dad also gave me a nickname and calls me not {name3}, but {call2}! It is very offensive. In short, Santa Claus, if you are not {person2}, then you will understand how {party2} I feel. Dear Santa Claus - red {red2} take me to you or send me {item3}. Also make sure that my loved ones love me and give me money more often for {wanting2}. Dear Santa, you are my last chance. I hope that on New Year\'s I will find {miss2} under the Christmas tree. Santa, understand how {party3} I feel. If you do not read this letter or it does not reach you, I will {dogFall2}. Remember that I believe in you {betray3}!',
        philosopherText: 'Yesterday I decided to become a philosopher. I started by dropping {fell2} — and realized that the Universe is just messing with me. Then I looked into the washing machine and found {socks2} sock, even though I put in four. It is dark in the refrigerator, only if you do not open the door — I checked {fridge2} times. I saw a zebra at the zoo and thought: she clearly needs to study {zebra2}. A duck in the pond was trying to {duck2}, even though nobody asked her — maybe she is having a midlife crisis. I bought a soft sofa, but inside there were {sofa2}, like stones. I drank {cups2} cups of coffee in the morning — and finally hugged {hug2}. I was riding the minibus so slowly that I managed to re-read {reread2}, and in a traffic jam, when I was in no hurry, I arrived in {trafficJam2} minutes. I turned on the music, and my own song was already playing — I pressed {button2}, even though I did not touch it. I laughed about it {laugh2}. So, {realise2}.'
    }
};

document.addEventListener("DOMContentLoaded", () =>{
    currentLang = 'ru';
    updateAllTexts();
});