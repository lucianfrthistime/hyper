let Index = 0;
let CharIndex = 0;
let CurrentText = "";
let IsDeleting = false;

function TypeLoop() {
  const TextList = [
    "Hello there!",
    "Im watching you.",
    "If you did not know this took a long time to make.",
    "Bonjour!",
    "My favorite food is nothing.",
    "Note that valorant sucks.",
  ];

  const Element = document.getElementById("Typewriter");
  const FullText = TextList[Index];

  if (!IsDeleting) {
    CurrentText = FullText.substring(0, CharIndex + 1);
    CharIndex++;
    if (CurrentText === FullText) {
      IsDeleting = true;
      setTimeout(TypeLoop, 3000);
      Element.textContent = CurrentText;
      return;
    }
  } else {
    CurrentText = FullText.substring(0, CharIndex - 1);
    CharIndex--;
    if (CharIndex === 0) {
      IsDeleting = false;
      Index = (Index + 1) % TextList.length;
    }
  }

  Element.textContent = CurrentText;
  const Speed = IsDeleting ? 60 : 90;
  setTimeout(TypeLoop, Speed);
}

window.onload = function () {
  const Cursor = document.querySelector(".CustomCursor");
  let CursorX = 0,
    CursorY = 0;
  let TargetX = 0,
    TargetY = 0;
  const Easing = 0.2;

  document.addEventListener("mousemove", (e) => {
    TargetX = e.clientX + window.scrollX;
    TargetY = e.clientY + window.scrollY;
  });

  function AnimateCursor() {
    CursorX += (TargetX - CursorX) * Easing;
    CursorY += (TargetY - CursorY) * Easing;

    Cursor.style.left = `${CursorX}px`;
    Cursor.style.top = `${CursorY}px`;
    requestAnimationFrame(AnimateCursor);
  }

  AnimateCursor();
  TypeLoop();
  document.oncontextmenu = document.body.oncontextmenu = function () {
    return false;
  };
};
