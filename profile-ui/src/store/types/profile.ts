export enum GetProfilesActionType {
    GET_ALL_PROFILES = 'GET_ALL_PROFILES',
    GET_ALL_PROFILES_IN_PROGRESS = 'GET_ALL_PROFILES_IN_PROGRESS',
    GET_ALL_PROFILES_SUCCEEDED = 'GET_ALL_PROFILES_SUCCEEDED',
    GET_ALL_PROFILES_FAILED = 'GET_ALL_PROFILES_FAILED',
    GET_ALL_PROFILES_COMPLETED = 'GET_ALL_PROFILES_COMPLETED'
}

export enum CreateProfileActionType {
    CREATE_PROFILE = 'CREATE_PROFILE',
    CREATE_PROFILE_IN_PROGRESS = 'CREATE_PROFILE_IN_PROGRESS',
    CREATE_PROFILE_SUCCEEDED = 'CREATE_PROFILE_SUCCEEDED',
    CREATE_PROFILE_FAILED = 'CREATE_PROFILE_FAILED',
    CREATE_PROFILE_COMPLETED = 'CREATE_PROFILE_COMPLETED',
}

export enum UpdateProfileActionType {
    UPDATE_PROFILE = 'UPDATE_PROFILE',
    UPDATE_PROFILE_IN_PROGRESS = 'UPDATE_PROFILE_IN_PROGRESS',
    UPDATE_PROFILE_SUCCEEDED = 'UPDATE_PROFILE_SUCCEEDED',
    UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED',
    UPDATE_PROFILE_COMPLETED = 'UPDATE_PROFILE_COMPLETED',
}

export interface Profile extends UpdateProfileRequest { }

export interface CreateProfileRequest {
    name: string;
    gender: string;
    dob: Date;
    postcode: number;
    phoneNumber: string;
}

export interface UpdateProfileRequest extends CreateProfileRequest {
    id: number;
}

export type ProfileState = Profile[];

export interface GetProfilesAction {
    type: GetProfilesActionType;
    payload: Profile[];
    error?: Error;
}

export interface CreateProfileAction {
    type: CreateProfileActionType;
    payload: Profile | null;
    error?: Error;
}

export interface UpdateProfileAction {
    type: UpdateProfileActionType;
    payload: Profile | null;
    error?: Error;
}

export type ProfileActionTypes = GetProfilesAction | CreateProfileAction | UpdateProfileAction;