# meteor-watch

Meteor Watch provides users with upcoming meteor shower information based on their geolocation and allows them to view an accurate simmulation of their night sky. The data provided is scraped from the [In The Sky website](https://in-the-sky.org/) and their [RSS feed](https://in-the-sky.org/rss.php?feed=meteors&latitude=47.60621&longitude=-122.33207&timezone=America/Los_Angeles) using Cheerio and rss-to-json.

## Sample Images

- [x] ~Allow the setup of admin accounts~ Setup one admin account by default
  1. Check items back in
  2. Look up card holders and their details (items checked out, their activity, etc)
  3. Suspend card holder accounts/revoke access
- [ ] Add order options when view the available items in the library
- [ ] Allow users to sign up for a library card
- [ ] Allow registration only if the ID a user is trying to sign up with is in the database
- [ ] Implement RFID like system
  1. Allow users to check out items by scanning their barcodes using phone or laptop camera
  2. Allow admins to scan back in items by scanning their barcodes
  3. Store item data in database with their barcode information

## Built With

* Java Spring
* Spring Security
* MySQL
* D3
