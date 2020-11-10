import React from 'react';
import ProfileListItem from './ProfileListItem';

function ProfileList() {
    const profile = {
        id: 1,
        name: "name",
        gender: "f",
        dob: '2014-08-18T21:11:54',
        postcode: 2000,
        phoneNumber: "0123456789"
    }

    return (
        <ProfileListItem {...profile} />
    )
}

export default ProfileList;