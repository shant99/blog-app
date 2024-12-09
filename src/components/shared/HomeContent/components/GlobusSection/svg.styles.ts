export const svgStyles = `@keyframes moveReliable {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-15px, -40px);
    }
  }

  @keyframes moveScalability {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-20px, 15px);
    }
  }

  @keyframes moveHighCompatibility {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(10px, -5px);
    }
  }

  @keyframes moveFastSearch {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-10px, 20px);
    }
  }

  @keyframes movePGVector {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(5px, -35px);
    }
  }

  @keyframes moveLangChain {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-20px, 15px);
    }
  }

  .animate-reliable {
    animation: moveReliable 2s ease-in-out infinite alternate;
  }

  .animate-scalability {
    animation: moveScalability 2.2s ease-in-out infinite alternate;
  }

  .animate-high-compatibility {
    animation: moveHighCompatibility 2.5s ease-in-out infinite alternate;
  }

  .animate-fast-search {
    animation: moveFastSearch 1.8s ease-in-out infinite alternate;
  }

  .animate-pgvector {
    animation: movePGVector 2.2s ease-in-out infinite alternate;
  }

  .animate-langchain {
    animation: moveLangChain 2.7s ease-in-out infinite alternate;
  }

   text {
      pointer-events: all; /* Make text interactive */
  }

  text:hover {
      filter: blur(0); /* Remove blur */
      opacity: 1; /* Make fully visible */
      transition: filter 0.3s ease, opacity 0.3s ease;
      color: red;
      cursor: pointer;
  }
  
  g {
    transform-origin: inherit;
  }
  `;
