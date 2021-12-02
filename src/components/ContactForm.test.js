import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import { HotModuleReplacementPlugin } from 'webpack';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);

    const contactFormHeader = screen.getByText(/contact form/i);
    
    expect(contactFormHeader).toBeInTheDocument();
    expect(contactFormHeader).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
   
    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Lore');
    const shortFirstNameErrors = await screen.findAllByText(/error/i);

    expect(shortFirstNameErrors.length).toBe(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const emptyFieldsErrors = await screen.findAllByText(/error/i);
 
    expect(emptyFieldsErrors.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Lorem');
    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Ipsum');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const allErrors = await screen.findAllByText(/error/i);
    
    expect(allErrors.length).toBe(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    
    const emailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailField, 'LoremIpsum@dolor');
    const validEmailError = screen.getByText(/email must be a valid email address/);

    expect(validEmailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const lastNameRequiredError = screen.getByText(/lastName is a required field/);
    
    expect(lastNameRequiredError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Lorem');
    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Ipsum');
    const emailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailField, 'lorem@ipsum.dolor');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const firstNameElement = screen.getByText('Lorem');
    const lastNameElement = screen.getByText('Ipsum');
    const emailElement = screen.getByText('lorem@ipsum.dolor');
    const messageElements = screen.getAllByText(/message/i);

    expect(firstNameElement).toBeInTheDocument();
    expect(lastNameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(messageElements.length).toBe(1);
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByPlaceholderText('Edd');
    userEvent.type(firstName, 'Lorem');
    const lastName = screen.getByPlaceholderText('Burke');
    userEvent.type(lastName, 'Ipsum');
    const emailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(emailField, 'lorremm@ippssum.dolllor');
    const messageField = screen.getByLabelText('Message');
    userEvent.type(messageField, 'Lllooorem ippppusm dollllor seppppt');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const firstNameElement = screen.getByText('Lorem');
    const lastNameElement = screen.getByText('Ipsum');
    const emailElement = screen.getByText('lorremm@ippssum.dolllor');
    const messageElement = screen.getByText('Lllooorem ippppusm dollllor seppppt');

    expect(firstNameElement).toBeInTheDocument();
    expect(lastNameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
});