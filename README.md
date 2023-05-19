# 377_FinalProject

## About
This project is a visualizer for three main CPU scheduling algorithms. Using the knowledge from Project 3, I refactored some of the algorithms codes in C++ in that project into Javascript. I then took these algorithms and incorporated them into a React based website. This website allows users to add processes, which randomly generate arrival and duration times, and then execute them for scheduling based on their chosen algorithm. After the execute button is pressed, the website displays a running queue of the processes and display which process at the moment is running. After the process is complete, a colored timeline of the processes in appropiate order is displayed, as well as a list of how they were initially. 

## Design Process
1. Think of Idea → Extends on Project 3
  - Decide to use React to make visualization website
  - Break down into steps
2. Design Interface
  - Button to Add Processes
  - Once all processes “loaded” -> execute algorithm (button)
  - Display a running queue and show what process is currently running
  - Display a timeline of all the processes in order
3. Figure Out Backend, scheduling algorithms
  - Refactor Project 3 scheduling code from C++ to Javascript 
  - Use this code to “sort” the processes to display on a running queue + timeline
  - Figure how to integrate front and back together and get it to run!

## How to Play Around
 This website was made using React and Javascript. There is no C code.
 To quickly deploy the app, I used Code Sandbox. 
 Here is that link: https://u20em0.csb.app/ 
 
 ## Video and Presentation
 Link to Video: coming soon
 Link to Presentation: https://docs.google.com/presentation/d/16LwMCGVk9NRzuSzIetpi2Or42sZz7mBBE5NTeWNgFwA/edit?usp=sharing 


