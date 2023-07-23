import plumber from  "gulp-plumber"; //Обработка ошибок
import notify from "gulp-notify"; //Сообщения (подсказки)
import browsersync from "browser-sync"; //Локальный сервер
import newer from "gulp-newer"; //Проверка обновления картинки на странице

export const plugins = {
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
}