export const addSongid = (n) => {
    return {
        type: 'ADD_SONGID',
        payload: n
    }
}

export const addTitle = (newtitle) => {
    return {
        type: 'ADD_TITLE',
        payload: newtitle
    }
}

export const addSongDur = (n) => {
    return {
        type: 'ADD_SONGDUR',
        payload: n
    }
}

export const addSong_url = (n) => {
    return {
        type: 'ADD_SONGURL',
        payload: n
    }
}

export const addSize = (n) => {
    return {
        type: 'ADD_SIZE',
        payload: n
    }
}

export const addAlbum = (n) => {
    return {
        type: 'ADD_ALBUM',
        payload: n
    }
}

export const addArt = (n) => {
    return {
        type: 'ADD_ART',
        payload: n
    }
}

export const addArtist = (n) => {
    return {
        type: 'ADD_ARTIST',
        payload: n
    }
}

export const logIn = (n) => {
    return {
        type: "LOG_IN",
        payload: n
    }
}

export const logOut = () => {
    return {
        type: "LOG_IN"
    }
}