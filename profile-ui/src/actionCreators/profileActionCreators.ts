import { CreateProfileActionType, CreateProfileRequest, GetProfilesActionType, UpdateProfileActionType, UpdateProfileRequest } from '../store/types/profile';
const axios = require('axios').default;

const BASE_URL = 'http://localhost:8080';

export function getProfiles() {
    return (dispatch, getState) => {
        dispatch({ type: GetProfilesActionType.GET_ALL_PROFILES, payload: [] });
        dispatch({ type: GetProfilesActionType.GET_ALL_PROFILES_IN_PROGRESS, payload: [] });

        axios.get(`${BASE_URL}/profiles`)
            .then(response => {
                console.info(response);
                dispatch({ type: GetProfilesActionType.GET_ALL_PROFILES_SUCCEEDED, payload: response.data });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: GetProfilesActionType.GET_ALL_PROFILES_FAILED, payload: [], error: error });
            })
            .finally(() => {
                dispatch({ type: GetProfilesActionType.GET_ALL_PROFILES_COMPLETED, payload: [] });
            });
    };
}

export function createProfile(profile: CreateProfileRequest) {
    return (dispatch, getState) => {
        dispatch({ type: CreateProfileActionType.CREATE_PROFILE, payload: profile });
        dispatch({ type: CreateProfileActionType.CREATE_PROFILE_IN_PROGRESS, payload: profile });

        axios({
            method: 'post',
            url: `${BASE_URL}/profiles`,
            data: profile
        })
            .then(response => {
                console.info(response);
                dispatch({ type: CreateProfileActionType.CREATE_PROFILE_SUCCEEDED, payload: response.data });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: CreateProfileActionType.CREATE_PROFILE_FAILED, payload: null, error: error });
            })
            .finally(() => {
                dispatch({ type: CreateProfileActionType.CREATE_PROFILE_COMPLETED, payload: null });
            });

    };
}

export function updateProfile(profile: UpdateProfileRequest) {
    return (dispatch, getState) => {
        dispatch({ type: UpdateProfileActionType.UPDATE_PROFILE, payload: profile });
        dispatch({ type: UpdateProfileActionType.UPDATE_PROFILE_IN_PROGRESS, payload: profile });

        axios({
            method: 'put',
            url: `${BASE_URL}/profiles`,
            data: profile
        })
            .then(response => {
                console.info(response);
                dispatch({ type: UpdateProfileActionType.UPDATE_PROFILE_SUCCEEDED, payload: response.data });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: UpdateProfileActionType.UPDATE_PROFILE_FAILED, payload: null, error: error });
            })
            .finally(() => {
                dispatch({ type: UpdateProfileActionType.UPDATE_PROFILE_COMPLETED, payload: null });
            });
    };
}