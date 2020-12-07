import { userService } from "@/api/AuthService";

const SET_USERS = "SET_USERS";
const SET_USER = "SET_USER";

const state = {
    users: [],
    user: {}
};

const getters = {
    users: state => state.users,
    user: state => state.user
};

const actions = {
    async fetchUsers(context) {
        context.commit(SET_USERS, await userService.list());
    },
    async fetchUser(context, id) {
        context.commit(SET_USER, await userService.get(id));
    },
    async updateUser(context, user) {
        await userService.update(user);
        return context.dispatch("fetchUser", user.username);
    },
    async addUser(context, user) {
        await userService.create(user);
        return context.dispatch("fetchUsers");
    }
};

const mutations = {
    [SET_USERS](state, users) {
        state.users = users;
    },
    [SET_USER](state, user) {
        state.user = user;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
