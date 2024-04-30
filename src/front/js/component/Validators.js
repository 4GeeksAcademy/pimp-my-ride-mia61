import React, { useState } from "react";




export const ValidateEmail = (email, setInvalidItems) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true;
    } else {
        setInvalidItems(prevInvalidItems => [...prevInvalidItems, "email"]);
        return false;
    }
};

export const ValidatePhone = (phone, setInvalidItems) => {
    if (phone.trim() === "" || phone.length <= 9 || phone.length > 15) {
        setInvalidItems(prevInvalidItems => [...prevInvalidItems, "phone"]);
        return false;
    }
    return true;
};

export const ValidateFirstName = (first_name, setInvalidItems) => {
    if (first_name.trim() === "" || first_name.length <= 2 || first_name.length > 25) {
        setInvalidItems(prevInvalidItems => [...prevInvalidItems, "first_name"]);
        return false;
    }
    return true;
};

export const ValidateLastName = (last_name, setInvalidItems) => {
    if (last_name.trim() === "" || last_name.length <= 2 || last_name.length > 25) {
        setInvalidItems(prevInvalidItems => [...prevInvalidItems, "last_name"]);
        return false;
    }
    return true;
};

export const ValidatePassword = (password, setInvalidItems) => {
    if (password.trim() === "" || password.length <= 5 || password.length > 20) {
        setInvalidItems(prevInvalidItems => [...prevInvalidItems, "password"]);
        return false;
    }
    return true;
};

export const ValidateAddress = (address, setInvalidItems) => {
    if (address.trim() === "" || address.length <= 6 || address.length > 20) {
        setInvalidItems(prevInvalidItems => [...prevInvalidItems, "address"]);
        return false;
    }
    return true;
};


  
  
 