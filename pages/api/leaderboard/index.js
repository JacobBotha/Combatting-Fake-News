const handler = async (_, res) => {
  try {

    //Todo: fecth score from database
    const userScores = [
      { name: "Kaylee", score: 100 },
      { name: "Maggie", score: 90 },
      { name: "Tara", score: 80 },
    ];

    const results = { userScores };

    return res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
