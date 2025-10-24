# Ezra-Assignment

This guide explains the manual test cases and automated flow for booking a scan on Ezra's staging site.

## Overview

## The manual test cases for Member portal & User portal are maintained in **Excel** and cover:
- **Question 1**
  - Part 1: Functional test cases
  - Part 1: Negative/Edge test cases
  - Bugs
  - Part 2: Top 3 Critical Test Cases
- **Question 2**
  - Privacy & Security: Part 1, 2, 3

> Please refer to `Ezra_Manual_TestCases.xlsx` in this repo for detailed steps.

## Automated Test Scripts (Playwright)
1. **emaillogin.js** – Tests valid login functionality  
2. **invalidLogin.js** – Tests invalid login scenario  
3. **successfulpayment.js** – Tests the full booking flow including:
   - Book a scan
   - Enter DOB and select Sex at birth
   - Select MRI scan & recommended center
   - Pick Date & Time slot
   - Enter payment details
   - Confirm booking success

✅ Each step prints a message in the console for progress tracking.

---

## Setup Instructions

1. Install **Node.js** (v18+ recommended)
2. Clone this repository:

```bash
git clone <repo-url>
cd ezra-assignment

## Run any Script

node emaillogin.js
node invalidLogin.js
node successfulpayment.js

