# TrekBnB

[TrekBnB][amzn], a clone of airbnb.com, is a Single Page Application built with Ruby on Rails,
PostgreSQL, React.js, Flux, Google Maps API v3, Bootstrap, jQuery and jQuery-ui.

[amzn]: https://www.trekit.co

## Features
<!-- This is a Markdown checklist. Use it to keep track of your progress! -->
- User login/ account signup
- Searching for rooms in current Google Maps view
- Filter search result with checkin/checkout date, room type, price range parameters
- View room details with multiple room pictures
- Check date availability of rooms
- Make room reservations
- View all trips by the
 user

## Design Docs

- [Project Proposal][proposal]
- [Database Schema][schema]

[proposal]: ./docs/proposal.md
[schema]: ./docs/schema.md

## Code

### Backend
- Ruby on Rails with PostgreSQL
- Controllers handle data through JSON API upon AJAX request

### Frontend
- Single Page Application, powered by React/Flux/ReactRouter
- SessionStore to track and manage user login status
- Bootstrap for styling and component positioning
- Font Awesome for icons
- jQuery-ui for dataRangePicker and priceRangeSlider
- jQuery for ajax request
