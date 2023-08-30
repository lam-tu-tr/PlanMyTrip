# Ai Itinerary Planner
An artificial intelligence travel itinerary generator using ChatGPT

**Link to project:** https://ai-itinerary-planner.vercel.app/

![Pic](/Pics/detailedItinerary.png)

## How It's Made:

**Tech used:** React, Typescript, NextJS, Prisma, PlanetScale, Mapbox, OpenAI, TailwindCSS

* Since OpenAI was the main draw of this project, I started by ensuring that the OpenAI response is streamed, process, and displayed correctly based on user chosen destination and duration of trip. Next, I needed to extract the generated locations and its coordinate to store them into an array for use. I utilized the AI response to my advantage by requiring that it to wrap all generated locations within the response in a `<span className="ai-location"></span>` component, which I then selected using querySelectAll to store into an array. I then iterated through this array to fetch the coordinate for each location using Promise.all and store the data into a new array of objects in this format `[{location: [coordinate.x, coordinate.y]}]`. Since the message string now contains HTML and JS, I sanitized the string using DOMpurify.sanitize before using dangerouslySetInnerHTML to display the message. 
* Next, I integrated Mapbox on the home screen to allow location browsing. To extend this further, in the AI generated page, I mapped through the location array and created a marker on the map for each location so that users can quickly visualize and plan their trip accordingly. 
* I also wanted to try creating a barebone account system and store user data with trip info in a relational database. For this, I chose Prisma as the ORM that interfaces with PlanetScale MySQL. This allowed me to practice communicating with a database by sending REST requests. Account system also enables trip info that are pregenerated to be retrieved and display as a static page while maintaining the interactability of Mapbox with location markers.

![Pic](/Pics/drawSQL.png)

## What I learned
* I learned that frontend developers need to look at the project as a system and integrate a myriad of different technologies together into a cohesive whole. In this single project alone, I learned and used 8 different technologies aside from HTML,CSS, and Javascript. We must be able to quickly adapt to new and ever changing web technologies. I find that quite exciting actually as there will always be problems to solve. Moreover, It was really rewarding to see the project that I worked hard on finally come together into a functional web app. I was ecstatic to be able to share it with everyone. This solidified my love for frontend development.
* Through Vercel's speed insight tool, I also learned that there a various speed metrics that should be optimized for the best user experience: First Contentful Paint and First input delay. Since user attention span is limited, we need to quickly grasp their attention with maintain it by displaying the content of the website and allowing user input as quickly as possible. After 'finishing' the project, I realized that in my attempt to unify all the different technologies, I coded with many redundency in React states and useEffect, causing a bottleneck in speed. Armed with new knowledge, I went back and optimized my code by removing the unncessary clutters, which achieved 0.18s First Contentful Paint and 1ms First Input Delay. 

## Other Projects:

Check out my other projects here.

**Sinnoh Pokedex:** https://github.com/lam-tu-tr/SinnohPokedex

**Lam Types:** https://github.com/lam-tu-tr/LamTypes.github.io
