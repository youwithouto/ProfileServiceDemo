import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { format, parse } from 'date-fns';
import React from 'react';
import { connect } from 'react-redux';
import { createProfile } from '../actionCreators/profileActionCreators';
import { CreateProfileRequest } from '../store/types/profile';

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

enum ProfileCreateItemFieldName {
    NameField = 1,
    GenderField,
    PostcodeField,
    PhoneNumberField,
}

interface PropsType {
    createProfile: (profile: CreateProfileRequest) => void;
    setMessageStatus: React.Dispatch<React.SetStateAction<{
        severity: string;
        message: string;
        open: boolean;
    }>>;
}

function ProfileCreateItem(props: PropsType) {
    const classes = useStyles();
    const { createProfile, setMessageStatus } = props;

    const [updatedName, setNameValue] = React.useState('');
    const [updatedGender, setGenderValue] = React.useState('');
    const [updatedDob, setUpdatedDob] = React.useState(new Date());
    const [updatedPostcode, setPostcodeValue] = React.useState(0);
    const [updatedPhoneNumber, setPhoneNumberValue] = React.useState('');

    const handleFieldChange = (fieldName: ProfileCreateItemFieldName) => (event) => {
        const value = event.target.value;

        switch (fieldName) {
            case ProfileCreateItemFieldName.NameField:
                setNameValue(value);
                break;
            case ProfileCreateItemFieldName.PostcodeField:
                setPostcodeValue(+value);
                break;
            case ProfileCreateItemFieldName.PhoneNumberField:
                setPhoneNumberValue(value);
                break;
            case ProfileCreateItemFieldName.GenderField:
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

    const handleCreateClick = () => {
        if (!updatedName || updatedName.length < 5) {
            setMessageStatus({ severity: "error", message: "Name should have at least 5 characters", open: true });
        } else if (!['f', 'm'].includes(updatedGender)) {
            setMessageStatus({ severity: "error", message: "Gender is a required field", open: true });
        } if (!updatedDob) {
            setMessageStatus({ severity: "error", message: "Date of Birth is a required field", open: true });
        } if (!updatedPostcode || updatedPostcode < 1000 || updatedPostcode > 9999) {
            setMessageStatus({ severity: "error", message: "Postcode should have 4 digits", open: true });
        } if (!updatedPhoneNumber || updatedPhoneNumber.length < 10 || updatedPhoneNumber.length > 15) {
            setMessageStatus({ severity: "error", message: "Phone Number should be 10 to 15 characters long", open: true });
        } else {
            createProfile({
                name: updatedName,
                gender: updatedGender,
                dob: updatedDob,
                postcode: +updatedPostcode,
                phoneNumber: updatedPhoneNumber
            });
        }
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
                        <Typography className={classes.heading}>{'#0'}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="demo-profile-name-input-label"
                            label="Name"
                            value={updatedName}
                            onChange={handleFieldChange(ProfileCreateItemFieldName.NameField)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-profile-gender-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-profile-gender-select-label"
                            id="demo-profile-gender-select-label"
                            value={updatedGender}
                            onChange={handleFieldChange(ProfileCreateItemFieldName.GenderField)}
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
                            onChange={handleFieldChange(ProfileCreateItemFieldName.PostcodeField)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="demo-profile-phonenumber-code-label"
                            label="Phone Number"
                            value={updatedPhoneNumber}
                            onChange={handleFieldChange(ProfileCreateItemFieldName.PhoneNumberField)}
                        />
                    </FormControl>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary" onClick={handleCreateClick}>
                        Create
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
    createProfile
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileCreateItem);