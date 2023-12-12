const mysql = require('../lib/mysql');

const createNews = async ({ title, description, tourId, matchId }) => {
    const statement = 'insert into mydb.news (title, description, tourId, matchId) values (?, ?, ?, ?)'
    const result = await mysql.query(statement, [title, description, tourId, matchId]);
    return result;
}

const getNewsByMatchId = async (matchId) => {
    const statement = 'select * from mydb.news where matchId = ?';
    const result = await mysql.query(statement, [matchId]);
    return result;
}

const getNewsByTourId = async (tourId) => {
    const statement = 'select * from mydb.news where tourId = ?';
    const result = await mysql.query(statement, [tourId]);
    return result;
}

const getNewsBySportsId = async (sportId) => {
    const get_tours_statement = 'select tours.id from mydb.tours where tours.sportId = ?'
    let tour_ids = await mysql.query(get_tours_statement, [sportId]);
    if(!tour_ids || tour_ids.length == 0){
        return []
    }
    console.log(tour_ids);
    console.log(typeof tour_ids);
    tour_ids = tour_ids.map((item) => item.id);
    const statement = 'select * from mydb.news where tourId in (?)';
    const result = await mysql.query(statement, [tour_ids]);
    return result;
}

module.exports = {
    createNews,
    getNewsByMatchId,
    getNewsByTourId,
    getNewsBySportsId
}
