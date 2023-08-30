# Ai Itinerary Planner
An artificial intelligence travel itinerary generator using ChatGPT

**Link to project:** https://ai-itinerary-planner.vercel.app/

![Pic](/client/public/Pokedex.png)

## How It's Made:

**Tech used:** React, Typescript, NextJS, Prisma, PlanetScale, Mapbox, OpenAI, TailwindCSS

Since OpenAI was the main draw of this project, I started by ensuring that the OpenAI response is streamed, process, and displayed correctly based on user chosen destination and duration of trip. Next, I needed to extract the generated locations and its coordinate to store them into an array for use. I utilized the AI response to my advantage by requiring that it to wrap all generated locations within the response in a <span className="ai-location"></span> component, which I then selected using querySelectAll to store into an array. I then iterated through this array to fetch the coordinate for each location using Promise.all and store the data into a new array of objects in this format [{location: [coordinate.x, coordinate.y]}]. Since the message string now contains HTML and JS, I sanitized the string using DOMpurify.sanitize before using dangerouslySetInnerHTML to display the message. 
Next, I integrated Mapbox on the home screen to allow location browsing. To extend this further, in the AI generated page, I mapped through the location array and created a marker on the map for each location so that users can quickly visualize and plan their trip accordingly. 
I also wanted to try creating a barebone account system and store user data with trip info in a relational database. For this, I chose Prisma as the ORM that interfaces with PlanetScale MySQL. This allowed me to practice communicating with a database by sending REST requests. 
<iframe width="100%" height="500px" style="box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); border-radius:15px;" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Embedded DrawSQL IFrame" frameborder="0" src="https://drawsql.app/teams/lams-awesome-team/diagrams/ai-itinerary-planner/embed">
  
</iframe> 


## Lessons Learned:

## Other Projects:

Check out my other projects here.

**Sinnoh Pokedex:** https://github.com/lam-tu-tr/SinnohPokedex

**Lam Types:** https://github.com/lam-tu-tr/LamTypes.github.io
