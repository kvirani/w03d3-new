# W03D3 - Cookies 

With Khurram Virani / KV
March 18, 2020

## Hello [10m]

Intros and Expectations:

- I'm KV
- Joke
- Lecture style
- KV's Remote Lecture Protocol
  - Recorded
  - Chat or raise hands for questions
  - Questions & Answers 
  - The right to mute
- I'm on Windows (what???)

## Housekeeping [5m]

- Who's here?
- Setup: LiveCodeShare Setup and Following

## 1 - Problem Definition [5m]

> What problem do cookies try to solve?

Problem with HTTP without cookies: 

Client's session data (for eg: who they are) has no persistence between requests

> **The server has _amnesia_**


## 2 - Sans Cookies [10m]

> Can we solve this problem without cookies?

Yes. 

Using URL query string parameters!


1. User navigates to /my/profile (GET /my/profile)
2. Server doesn't see any info about you (in cookies etc) and therefore considers user not logged in
3. Server sends back a 302 Redirect to /login
4. User navigates to /login
5. User fills out the form with valid creds and hits submit
6. Server receives POST and (uses req.body) successfully finds the cred combo in the db
7. Server redirects user to /my/profile?key=kv
8. User navigates to /my/profile?key=kv
9. Server receives GET and sees that key is there and looks it up in the db successfully. 
10. ~~Server repeats step 2 (redirect user back to /login)~~ Server recognizes the user and allows them to see the page by responding with 200 and EJS/HTML

**Problems with URL based approach for authentication:**

- Login form (where pass is req) can now be completely bypassed by anyone
- URL could get shared on Social Media or Email and now we have a breach by friends or strangers
- If you nagivate elsewhere the server needs to pass along the key=kv in every internal link. 
- New tabs will not know that you are logged in unless you explicitly type in `key=kv&lang=en&theme=dark` into the params


## 3 - Cookies Demo 1- Language Switcher [20m]

After doing this demo, we realized that actually, URL based approach is better for language! 

Moral of that story: Cookies hide key-value data from the URLs but sometimes you want that context in the URL, for sharing, etc.

## BREAK [10m]

## 4 - Cookies Demo 2 - User Auth [20m]

Just implemented Login. Didn't need to implement Sign up for that. 

## 5 - Recap & Takeaways [5m]

Things we learned...

Cookies are:

- A better alternative to jamming data into the URL for the server to know who I am or other details between multiple requests
- Strings
- Key value pairs 
- Stored by the client (browser)
- Not to be trusted as they can modified (or cleared) by the user/client
  - KNOWN ISSUE - Our server is vulnerable to the brute force (guessing of username) attack via cookies

How EJS templates are used (review)

Morgan middleware for request logging

How to hide pages behind some type of Authentication

Authentication vs AUthorization. 

Nodemon so that we dont have to restart the server 
  - Warning: For Vagrant - Add polling option to nodemon

Cookie parser is not about enabling cookies, but parsing the string in `req.headers.cookies` so that it's easier for us.

Cookies are not the only solution, in fact some times they are not the best. 
 - A great example is the demo 1 (lang selector) because of sharing links on SM, Email, etc.

## 6 - Closing Comments [5m]

Remote work is becoming more prominent.  Check out: 

Resources:

- WeWorkRemotely.com
- https://www.toptal.com/insights/future-of-work/history-of-remote-work

Companies that are fully or mostly remote (ie remote first)

- HashiCorp (remote first)
- GitLab (remote first)
- Buffer (remote first)
- Automatic (remote first)
- Zapier (remote first)
