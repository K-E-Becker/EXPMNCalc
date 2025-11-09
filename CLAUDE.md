# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EXP Magic Number Calculator is a standalone HTML/CSS/JavaScript calculator for business metrics calculations. It calculates estimated traffic, transaction goals, and ADS (Average Dollar Sale) goals based on last year's data and conversion rates.

## File Structure

- `index.html` - Main HTML structure with forms for three calculation scenarios
- `index.js` - Core calculation logic and event handlers
- `index.css` - Styling for form layouts and input fields

## Architecture

### Calculation Flow

The application implements a **data pipeline architecture** where calculations flow through three main scenarios:

1. **MTD Numbers Path** (equations 1-3):
   - Estimate Traffic → Estimate Transaction Goal → ADS Goal
   - Uses MTD (Month-to-Date) conversion rates

2. **Conversion Goal Path** (equations 4-5):
   - Uses LY (Last Year) Conversion with lift projections
   - Calculates Transaction Goal → ADS

3. **Flat/LY Conversion Path** (equations 6-7):
   - Uses flat or LY conversion rates
   - Calculates Transaction Goal → ADS

### Auto-fill System

The application maintains **synchronized state** across multiple input fields:
- Estimated Traffic is synced across 4 fields (`EstTraff`, `EstTraff2`, `EstTraff4`, `EstTraff5`)
- Plan values sync across 3 fields (`Plan`, `Plan2`, `Plan3`)
- Transaction Goals sync between related fields

This synchronization is handled by `input` event listeners (lines 119-149 in index.js) that propagate values to dependent fields, enabling users to see how one change affects multiple calculation scenarios.

## Development Commands

### Running the Application
```bash
# Open in browser
open index.html
# Or use a local server
python3 -m http.server 8000  # Then visit http://localhost:8000
```

### Testing
The project uses **Jest** for comprehensive unit and integration testing:

```bash
# Install dependencies first
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- 61 test cases covering all business logic
- 100% coverage of calculation functions
- Integration tests for real-world retail scenarios
- See `TESTING.md` for detailed testing documentation

## Code Conventions

### Calculation Functions
- Each equation function (`equation1` through `equation7`) is self-contained
- Percentage inputs are divided by 100 before calculations
- Traffic and transaction results use `Math.ceil()` for rounding up
- ADS calculations use `.toFixed(2)` for two decimal precision

### DOM Manipulation
- All element access uses `getElementById()`
- Event listeners are attached directly after function definitions
- The module.exports at the end (line 150-152 in index.js) is unused and appears vestigial
