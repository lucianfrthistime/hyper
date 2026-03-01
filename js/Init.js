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
  StartBootSequence();
  SetRandomBackgroundVideo();

  document.addEventListener("contextmenu", (e) => e.preventDefault());
});

const DiscordID = "1410379998250139824";

async function FetchDiscordStatus() {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DiscordID}`);
    const data = await response.json();

    if (data.success) {
      const user = data.data;
      const status = user.discord_status;
      const avatar = `https://cdn.discordapp.com/avatars/${DiscordID}/${user.discord_user.avatar}.png`;
      const username = user.discord_user.username;
      const customStatus = user.activities.find(a => a.type === 4)?.state || "No custom status";
      const gameActivity = user.activities.find(a => a.type === 0)?.name;

      const placeholder = document.getElementById("DiscordStatusPlaceholder");
      if (placeholder) {
        placeholder.innerHTML = `
          <div class="DiscordCard glass">
            <div class="DiscordAvatarWrapper">
              <img src="${avatar}" class="DiscordAvatar" alt="${username}">
              <div class="DiscordStatusIndicator status-${status}"></div>
            </div>
            <div class="DiscordInfo">
              <span class="DiscordUsername">${username}</span>
              <span class="DiscordStatus">${customStatus}</span>
              ${gameActivity ? `<span class="DiscordActivity">Playing ${gameActivity}</span>` : ""}
            </div>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Failed to fetch Discord status:", error);
  }
}

function StartBootSequence() {
  const terminal = document.getElementById("TerminalLines");
  if (!terminal) return;

  const lines = [
    { text: "[  OK  ] Finished Load Kernel Modules.", type: "ok" },
    { text: "[  OK  ] Started Remount Root and Kernel File Systems.", type: "ok" },
    { text: "[  OK  ] Started Coldplug All udev Devices.", type: "ok" },
    { text: "[  OK  ] Reached target System Initialization.", type: "ok" },
    { text: "Mounting /etc/fstab... [ DONE ]", type: "info" },
    { text: "Starting Network Manager... [ OK ]", type: "ok" },
    { text: "Initializing gethyper.lol environment...", type: "info" },
    { text: "Loading site resources...", type: "info" },
    { text: "Starting Lucian's server...", type: "ok" },
    { text: "Ubuntu 22.04.3 LTS imlucian tty1", type: "info" },
    { text: "imlucian login: lucian (automatic login)", type: "info" },
    { text: "Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-89-generic x86_64)", type: "info" },
    { text: " * Documentation:  https://help.ubuntu.com", type: "info" },
    { text: " * Management:     https://landscape.canonical.com", type: "info" },
    { text: " * Support:        https://ubuntu.com/advantage", type: "info" },
    { text: "System information as of " + new Date().toUTCString(), type: "info" },
    { text: "  System load:  0.0               Processes:             102", type: "info" },
    { text: "  Usage of /:   18.5% of 19.56GB  Users logged in:       1", type: "info" },
    { text: "  Memory usage: 24%               IP address for eth0:   192.168.1.105", type: "info" },
    { text: "  Swap usage:   0%", type: "info" },
    { text: "12 updates can be applied immediately.", type: "warn" },
    { text: "9 of these updates are standard security updates.", type: "warn" },
    { text: "To see these additional updates run: apt list --upgradable", type: "info" },
    { text: "Last login: " + new Date().toDateString() + " from 127.0.0.1", type: "info" },
    { text: "lucian@gethyper:~$ cd /var/www/web", type: "info" },
    { text: "lucian@gethyper:/var/www/web$ node start.js", type: "info" },
    { text: "Serving at http://localhost:3000", type: "ok" },
    { text: "Connection established. Loading GUI...", type: "ok" }
  ];

  let currentLine = 0;

  function addLine() {
    if (currentLine < lines.length) {
      const lineObj = lines[currentLine];
      const div = document.createElement("div");
      div.className = `TerminalLine ${lineObj.type}`;
      div.textContent = lineObj.text;
      terminal.appendChild(div);
      currentLine++;

      terminal.scrollTop = terminal.scrollHeight;

      const delay = Math.random() * 100 + (currentLine > 10 ? 150 : 50);
      setTimeout(addLine, delay);
    } else {
      setTimeout(FinishLoading, 1000);
    }
  }

  addLine();
}

function FinishLoading() {
  const loadingScreen = document.getElementById("LoadingScreen");
  if (loadingScreen) {
    loadingScreen.classList.add("hidden");
    document.body.style.overflow = "auto";
    TypeLoop();
    FetchDiscordStatus();
  }
}
