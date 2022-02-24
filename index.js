const TelegramApi = require('node-telegram-bot-api')
const axios = require('axios')
const fs = require('fs')

const bot = new TelegramApi('5183211549:AAGHyIfvShNgRrRU6lyZPg718N5UJmWuyLA', {
    polling: true
})

const schoolOptions = {
    reply_markup: {
        inline_keyboard: [
            [{
                text: 'СОШ №12',
                callback_data: '12'
            }],
            [{
                text: 'СОШ №13',
                callback_data: '13'
            }],
            [{
                text: 'СОШ №14',
                callback_data: '14'
            }],
            [{
                text: 'СОШ №15',
                callback_data: '15'
            }],
        ]
    }
}

const kindergartenOptions = {
    reply_markup: {
        inline_keyboard: [
            [{
                text: 'ДС №1',
                callback_data: '1'
            }],
            [{
                text: 'ДС №2',
                callback_data: '2'
            }],
            [{
                text: 'ДС №3',
                callback_data: '3'
            }],
            [{
                text: 'ДС №4',
                callback_data: '4'
            }],
        ]
    }
}

const placeOptions = {
    reply_markup: {
        keyboard: [
            ['Детские сады', 'Школы']
        ],
        // one_time_keyboard: true
    }
}

const start = () => {
    bot.on('message', async (msg) => {

        if (msg.photo) {
            const fileId = msg.photo[msg.photo.length - 1].file_id
            let url = `https://api.telegram.org/bot5183211549:AAGHyIfvShNgRrRU6lyZPg718N5UJmWuyLA/getFile?file_id=${fileId}`;
            axios(url)
                .then(res => {
                    let urlPhoto = `https://api.telegram.org/file/bot5183211549:AAGHyIfvShNgRrRU6lyZPg718N5UJmWuyLA/${res.data.result.file_path}`
                    bot.sendMessage(msg.chat.id, `Ссылка на скачивание: ${urlPhoto}`)
                })
        }

        if (msg.text === '/start') {
            return bot.sendMessage(msg.chat.id, `Привет ${msg.from.first_name}, выберите учреждение!`, placeOptions)
        }

        if (msg.text === 'Детские сады') {
            return bot.sendMessage(msg.chat.id, `Выберите детский сад!`, kindergartenOptions)
        }

        if (msg.text === 'Школы') {
            return bot.sendMessage(msg.chat.id, `Выберите детский сад!`, schoolOptions)
        }

    })
}

bot.on('callback_query', msg => {
    switch (msg.data) {
        case '1':
            bot.sendMessage(msg.message.chat.id, `Загрузите фото!`)
            break;
        case '2':
            bot.sendPhoto(msg.message.chat.id, `https://biznesplan-primer.ru/files/gallery/l/200.jpg`)
            break;
        case '3':
            bot.sendPhoto(msg.message.chat.id, `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_Jo6Z6JyhvkCC7_4FwS9UEMJHMiCSYzJTA&usqp=CAU`)
            break;
        case '4':
            bot.sendPhoto(msg.message.chat.id, `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYgadRPGQw-5AOIV--gaaQDEm1xvpxwpWTZg&usqp=CAU`)
            break;
        case '12':
            bot.sendPhoto(msg.message.chat.id, `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/ADO_5721.jpg/300px-ADO_5721.jpg`)
            break;
        case '13':
            bot.sendPhoto(msg.message.chat.id, `https://biznesplan-primer.ru/files/gallery/l/200.jpg`)
            break;
        case '14':
            bot.sendPhoto(msg.message.chat.id, `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj_Jo6Z6JyhvkCC7_4FwS9UEMJHMiCSYzJTA&usqp=CAU`)
            break;
        case '15':
            bot.sendPhoto(msg.message.chat.id, `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYgadRPGQw-5AOIV--gaaQDEm1xvpxwpWTZg&usqp=CAU`)
            break;
        default:
            break;
    }
})


start()