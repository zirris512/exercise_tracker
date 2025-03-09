import { uid } from 'uid';

export default class Movie {
    /**
     * 
     * @param {string} title
     * @param {Number} year
     * @param {String} language
     */
    constructor(title, year, language) {
        this.title = title;
        this.year = year;
        this.language = language;
        this._id = uid(24);
    }
}