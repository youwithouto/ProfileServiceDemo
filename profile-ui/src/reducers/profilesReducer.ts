import initialState from '../initialState';
import { CreateProfileActionType, GetProfilesActionType, ProfileActionTypes, ProfileState, UpdateProfileActionType } from '../store/types/profile';

export default function profilesReducer(profiles: ProfileState = initialState.profiles, action: ProfileActionTypes) {
    switch (action.type) {
        case GetProfilesActionType.GET_ALL_PROFILES_IN_PROGRESS:
            return profiles;
        case GetProfilesActionType.GET_ALL_PROFILES_SUCCEEDED:
            return [...action.payload];
        case GetProfilesActionType.GET_ALL_PROFILES_FAILED:
        case GetProfilesActionType.GET_ALL_PROFILES_COMPLETED:
            return profiles;

        case CreateProfileActionType.CREATE_PROFILE_IN_PROGRESS:
            return profiles;
        case CreateProfileActionType.CREATE_PROFILE_SUCCEEDED:
            return [...profiles, action.payload];
        case CreateProfileActionType.CREATE_PROFILE_FAILED:
        case CreateProfileActionType.CREATE_PROFILE_COMPLETED:
            return profiles;

        case UpdateProfileActionType.UPDATE_PROFILE_IN_PROGRESS:
            return profiles;
        case UpdateProfileActionType.UPDATE_PROFILE_SUCCEEDED:
            const updatedProfileId = action.payload!.id;
            const updatedProfiles = profiles.map(profile => {
                if (profile.id === updatedProfileId) {
                    return action.payload;
                }
                return profile;
            });
            return updatedProfiles;
        case UpdateProfileActionType.UPDATE_PROFILE_FAILED:
        case UpdateProfileActionType.UPDATE_PROFILE_COMPLETED:
            return profiles;

        default:
            return profiles;
    }
}