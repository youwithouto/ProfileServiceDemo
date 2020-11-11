import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { format, parse } from 'date-fns';
import React from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../actionCreators/profileActionCreators';
import { Profile, UpdateProfileRequest } from '../store/types/profile';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

enum ProfileListItemFieldName {
    NameField = 1,
    GenderField,
    PostcodeField,
    PhoneNumberField,
}

interface PropsType {
    profile: Profile;
    updateProfile: (profile: UpdateProfileRequest) => void;
}

function ProfileListItem(props: PropsType) {
    const classes = useStyles();
    const { profile, updateProfile } = props;
    const { id, name, gender, dob, postcode, phoneNumber } = profile;

    const [updatedName, setNameValue] = React.useState(name);
    const [updatedGender, setGenderValue] = React.useState(gender);
    const [updatedDob, setUpdatedDob] = React.useState(new Date(dob));
    const [updatedPostcode, setPostcodeValue] = React.useState(postcode);
    const [updatedPhoneNumber, setPhoneNumberValue] = React.useState(phoneNumber);

    const handleFieldChange = (fieldName: ProfileListItemFieldName) => (event) => {
        const value = event.target.value;

        switch (fieldName) {
            case ProfileListItemFieldName.NameField:
                setNameValue(value);
                break;
            case ProfileListItemFieldName.PostcodeField:
                setPostcodeValue(value);
                break;
            case ProfileListItemFieldName.PhoneNumberField:
                setPhoneNumberValue(value);
                break;
            case ProfileListItemFieldName.GenderField:
                setGenderValue(value);
                break;
            default:
            // pass
        }
    };

    const handleDateChange = (event) => {
        const dateString = event.target.value;
        const date = parse(dateString, 'yyyy-MM-dd', new Date());
        setUpdatedDob(new Date(date));
    };

    const handleUpdateClick = () => {
        updateProfile({
            id: id,
            name: updatedName,
            gender: updatedGender,
            dob: updatedDob,
            postcode: updatedPostcode,
            phoneNumber: updatedPhoneNumber
        });
    };

    return (
        <div className={classes.root}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>{'#' + id}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="demo-profile-name-input-label"
                            label="Name"
                            value={updatedName}
                            onChange={handleFieldChange(ProfileListItemFieldName.NameField)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-profile-gender-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-profile-gender-select-label"
                            id="demo-profile-gender-select"
                            value={updatedGender}
                            onChange={handleFieldChange(ProfileListItemFieldName.GenderField)}
                        >
                            <MenuItem value={'f'}>Female</MenuItem>
                            <MenuItem value={'m'}>Male</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="demo-profile-dob-select-label"
                            label="Date of Birth"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={format(new Date(updatedDob), 'yyyy-MM-dd')}
                            onChange={handleDateChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="demo-profile-postcode-input-label"
                            label="Postcode"
                            value={updatedPostcode}
                            onChange={handleFieldChange(ProfileListItemFieldName.PostcodeField)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="demo-profile-phonenumber-code-label"
                            label="Phone Number"
                            value={updatedPhoneNumber}
                            onChange={handleFieldChange(ProfileListItemFieldName.PhoneNumberField)}
                        />
                    </FormControl>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary" onClick={handleUpdateClick}>
                        Update
                    </Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = {
    updateProfile
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileListItem);