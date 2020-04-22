function clone (src) {
    return JSON.parse(JSON.stringify(src));
}


export const titles = (state = [], action) => {
    switch (action.type) {
        case "ADD_TITLE":
            state.push(action.payload);
            return clone(state);           // returns a new array reference with same elements - if reference doesnt change, components dont update
        default:
            return state;
    }
}

export const songDurations = (state = [], action) => {
    switch (action.type) {
        case "ADD_SONGDUR":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const song_urls = (state = [], action) => {
    switch (action.type) {
        case "ADD_SONGURL":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const sizes = (state = [], action) => {
    switch (action.type) {
        case "ADD_SIZE":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const albums = (state = [], action) => {
    switch (action.type) {
        case "ADD_ALBUM":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const arts = (state = [], action) => {
    switch (action.type) {
        case "ADD_ART":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const artists = (state = [], action) => {
    switch (action.type) {
        case "ADD_ARTIST":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const loggedID = (state = -1, action) => {
    switch (action.type) {
        case "LOG_IN":
            return action.payload;
        case "LOG_OUT":
            return -1;
        default:
            return state;
    }
}