import data from "./data.json";
const pageData = data.crew;

const move = (function () {
  let currentIndex = 0;
  const arrlength = pageData.length;

  function update() {
    renderStyles();

    render.page(pageData[currentIndex]);
  }

  const nonLooping = (function () {
    // Move forward
    function goForward() {
      if (currentIndex >= arrlength - 1) return;
      currentIndex++;
      update();
    }

    // Move back
    function goBack() {
      if (currentIndex <= 0) return;
      currentIndex--;
      update();
    }

    return {
      next: goForward,
      prev: goBack,
    };
  })();

  const looping = (function () {
    function goForward() {
      currentIndex = (currentIndex + 1) % arrlength;
      update();
    }

    // Move back
    function goBack() {
      currentIndex = (currentIndex - 1 + arrlength) % arrlength;
      update();
    }

    return {
      next: goForward,
      prev: goBack,
    };
  })();

  function renderStyles() {
    const indicators = document.querySelectorAll(".indicator");

    indicators.forEach((i) => {
      i.classList.remove("indicator--selected");
    });

    const indicator = indicators[currentIndex];

      indicator.classList.add("indicator--selected");
  }

  const render = (function () {
    function page(sectionData) {
      document.getElementById("name").textContent = sectionData.name;
      document.getElementById("role").textContent = sectionData.role;
      document.getElementById("bio").textContent = sectionData.bio;
    }

    return {
      page,
    };
  })();

  return {
    looping,
    nonLooping,
  };
})();

export default move;
