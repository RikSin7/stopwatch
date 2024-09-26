import React, { useRef, useState, useEffect } from "react";

function App() {
  // State to hold the elapsed time in milliseconds
  const [time, setTime] = useState(0);
  // State to track whether the timer is running
  const [isRunning, setIsRunning] = useState(false);
  // State to manage the theme (dark/light)
  const [dark, setDark] = useState(() => {
    // Initialize dark theme based on saved value in localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark"; // Return true if dark theme was saved, else false
  });

  // Reference to store the timer ID for clearing the interval
  const timerRef = useRef(null);

  // Calculating minutes, seconds, and milliseconds from the elapsed time
  const ms = Math.floor((time % 1000) / 10); // Convert milliseconds to tenths of a second
  const sec = Math.floor((time / 1000) % 60); // Convert total time to seconds and using "% 60", the seconds will always loop back to 0 when they reach 60, ensuring that the displayed seconds are always in the range from 0 to 59.
  const min = Math.floor((time / 60000) % 60); // Convert total time to minutes

  // Function to start the timer
  const startTimer = () => {
    // Check if the timer is not already running
    if (!isRunning) {
      setIsRunning(true); // Set running state to true
      const startTime = Date.now() - time; // Get the current time and subtract the elapsed time
      // Set an interval to update the time every 10 milliseconds
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime); // Update the elapsed time
      }, 10);
    }
  };

  // Function to stop the timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear the interval to stop the timer
      timerRef.current = null; // Reset the timer reference
      setIsRunning(false); // Set running state to false
    }
  };

  // Function to reset the timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear the interval if it exists
      timerRef.current = null; // Reset the timer reference
    }
    setIsRunning(false); // Set running state to false
    setTime(0); // Reset the elapsed time to zero
  };

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setDark((prevTheme) => {
      const newTheme = !prevTheme; // Toggle the current theme
      localStorage.setItem("theme", newTheme ? "dark" : "light"); // Save the new theme to localStorage
      return newTheme; // Return the new theme state
    });
  };

  // Tailwind CSS classes for the buttons based on the current theme
  const buttonClasses = `start px-8 py-4 rounded-full ${
    dark
      ? "bg-zinc-800 text-white  active:bg-zinc-900"
      : "bg-zinc-200 text-black active:bg-zinc-300"
  }`;

  return (
    <div
      className={`min-h-screen w-full flex items-center flex-col ${
        dark ? "bg-black text-white" : "bg-white text-black"
      } transition-colors justify-center`}
    >
      <div className="flex text-[20px] gap-1 font-bold ">
        <span className="text-zinc-600">ST</span>
        {/* Button to toggle between dark and light modes */}
        <button
          aria-label="Toggle dark mode"
          className={`w-8 h-8 bg-[#212121] p-1 rounded-full mb-4 ${
            dark ? "bg-zinc-800" : "bg-zinc-200"
          } outline-none`}
          onClick={toggleTheme}
        >
          {/* Icon for dark mode */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${dark ? "block" : "hidden"} ${
              dark ? "rotate-180" : "rotate-0"
            }`}
          >
            <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path>
          </svg>

          {/* Icon for light mode */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${dark ? "hidden" : "block"}`}
          >
            <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"></path>
          </svg>
        </button>
        <span className="text-zinc-600">PWatch</span>
      </div>

      {/* Displaying the timer */}
      <div className="flex justify-center sm:text-9xl text-[15vw] sm:font-bold font-semibold">
        <span>{min < 10 ? "0" + min : min}:</span>
        <span>{sec < 10 ? "0" + sec : sec}:</span>
        <span>{ms < 10 ? "0" + ms : ms}</span>
      </div>

      {/* Buttons for controlling the timer */}
      <div className="btn flex sm:text-5xl text-[5vw] sm:gap-12 gap-2 mt-12 sm:font-semibold ">
        <button
          className={buttonClasses}
          onClick={startTimer}
          disabled={isRunning} // Disable button if timer is running
        >
          Start
        </button>
        <button
          className={buttonClasses}
          onClick={stopTimer}
          disabled={!isRunning} // Disable button if timer is not running
        >
          Stop
        </button>
        <button className={buttonClasses} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
