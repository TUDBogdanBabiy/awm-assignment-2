import { friendService } from "@/api/FriendsService";

const SET_FRIENDS = "SET_FRIENDS";

const state = {
    friends: []
};

const getters = {
    friends: state => state.friends,
};

const actions = {
    async getFriends(context, user) {
        const friends = await friendService.get(user);
        context.commit(SET_FRIENDS, friends);
    },
    async addFriend(context, { user, friend }) {
        await friendService.create(user, { friend });
        return context.dispatch('getFriends', user);
    },
    async removeFriend(context, { user, friend }) {
        await friendService.delete(user, { friend });
        return context.dispatch('getFriends', user);
    },
};

const mutations = {
    [SET_FRIENDS](state, friends) {
        state.friends = friends;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
