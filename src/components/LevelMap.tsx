interface Level {
  id: number;
  title: string;
  isUnlocked: boolean;
  isActive: boolean;
}

const levels: Level[] = [
  { id: 1, title: "Basics", isUnlocked: true, isActive: true },
  { id: 2, title: "Budgeting", isUnlocked: false, isActive: false },
  { id: 3, title: "Investing", isUnlocked: false, isActive: false },
  { id: 4, title: "Credit", isUnlocked: false, isActive: false },
  { id: 5, title: "Advanced", isUnlocked: false, isActive: false },
];

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="lock-icon"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// Positions for zigzag pattern (percentage from center)
const positions = [0, 35, -35, 35, -35];

export function LevelMap() {
  return (
    <div className="level-map">
      <header className="map-header">
        <h1>Financial Foundations</h1>
        <p>Master the basics of personal finance</p>
      </header>

      <div className="levels-container">
        {/* SVG Path connecting levels */}
        <svg className="path-svg" viewBox="0 0 200 700" preserveAspectRatio="none">
          <path
            d="M 100 40 
               Q 100 80, 135 110
               Q 170 140, 135 170
               Q 100 200, 65 230
               Q 30 260, 65 290
               Q 100 320, 135 350
               Q 170 380, 135 410
               Q 100 440, 65 470
               Q 30 500, 65 530
               Q 100 560, 100 600"
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Gold portion for completed path */}
          <path
            d="M 100 40 Q 100 80, 135 110"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        
        {levels.map((level, index) => (
          <div
            key={level.id}
            className={`level-node ${level.isActive ? "active" : ""} ${
              !level.isUnlocked ? "locked" : ""
            }`}
            style={{
              transform: `translateX(${positions[index]}px)`,
            }}
          >
            <div className="level-circle">
              <div className="level-inner">
                {level.isUnlocked ? (
                  <span className="level-number">{level.id}</span>
                ) : (
                  <LockIcon />
                )}
              </div>
              {level.isActive && (
                <button className="start-button">START</button>
              )}
            </div>
            <span className="level-title">{level.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
