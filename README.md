
# Features

## Authentication
- Users can sign up with their email, password, and profile details.
- Users can log in with their email and password.
- Automatic session management is implemented using Supabase.

## Feed
- Users can view a list of posts in the feed.
- Posts are displayed with their content, creation date, and the username of the poster.
- Real-time updates: New posts appear in the feed without refreshing.

## Posting
- Users can create a new post through a text input.
- Posts are linked to the user who created them.
- Users must be logged in to post content.

## User Profiles
- Each post displays the username of the poster.
- Clicking on a username navigates to the user profile screen, showing the user's details and their posts.

## Navigation
- Stack navigation is used for seamless transitions between screens:
  - `AuthScreen` for login.
  - `SignupScreen` for creating a new account.
  - `FeedScreen` for the main feed.
  - `UserScreen` for viewing user profiles.

## Database Integration
- Data is fetched from Supabase using the `@supabase/supabase-js` library.
- Posts and user profiles are stored in the Supabase database.

## Real-Time Subscription
- The app uses Supabase's real-time subscriptions to listen for new posts.

## Logout
- Users can log out, which clears their session and navigates them back to the login screen.

# Screens Overview

## AuthScreen
- Login screen where users can enter their email and password.
- Navigates to the signup screen for new users.

## SignupScreen
- Signup screen where users can enter their email, password, username, first name, and last name.
- User profile information is stored in the database upon successful signup.

## FeedScreen
- Main feed showing a list of posts.
- Real-time updates for new posts.
- Pagination for smooth scrolling.

## UserScreen
- Displays user details and a list of their posts.
- Allows navigation back to the main feed.

# Components

## PostInput
- A text input field for users to create new posts.
- Buttons for posting and logging out.

## PostList
- Displays individual posts with content, creation date, and username.
- Links to user profiles.

# Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npx expo start
   ```

   Or
   ```
   npx expo start --android
   ```
- Note: `.env` has the URL and KEY to an existing supabase

