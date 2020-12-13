import { locationHistoryService } from "@/api/LocationHistoryService";

const SET_PREVIOUS_LOCATIONS = "SET_PREVIOUS_LOCATIONS";

const state = {
    locations: []
};

const getters = {
    locations: state => state.locations,
};

const actions = {
    async getLocations(context, user) {
        const locations = await locationHistoryService.get(user);
        context.commit(SET_PREVIOUS_LOCATIONS, locations);
    },
    async addLocation(context, { user, location }) {
        await locationHistoryService.post(user, { location });
        return context.dispatch('getLocations', user);
    },
    async removeLocation(context, { user, location }) {
        await locationHistoryService.delete(user, { location });
        return context.dispatch('getLocations', user);
    },
};

const mutations = {
    [SET_PREVIOUS_LOCATIONS](state, locations) {
        state.locations = locations;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
