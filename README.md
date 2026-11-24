# Mobile Programming Laboratory Applications

This repository contains the weekly mobile application projects developed for the Mobile Programming course.

## Repository Structure

```text
mobile-labs/
├── week-8/
└── README.md
```

Each week directory includes a standalone Expo or React Native project. Project-specific setup and usage instructions are provided in the corresponding directory.

## Week 8

The Week 8 project is an API-based ecommerce application developed with React Native and Expo.

The application includes:

- Product listing through the DummyJSON REST API
- Product detail screens
- Expo Router file-based navigation
- Cart management with React Context API
- Quantity updates and item removal
- Loading and error states
- A shared monochrome interface theme

Project directory: [week-8](./week-8)

## General Requirements

- Node.js 18 or newer
- npm
- Expo Go or a compatible Android or iOS development environment
- A stable internet connection for external API requests

## Running a Project

Change to the selected week directory, install dependencies, and start the Expo development server:

```bash
cd week-8
npm install
npx expo start --go
```

Scan the QR code with Expo Go while the computer and mobile device are connected to the same network.
