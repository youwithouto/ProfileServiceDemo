import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { format, parse } from 'date-fns';
import React from 'react';

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

interface ProfileItem {
    id: number;
    name: string;
    gender: string;
    dob: string;
    postcode: number;
    phoneNumber: string;
}

enum ProfileListItemFieldName {
    NameField = 1,
    GenderField,
    PostcodeField,
    PhoneNumberField,
}

function ProfileListItem(props: ProfileItem) {
    const classes = useStyles();
    const { id, name, gender, dob, postcode, phoneNumber } = props;

    const [updatedName, setNameValue] = React.useState(name);
    const [updatedGender, setGenderValue] = React.useState(gender);
    const [updatedDob, setUpdatedDob] = React.useState(new Date(dob));
    const [updatedPostcode, setPostcodeValue] = React.useState(postcode)
    const [updatedPhoneNumber, setPhoneNumberValue] = React.useState(phoneNumber)

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
    }

    const handleDateChange = (event) => {
        const dateString = event.target.value;
        const date = parse(dateString, 'yyyy-MM-dd', new Date());
        console.info(date);
        setUpdatedDob(new Date(date));
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
                    <TextField
                        id="standard-basic"
                        label="Name"
                        value={updatedName}
                        onChange={handleFieldChange(ProfileListItemFieldName.NameField)}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={updatedGender}
                            onChange={handleFieldChange(ProfileListItemFieldName.GenderField)}
                        >
                            <MenuItem value={'f'}>Female</MenuItem>
                            <MenuItem value={'m'}>Male</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="date"
                        label="Date of Birth"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={format(new Date(updatedDob), 'yyyy-MM-dd')}
                        onChange={handleDateChange}
                    />
                    <TextField
                        id="standard-basic"
                        label="Postcode"
                        value={updatedPostcode}
                        onChange={handleFieldChange(ProfileListItemFieldName.PostcodeField)}
                    />
                    <TextField
                        id="standard-basic"
                        label="Phone Number"
                        value={updatedPhoneNumber}
                        onChange={handleFieldChange(ProfileListItemFieldName.PhoneNumberField)}
                    />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Update
                    </Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}

export default ProfileListItem;