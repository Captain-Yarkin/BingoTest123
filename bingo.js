const tasks = [
  "Gå på ein isbre", "Smake på / spise ein manet", "Lyse etter krabber", "Spandere ein drink på noen på byen", " Gi eit kompliument til ein fremmed", "Kunne pek ut og nanvgi 122 lang på et kart",
  "Melke ei ku", "Gå ein norgeskjent topptur", "prøve 3 nye type alkoholdrinker som du ikkje har mskat før", "Dra på båttur (på havet, båten må ha motor)", "Ta ein piercing",
  "Lese 4 bøker (ikkje pensum)", "lag din egen iskrem","Sykle tre mil sammen-hengende, inn eller ute","Stryk eller få E i eit fag","Klappe ein katt","Gå alene på kino",
  "Kjøp opp ein vare i ein butikk (må minst være tre ting igjen)","Ha hvit måned","Se ferdig ein serie med minst 7 sesonger"," Vaske 5 hus vinduer (begger sider og på ein dag)",
  "Gå ein fjelltur"," bade i havet","Ha make out session med ein ginger","Bli tat med ut på date, men DU spanderer",
  "Send eit fysisk brev til ein annen i spillet","Få spandert drikke på deg og hele bordet av ein random person dere ikkje kjenner","Kysse ein av motsatt kjønn","Gi minst 100kr til veldedighet",
  "Ri ein hest","Snakke eit annet språk enn norsk ein hel kveld på byen","Klint med broren til ein venninne"," Bli ferdig med julegavene innen 1. desember",
  "JOKER - gjør noe som er så sykt at det fortjener sitt eget kryss",
  "Padle i kano","Lage eit bål","Kline med noen som er over 30 år","Bli kastet ut av byen 2 ganger","Hils på 10 nye mennesker (og ta ein selfie med dem)","Dra på kunst-museum",
  "Spørre om nummeret til ein random fyr på gata","Spille volley-ball (med minst 9 andre)","Farge / bleke håret","Gå to uker uten Godteri chips eller brus",
  "Ta ein snus/røyk","Sove ein natt under åpen himmel (f.eks i hengekøye)","Fått kjæreste","Delta på ein dugrnad","Sagt 'eg elsker deg' til eit one night stand",
  "Besøk ein venn som studerer i ein annen 'by'","Ta ein 40% shot med ein venn"," Kline med noen som er under 170 cm","Reise til to nye land"," Lev i 24 timer uten telefon",
  "Se ein film utendørs","Gi blomster til betemoren/tanten din","Klippe seg","Bade 6 ganger i ferskvann","Gå på eit kurs for å lære no du ikkje kan","Dra på fisketur",
  "Ta bilde med ein kjendis","Bake kake","Kyss ein Lars","Flyttet","Ta ein bodyshot med noen fra det motsatte kjønn","Dra på ein ordentlig date med noen"," Gått ein tur på minst 10km",
  "Kos med Kira","Ta 5 'Mintu' shots","Sende vippskrav til ein person etter du har ligget med dem","Nakenbade","Skrifte til ein katolsk prest","Lage sushi med 3 eller fleire andre som er med i spillet",
  "Krasje ein bil"," Få ein ny venn","Ta video med forskjllige fremmed kor du blir kysset på kinnet (minst 6 personer i videoen)","Få ein ny hobby","Kjøp ein plante og hold den levende i 6 månender",
  "Chug sprite (0.5l) og film det","Fått ein ny jobb","Høyrt over 50 000min på musikk på din 'Spotify wrapped'","Gå på minst 1 festival","Poste ein offentlig TikTok",
  "Drikke 5 dager på rad (Må ha minst 2 enheter hver dag)","Isbad","Gå med 2 forskjllige sko ein hel dag","Gå på 20 forskjllige bruktbutikker",
  "JOKER - gjør noe som er så sykt at det fortjener sitt eget kryss","Si 'Ja' til alt ein hel dag (Må si ifrå til gruppa dagen før)'","Gå 30 000 skritt på ein dag","Løpe 3km",
  "Ikkje bruk TikTok i løpet av ein hel måned","Havne på legevakten","Send til ein du ikkje har hat sex med:'Eg trur du bør sjekke deg for klamma'",
  "Hold eit dyr som ikkje er eit husdyr og er lenger enn 20 cm","Plukke op ein haiker/haikere langs veien","Ta ein harusell","Overnatte i 6 ulike kommuner","Besøke 6 nye barer","Gi roser til ein random perosn"
];


var board = {
  tasks: Array(tasks.length).fill(false),
  points: 0
};

const BOARD_STATE_PREFIX = "boardState_";
const currentBoard = document.getElementById('boardName').textContent;


function displayPoints() {
  
  const points = getPoints();
  localStorage.setItem('points', points);
  document.getElementById('points').textContent = `${currentBoard}'s Points: ${points}`;
}

function saveBoard() {
  localStorage.setItem(BOARD_STATE_PREFIX + currentBoard, JSON.stringify(board));
}

function loadBoard() {
  const savedState = JSON.parse(localStorage.getItem(BOARD_STATE_PREFIX+currentBoard));
  if (savedState) {
    board = savedState;
  } else {
    saveBoard();
  }
}

function toggleTask(index) {
  board.tasks[index] = !board.tasks[index];
  board.points = getPoints();
  saveBoard();
  renderBoard();
}
//This can be changed to true to enable edit mode
let isEditMode = true;

// Function to set edit mode and re-render the board
function setEditMode(editMode) {
  isEditMode = editMode;
  renderBoard(); // Re-render the board to update event listeners based on the mode
}

// Modify your createTaskCell function to include an ID and conditionally attach event listener
function createTaskCell(index, isCompleted) {
  const cell = document.createElement('div');
  cell.id = `cell-${index}`;
  cell.className = 'bingo-cell';
  if (isCompleted) cell.classList.add('completed');
  cell.textContent = tasks[index];

  if (isEditMode) {
      cell.addEventListener('click', () => toggleTask(index));
  }

  return cell;
}

function renderBoard() {
  const boardElement = document.getElementById('bingoBoard');
  boardElement.innerHTML = '';

  board.tasks.forEach((task, index) => {
    const cell = createTaskCell(index, task);
    boardElement.appendChild(cell);
  });

  displayPoints();
}

function checkForStreaks(line) {
  let streak = 0;
  let streakPoints = 0;
  const requiredStreakForSix = 6;
  const requiredStreakForTen = 10;

  for (let i = 0; i < line.length; i++) {
    if (line[i]) {
      streak++;
    } else {
      streak = 0; // Reset streak count if the streak is broken
    }
    
    // Check for streaks of ten
    if (streak === requiredStreakForTen) {
      streakPoints += 2; // Add 6 bonus points for each streak of ten
      streak = 0; // Reset streak count after a successful streak
      // Skip the next checks to prevent counting this streak as multiple of six
      i += 1;
    }
    // Check for streaks of six if streak did not reach ten
    else if (streak === requiredStreakForSix) {
      streakPoints += 4; // Add 4 bonus points for each streak of six
      // We do not reset streak here to allow for the possibility of overlapping streaks
    }
  }
  return streakPoints;
}



function getPoints() {
  let points = 0;
  const gridSize = 10;

  // Initialize a grid to represent the state
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  // Map the state to the grid
  board.tasks.forEach((task, index) => {
    if (task) {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      grid[row][col] = true;
      points++; // Add points for each completed task
    }
  });

  // Check each row for streaks
  grid.forEach(row => {
    points += checkForStreaks(row);
  });

  // Check each column for streaks
  for (let col = 0; col < gridSize; col++) {
    const column = grid.map(row => row[col]);
    points += checkForStreaks(column);
  }

  return points;
}



document.addEventListener('DOMContentLoaded', function() {
  loadBoard();
  renderBoard();
});

// Initial render of the board
renderBoard();
