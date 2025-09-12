const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/stats', (req, res) => {
  res.json([
    { player: 'John Doe', goals: 12, assists: 5, matches: 20, position: 'Forward' },
    { player: 'Jane Smith', goals: 9, assists: 7, matches: 18, position: 'Midfielder' },
    { player: 'Ali Mwenda', goals: 15, assists: 4, matches: 22, position: 'Forward' },
    { player: 'Maria Garcia', goals: 7, assists: 10, matches: 19, position: 'Defender' },
    { player: 'Liu Wei', goals: 10, assists: 6, matches: 21, position: 'Midfielder' },
    { player: 'Fatima Zahra', goals: 11, assists: 8, matches: 20, position: 'Forward' },
    { player: 'Carlos Silva', goals: 8, assists: 9, matches: 18, position: 'Defender' },
    { player: 'Anna Ivanova', goals: 14, assists: 3, matches: 22, position: 'Forward' },
    { player: 'Mohamed Hassan', goals: 6, assists: 11, matches: 19, position: 'Midfielder' },
    { player: 'Sophie Dubois', goals: 13, assists: 2, matches: 21, position: 'Forward' },
    { player: 'David Brown', goals: 5, assists: 12, matches: 20, position: 'Defender' },
    { player: 'Emma Wilson', goals: 16, assists: 1, matches: 22, position: 'Forward' },
    { player: 'James Taylor', goals: 4, assists: 13, matches: 18, position: 'Midfielder' },
    { player: 'Olivia Martinez', goals: 17, assists: 0, matches: 21, position: 'Forward'},
    { player: 'Liam Johnson', goals: 3, assists: 14, matches: 19, position: 'Defender' },
    { player: 'Isabella Lee', goals: 18, assists: 2, matches: 22, position: 'Forward' },
    { player: 'Noah Kim', goals: 2, assists: 15, matches: 20, position: 'Midfielder' },
    { player: 'Mia Chen', goals: 19, assists: 1, matches: 21, position: 'Forward' },
    { player: 'Ethan Clark', goals: 1, assists: 16, matches: 18, position: 'Defender' },
    { player: 'Ava Rodriguez', goals: 20, assists: 0, matches: 22, position: 'Forward' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});