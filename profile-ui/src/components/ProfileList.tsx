import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../actionCreators/profileActionCreators';
import { Profile } from '../store/types/profile';
import ProfileCreateItem from './ProfileCreateItem';
import ProfileListItem from './ProfileListItem';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


interface PropsType {
    profiles: Profile[];
    getProfiles: () => void;
}

function ProfileList(props: PropsType) {
    const { getProfiles } = props;
    const profiles = props.profiles;

    const [updatedMessageStatus, setMessageStatus] = React.useState({ severity: '', message: '', open: false });
    const handleSnackbarClose = () => {
        setMessageStatus({ severity: '', message: '', open: false });
    };

    useEffect(() => {
        getProfiles();
    }, []);

    return (
        <Fragment>
            <ProfileCreateItem setMessageStatus={setMessageStatus} />
            {profiles.map(profile => <ProfileListItem key={profile.id} profile={profile} />)}

            <Snackbar open={updatedMessageStatus.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={updatedMessageStatus.severity || "info"}>
                    {updatedMessageStatus.message}
                </Alert>
            </Snackbar>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        profiles: state.profiles
    };
};

const mapDispatchToProps = {
    getProfiles
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileList);