const News = require('../models/news');

const createNews = async(data) => {
    const {title, description, tourId, matchId} = data;
    if (!title || !description || !tourId || !matchId){
        throw new Error("Missing required parameters: title, description, tourId, matchId");
    }
    const result = await News.createNews({title, description, tourId, matchId});
    return {status: 201, id: result.insertId}
}


const getNewsByMatchId = async(matchId) => {
    if(!matchId){
        throw new Error('Missing required parameters: matchId');
    }
    return await News.getNewsByMatchId(matchId);
}

const getNewsByTourId = async(tourId) => {
    if(!tourId){
        throw new Error('Missing requried parameters: tourId');
    }
    return await News.getNewsByTourId(tourId);
}

const getNewsBySportId = async(sportId) => {
    if(!sportId){
        throw new Error('Missing required parameters: sportId');
    }
    return await News.getNewsBySportsId(sportId);
}

module.exports = {
    createNews,
    getNewsByMatchId,
    getNewsByTourId,
    getNewsBySportId
}
