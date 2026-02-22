let Index = 0;
let CharIndex = 0;
let CurrentText = "";
let IsDeleting = false;

function SetRandomBackgroundVideo() {
  const VideoList = [
    "glavevideo1.mp4",
    "glaivevideo2.mp4",
    "haunted.mp4"
  ];

  const RandomVideo = VideoList[Math.floor(Math.random() * VideoList.length)];
  const VideoElement = document.getElementById("BgVideo");

  if (VideoElement) {
    const Source = VideoElement.querySelector("source");
    if (Source) {
      Source.src = `videos/${RandomVideo}`;
      VideoElement.load();
    }
  }
}

function TypeLoop() {
  const TextList = [
    "Hello there!",
    "I'm watching you.",
    "If you didn't know, this took a long time to make.",
    "Bonjour!",
    "My favorite food is nothing.",
    "Note that Valorant sucks.",
  ];

  const Element = document.getElementById("Typewriter");
  if (!Element) return;

  const FullText = TextList[Index];

  if (!IsDeleting) {
    CurrentText = FullText.substring(0, CharIndex + 1);
    CharIndex++;
    if (CurrentText === FullText) {
      IsDeleting = true;
      setTimeout(TypeLoop, 2500);
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
  const Speed = IsDeleting ? 40 : 80;
  setTimeout(TypeLoop, Speed);
}

window.addEventListener("load", () => {
  const Cursor = document.querySelector(".CustomCursor");
  if (!Cursor) return;

  let CursorX = 0, CursorY = 0;
  let TargetX = 0, TargetY = 0;
  const Easing = 0.15;

  document.addEventListener("mousemove", (e) => {
    TargetX = e.clientX;
    TargetY = e.clientY;
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
  SetRandomBackgroundVideo();

  document.addEventListener("contextmenu", (e) => e.preventDefault());
});
