(function () {
  const input = document.getElementById("search");
  const suggestionArea = document.getElementById("suggestion-area");

  const onFocus = () => {
    suggestionArea.style.display = "block";
  };

  const onBlur = (e) => {
    if (e.target === input || e.target === suggestionArea) {
      return;
    }

    suggestionArea.style.display = "none";
  };

  const onChange = (e) => {
    const { value } = e.target;
    processData(value);
  };

  const processData = async (value) => {
    suggestionArea.innerHTML = "";
    if (!value) {
      input.style.borderBottom = "none";
      return;
    }

    try {
      const resp = await getSuggestions(value);
      if (resp.length > 0) {
        const list = document.createElement("ul");

        resp.forEach((e) => {
          const listItem = document.createElement("li");
          listItem.innerText = e;
          listItem.style.cursor = "pointer";
          list.appendChild(listItem);
        });

        suggestionArea.innerHTML = "";
        input.style.borderBottom = "1px solid gray";
        suggestionArea.appendChild(list);
      }
    } catch (e) {
      console.log("error while making the network call", e);
    }
  };

  const getSuggestions = () => {
    let idx = Math.floor(Math.random() * (4 - 1) + 1);

    const array1 = ["abcd", "shubham", "sati", "Hey", "Hi"];
    const array2 = [
      "sdgdsgasdg",
      "shusdf sbham",
      "as",
      "fg g sg",
      "jls kdfjlks jdfjl",
    ];
    const array3 = [
      "uweu",
      "sai  jklj lkjfsdl ",
      " jklsdafj lkjaslf jlasj dflk jasldkf jlas kf",
      "g loi gjlkas jdglkj slkdgjlk djl",
      "asdf lkjla ksdjflkajsdlkf jalsk djflkasjd lfkj asldfjlsaj flks",
    ];

    if (idx === 1) {
      return array1;
    } else if (idx === 2) {
      return array2;
    } else {
      return array3;
    }
  };

  const onClick = (e) => {
    if (e.target === suggestionArea) {
      return;
    }

    // alert(e.target.innerText);
    const text = e.target.innerText;
    input.value = text;
    input.focus();
  };

  input.addEventListener("focus", onFocus);
  // input.addEventListener('blur', onBlur);
  // here if we put eventlistener in input for blur then click event on the suggestion area will not happer properly.
  // because clicking outside makes suggestion area visible = none so clicking functionality is not applicable theirfore we user window for blur and handle the situation inside onBlur function.
  window.addEventListener("click", onBlur);
  input.addEventListener("keyup", onChange);
  suggestionArea.addEventListener("click", onClick, true);
  // here we have made the bubbling phase as true as it was not able to get the clicked ListItem content
})();
