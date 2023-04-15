# Grow-Fitter-Health-Fitness
Living a healthy lifestyle, especially when you can't afford a trainer and have no time to go gym is hard. Grow Fitter brings you a website where you can get advices while sitting at your home. We give you a place where you can get diet plans and exchange knowledge about fitness with others. The major problem one faces is that no one is there to judge you whether you are doing it right or not. Well, we are on our way to start a service where you can upload your pic and check. 
Dependencies used Dotenv natural.js nodejs mongoDB mongoose firebase 
Tech Stack:-MERN
The site provides a aggregated platform for MicroBlogging ,Diet Planning and Posture Detection.
The site will be up with MicroBlogging,Diet Planning and we will Shortly update the Posture detection
The site is made for Hackathon Conducted by GFG x AMD
IN DETAIL:
The site opens with a signup and signin page with the extensive use of MERN stack in the building process. The front end has been built with ReactJs and backend has been made using Nodejs and the backend specifically is deployed on an AMD instance on Google cloud platform. As the AMD instance provides a link that is http (no ssl certificate) the user currently now needs to go to the site settings and allow insecure content to load the mixed content and the site to work fully.The signup and signin page has been made using google clouds firebase service. We have used email and password to verify the user and also used firebase methods to send a mail in case the user forgets the password and reset it.The website also has with it a microblogging section where the fitness freaks can post microblogs related to fitness. However to moderate the blogs we have used naive bayes classifier from NaturalJs in the background to classify the blogs related to fitness targeting the title for now. The user can also see the blogs posted by other users and also if the user has posted a blog the tiles of the last 5 blogs would be shown.In case of discrepancy please do contact us as this is a ML model which can be inaccurate. Along with it we bring with us a diet planner using some information which we use to calculate the Basal Metabolic rate using Harris Benedict equation . We then provide the user with a personalized diet plan for a day using Spoonacular API at the background.
We also created a posture angle detection system using Machine learning tool Mediapipe. Here, user can post their photos of body postures during their exercise and yoga activities, and the model would detect the correct body angles like - neck, shoulders, knee, elbow, thigh according to the horizontal reference line (ground or surface area) and warn the user by showing a pop-up that “Body angles are matched” and “Not Matching. Try Again” kind of messages.
The team members are:-
Parthib Goswami:-Full stack Development and Hosting
Rahul Kumar:-Data Collection and Cloud Development
Isha Keshav:-Cloud Development and Machine Learning, Key strategist
Subham Maji:-Machine Learning,Front-end Development
Any query for the app please mail on grow.fitter01@gmail.com
PROBLEM WHILE SURFING THE SITE: Go to site settings -> Turn on allow Insecure Data -> Reopen the site
Take a look at our site: https://grow-fitter.onrender.com/
The posture detection is work in progress, once we are done with it you can upload your image while exercising and check whether you are doing it right or not!
