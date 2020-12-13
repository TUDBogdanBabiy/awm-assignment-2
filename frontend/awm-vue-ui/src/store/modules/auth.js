import { loginService, registerService, logoutService, verifyTokenService } from "@/api/AuthService";

const SET_USER = "SET_USER";

const state = {
    user: null
};

const getters = {
    user: state => state.user,
};

const actions = {
    async signIn(context, user) {
        const response = await loginService.create(user);
        context.commit(SET_USER, response.user);
        localStorage.token = response.token;
    },
    async signOut(context) {
        await logoutService.create();
        context.commit(SET_USER, '');
        localStorage.removeItem('token');
    },
    async signUp(context, user) {
        const response = await registerService.create(user);
        context.commit(SET_USER, response.user);
        localStorage.token = response.token;
    },
    async verifyToken(context, token) {
        const { user } = await verifyTokenService.post(token);
        context.commit(SET_USER, user);
        return user;
    }
};

const mutations = {
    [SET_USER](state, user) {
        state.user = user;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
