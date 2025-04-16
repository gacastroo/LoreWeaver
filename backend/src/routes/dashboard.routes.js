import express from 'express';
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({
    stories: 3,
    characters: 10,
    chapters: 5,
    universes: 2,
    scenes: 12,
    tags: 8,
    words: 15000,
    recentStories: [
      { title: "The Dark Forest", genre: "Fantasy", updated: "2 days ago" },
      { title: "City of Dreams", genre: "Sci-Fi", updated: "1 week ago" },
    ],
    activity: [
      { text: "Created Elena Blackwood", time: "2h ago" },
      { text: "Connected Elena ↔ Marcus", time: "3h ago" },
    ],
  });
});

export default router;
