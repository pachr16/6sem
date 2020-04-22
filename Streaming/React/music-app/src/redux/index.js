import { titles, songDurations, song_urls, sizes, albums, arts, artists, loggedID } from './reducers'
import { combineReducers } from 'redux';

export const combinedReducers = combineReducers({
    titles: titles,
    songDurations: songDurations,
    song_urls: song_urls,
    sizes: sizes,
    albums: albums,
    arts: arts,
    artists: artists,
    loggedID: loggedID
});