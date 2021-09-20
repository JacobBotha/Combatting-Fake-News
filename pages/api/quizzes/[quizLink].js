import * as lib from "../../../lib/quiz";

export default async function handler(req, res) {
    try {
        const { quizLink } = req.query;
        const results = await lib.getQuiz(quizLink);
        
        if (results == 404) {
            return res.status(404).json({ message: "Cannot find quiz with link: " + quizLink});
        }

        return res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
  }
  