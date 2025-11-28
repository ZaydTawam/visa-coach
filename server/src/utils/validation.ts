import { Request, Response, NextFunction } from "express";
const { validationResult } = require('express-validator');

export const registerSchema = {
  email: {
    isEmail: { errorMessage: 'Invalid email.' },
    normalizeEmail: true,
  },
  password: {
    isLength: {
      options: { min: 8, max: 64 },
      errorMessage: 'Password must be 8-64 characters.',
    },
  },
  firstName: {
    trim: true,
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'First name required (max 50 chars).',
    },
  },
  lastName: {
    trim: true,
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Last name required (max 50 chars).',
    },
  },
  country: {
    trim: true,
    notEmpty: { errorMessage: 'Country is required.' },
  },
  university: {
    trim: true,
    notEmpty: { errorMessage: 'University is required.' },
  },
}

export const loginSchema = {
  email: {
    isEmail: { errorMessage: 'Invalid email.' },
    normalizeEmail: true,
  },
  password: {
    notEmpty: { errorMessage: 'Password is required.' },
  },
}

export const interviewAnswerSchema = {
  id: {
    in: ['params'],
    isMongoId: { errorMessage: 'Invalid interview ID.' },
  },
  question: {
    trim: true,
    notEmpty: { errorMessage: 'Question is required.' },
    isLength: {
      options: { max: 500 },
      errorMessage: 'Question max length is 500 characters.',
    },
  },
};

export const validateRequest = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};