import * as React from "react";

export const GithubIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path fill="none" d="M0 0h512v512H0z" />
    <path
      fill="currentColor"
      d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32Z"
    />
  </svg>
);

export const StackOverflowIcon = ({ className, ...rest }) => (

    <svg viewBox="0 0 169.61 200" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em">
      <path d="M140.44 178.38v-48.65h21.61V200H0v-70.27h21.61v48.65z" fill="#bcbbbb"/>
      <path
          d="M124.24 140.54l4.32-16.22-86.97-17.83-3.78 17.83zM49.7 82.16L130.72 120l7.56-16.22-81.02-37.83zm22.68-40l68.06 57.3 11.35-13.51-68.6-57.3-11.35 13.51zM116.14 0l-14.59 10.81 53.48 71.89 14.58-10.81zM37.81 162.16h86.43v-16.21H37.81z"
          fill="#f48024"/>
    </svg>
);

export const LinkedInIcon = ({className, ...rest}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 256 256"
        {...rest}
        className={`w-full h-auto ${className}`}
    >
      <path fill="none" d="M0 0h256v256H0z"/>
      <g fill="none">
        <rect width={256} height={256} fill="#fff" rx={60}/>
        <rect width={256} height={256} fill="#0A66C2" rx={60}/>
        <path
            fill="#fff"
        d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82 19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4ZM38 59.627c0 11.865 9.767 21.627 21.632 21.627 11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38 47.762 38 38 47.763 38 59.627Zm6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4Z"
      />
    </g>
  </svg>
);

export const HackerrankIcon = ({ className, ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="2em" width="2em" viewBox="-1 -1 582 486.999">
      <path d="M-1-1h582v402H-1z" fill="none"/>
      <path
          d="M454.843 141.001c-13.019-22.417-172.832-115-198.859-115-26.019 0-185.895 92.351-198.84 115-12.947 22.649-13.019 207.358 0 230.009 13.018 22.639 172.839 114.989 198.84 114.989 26 0 185.841-92.466 198.851-114.999 13.007-22.533 13.016-207.583.008-229.999zM309.862 398.15c-3.559 0-36.756-32.137-34.141-34.762.781-.78 5.625-1.328 15.768-1.644 0-23.564.53-61.622.844-77.553.038-1.814-.395-3.081-.395-5.256h-71.812c0 6.379-.412 32.523 1.232 65.479.205 4.078-1.42 5.353-5.158 5.335-9.102-.025-18.211-.099-27.321-.071-3.683.009-5.274-1.374-5.157-5.488.826-30.043 2.66-75.488-.134-191.07v-2.849c-8.688-.314-14.717-.862-15.508-1.652-2.624-2.624 31.032-34.76 34.581-34.76 3.558 0 36.989 32.145 34.383 34.76-.782.781-7.098 1.338-15.067 1.652v2.84c-2.174 23.135-1.823 71.506-2.362 94.686h72.107c0-4.089.351-31.212-1.077-75.145-.091-3.047.853-4.646 3.781-4.672 9.945-.072 19.9-.117 29.855-.055 3.108.019 4.105 1.546 4.043 4.834-3.28 171.861-.594 159.867-.594 188.975 7.97.315 15.112.864 15.895 1.655 2.588 2.615-30.205 34.761-33.763 34.761z"
          fill="#2ec866"/>
    </svg>
);

export const KaggleIcon = ({className, ...rest}) => (

    <svg viewBox="-0.02709518982213599 -0.030642709053697148 163.38551350377654 63.23720429657111"
         xmlns="http://www.w3.org/2000/svg" width="2em" height="2em">
      <path
          d="M26.92 47c-.05.18-.24.27-.56.27h-6.17a1.24 1.24 0 0 1-1-.48L9 33.78l-2.83 2.71v10.06a.61.61 0 0 1-.69.69H.69a.61.61 0 0 1-.69-.69V.69A.61.61 0 0 1 .69 0h4.79a.61.61 0 0 1 .69.69v28.24l12.21-12.35a1.44 1.44 0 0 1 1-.49h6.39a.54.54 0 0 1 .55.35.59.59 0 0 1-.07.63L13.32 29.55l13.46 16.72a.65.65 0 0 1 .14.73zm25.01.24h-4.79c-.51 0-.76-.23-.76-.69v-1a12.77 12.77 0 0 1-7.84 2.29A11.28 11.28 0 0 1 31 45.16a9 9 0 0 1-3.12-7.07q0-6.81 8.46-9.23a61.55 61.55 0 0 1 10.06-1.67A5.47 5.47 0 0 0 40.48 21a14 14 0 0 0-7.91 2.77c-.41.24-.71.19-.9-.13l-2.5-3.54c-.23-.28-.16-.6.21-1a19.32 19.32 0 0 1 11.1-3.68A13.29 13.29 0 0 1 48 17.55q4.59 3.06 4.58 9.78v19.22a.61.61 0 0 1-.65.69zm-5.55-14.5q-6.8.7-9.3 1.81Q33.69 36 34 38.71a3.49 3.49 0 0 0 1.53 2.46 5.87 5.87 0 0 0 3 1.08 9.49 9.49 0 0 0 7.77-2.57zM81 59.28q-3.81 3.92-10.74 3.92a15.41 15.41 0 0 1-7.63-2c-.51-.33-1.11-.76-1.81-1.29s-1.5-1.19-2.43-2a.72.72 0 0 1-.07-1l3.26-3.26a.76.76 0 0 1 .56-.21.68.68 0 0 1 .49.21c2.58 2.58 5.11 3.88 7.56 3.88q8.39 0 8.39-8.74v-3.63a13.1 13.1 0 0 1-8.67 2.71 12.48 12.48 0 0 1-10.55-5.07A18.16 18.16 0 0 1 56 31.63a18 18 0 0 1 3.2-10.82 12.19 12.19 0 0 1 10.61-5.34 13.93 13.93 0 0 1 8.74 2.71v-1.39a.62.62 0 0 1 .69-.7h4.79a.62.62 0 0 1 .7.7v31q.03 7.57-3.73 11.49zM78.58 26q-1.74-4.44-8-4.44-8.11 0-8.11 10.12 0 5.63 2.7 8.19a7.05 7.05 0 0 0 5.21 2q6.51 0 8.25-4.44zm35.01 33.28q-3.78 3.91-10.72 3.92a15.44 15.44 0 0 1-7.63-2q-.76-.49-1.8-1.29c-.7-.53-1.51-1.19-2.43-2a.7.7 0 0 1-.07-1l3.26-3.26a.74.74 0 0 1 .55-.21.67.67 0 0 1 .49.21c2.59 2.58 5.11 3.88 7.56 3.88q8.4 0 8.4-8.74v-3.63a13.14 13.14 0 0 1-8.68 2.71A12.46 12.46 0 0 1 92 42.8a18.09 18.09 0 0 1-3.33-11.17 18 18 0 0 1 3.19-10.82 12.21 12.21 0 0 1 10.61-5.34 14 14 0 0 1 8.75 2.71v-1.39a.62.62 0 0 1 .69-.7h4.79a.62.62 0 0 1 .69.7v31q-.02 7.57-3.8 11.49zM111.2 26q-1.74-4.44-8-4.44-8.2-.05-8.2 10.07 0 5.63 2.71 8.19a7 7 0 0 0 5.2 2q6.53 0 8.26-4.44zM128 47.24h-4.78a.62.62 0 0 1-.7-.69V.69a.62.62 0 0 1 .7-.69H128a.61.61 0 0 1 .7.69v45.86a.61.61 0 0 1-.7.69zm34.91-14.08a.62.62 0 0 1-.7.69h-22.54a8.87 8.87 0 0 0 2.91 5.69 10.63 10.63 0 0 0 7.15 2.46 11.64 11.64 0 0 0 6.86-2.15c.42-.28.77-.28 1 0l3.26 3.33c.37.37.37.69 0 1a18.76 18.76 0 0 1-11.58 3.75 16 16 0 0 1-11.8-4.72 16.2 16.2 0 0 1-4.57-11.86 16 16 0 0 1 4.51-11.52 14.36 14.36 0 0 1 10.82-4.3A14.07 14.07 0 0 1 158.88 20 15 15 0 0 1 163 31.63zM153.82 23a8.18 8.18 0 0 0-5.69-2.15 8.06 8.06 0 0 0-5.48 2.08 9.24 9.24 0 0 0-3 5.41h16.71a7 7 0 0 0-2.54-5.34z"
          fill="#20beff"/>
    </svg>
);

export const SunIcon = ({className, ...rest}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        {...rest}
        className={`w-full h-auto ${className}`}
    >
      <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
      >
        <g strokeDasharray="2">
          <path d="M12 21v1M21 12h1M12 3v-1M3 12h-1">
            <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.2s"
                values="4;2"
            />
          </path>
          <path d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5">
            <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.2s"
                dur="0.2s"
                values="4;2"
            />
          </path>
        </g>
        <path
            fill="currentColor"
            d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
            opacity="0"
        >
          <set attributeName="opacity" begin="0.5s" to="1"/>
        </path>
      </g>
      <g fill="currentColor" fillOpacity="0">
        <path d="m15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z">
          <animate
              id="lineMdSunnyFilledLoopToMoonFilledLoopTransition0"
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.6s;lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+6s"
              dur="0.4s"
              values="0;1"
          />
          <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+2.2s"
              dur="0.4s"
              values="1;0"
          />
        </path>
        <path d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
          <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+3s"
              dur="0.4s"
              values="0;1"
          />
          <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+5.2s"
              dur="0.4s"
              values="1;0"
          />
        </path>
        <path d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
          <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+0.4s"
          dur="0.4s"
          values="0;1"
        />
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+2.8s"
          dur="0.4s"
          values="1;0"
        />
      </path>
      <path d="m20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+3.4s"
          dur="0.4s"
          values="0;1"
        />
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+5.6s"
          dur="0.4s"
          values="1;0"
        />
      </path>
    </g>
    <mask id="lineMdSunnyFilledLoopToMoonFilledLoopTransition1">
      <circle cx="12" cy="12" r="12" fill="#fff" />
      <circle cx="22" cy="2" r="3" fill="#fff">
        <animate
          fill="freeze"
          attributeName="cx"
          begin="0.1s"
          dur="0.4s"
          values="22;18"
        />
        <animate
          fill="freeze"
          attributeName="cy"
          begin="0.1s"
          dur="0.4s"
          values="2;6"
        />
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.1s"
          dur="0.4s"
          values="3;12"
        />
      </circle>
      <circle cx="22" cy="2" r="1">
        <animate
          fill="freeze"
          attributeName="cx"
          begin="0.1s"
          dur="0.4s"
          values="22;18"
        />
        <animate
          fill="freeze"
          attributeName="cy"
          begin="0.1s"
          dur="0.4s"
          values="2;6"
        />
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.1s"
          dur="0.4s"
          values="1;10"
        />
      </circle>
    </mask>
    <circle
      cx="12"
      cy="12"
      r="6"
      fill="currentColor"
      mask="url(#lineMdSunnyFilledLoopToMoonFilledLoopTransition1)"
    >
      <set attributeName="opacity" begin="0.5s" to="0" />
      <animate
        fill="freeze"
        attributeName="r"
        begin="0.1s"
        dur="0.4s"
        values="6;10"
      />
    </circle>
  </svg>
);

export const MoonIcon = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <rect x="0" y="0" width="24" height="24" fill="rgba(255, 255, 255, 0)" />
    <g
      fill="none"
      stroke="currentColor"
      strokeDasharray="2"
      strokeDashoffset="2"
      strokeLinecap="round"
      strokeWidth="2"
    >
      <path d="M0 0">
        <animate
          fill="freeze"
          attributeName="d"
          begin="1.2s"
          dur="0.2s"
          values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
        />
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="1.2s"
          dur="0.2s"
          values="2;0"
        />
      </path>
      <path d="M0 0">
        <animate
          fill="freeze"
          attributeName="d"
          begin="1.5s"
          dur="0.2s"
          values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
        />
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="1.5s"
          dur="1.2s"
          values="2;0"
        />
      </path>
      <animateTransform
        attributeName="transform"
        dur="30s"
        repeatCount="indefinite"
        type="rotate"
        values="0 12 12;360 12 12"
      />
    </g>
    <g fill="currentColor">
      <path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          dur="0.4s"
          values="1;0"
        />
      </path>
      <path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="0.2s"
          dur="0.4s"
          values="1;0"
        />
      </path>
    </g>
    <g
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" />
      <set attributeName="opacity" begin="0.6s" to="0" />
    </g>
    <mask id="lineMdMoonFilledToSunnyFilledLoopTransition0">
      <circle cx="12" cy="12" r="12" fill="#fff" />
      <circle cx="18" cy="6" r="12" fill="#fff">
        <animate
          fill="freeze"
          attributeName="cx"
          begin="0.6s"
          dur="0.4s"
          values="18;22"
        />
        <animate
          fill="freeze"
          attributeName="cy"
          begin="0.6s"
          dur="0.4s"
          values="6;2"
        />
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.6s"
          dur="0.4s"
          values="12;3"
        />
      </circle>
      <circle cx="18" cy="6" r="10">
        <animate
          fill="freeze"
          attributeName="cx"
          begin="0.6s"
          dur="0.4s"
          values="18;22"
        />
        <animate
          fill="freeze"
          attributeName="cy"
          begin="0.6s"
          dur="0.4s"
          values="6;2"
        />
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.6s"
          dur="0.4s"
          values="10;1"
        />
      </circle>
    </mask>
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="currentColor"
      mask="url(#lineMdMoonFilledToSunnyFilledLoopTransition0)"
      opacity="0"
    >
      <set attributeName="opacity" begin="0.6s" to="1" />
      <animate
        fill="freeze"
        attributeName="r"
        begin="0.6s"
        dur="0.4s"
        values="10;6"
      />
    </circle>
  </svg>
);

export const CircularText = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="496"
    height="496"
    viewBox="0 0 496 496"
    xmlSpace="preserve"
    className={`w-full h-auto ${className}`}
    {...rest}
  >
  </svg>

);

export const LinkArrow = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className={`w-full h-auto ${className}`}
    {...rest}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-5m-7 1L20 4m-5 0h5v5"
    />
  </svg>
);

