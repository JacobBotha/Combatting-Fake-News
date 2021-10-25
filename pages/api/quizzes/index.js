import * as lib from "../../../lib/quiz";

const handler = async (_, res) => {
    try {
        const results = await lib.getAllQuizzes();  
        // console.log(await results);
        const quizFormated = []
        for (let quiz of results) {
            let isAvailable = false;
            if (quiz.quizNumber === 1) isAvailable = true;
            console.log(quiz.quizNumber, ", ")
            //  JSON.parse(quiz.position));
            quizFormated.push({
                levelName: quiz.name,
                levelNumber: quiz.quizNumber,
                levelDescription: quiz.description,
                link: quiz.link,
                isAvailable: isAvailable,
                position: JSON.parse(quiz.position),
                namePosition: quiz.namePosition,
                imagePosition: quiz.imagePosition,
                image: quiz.image
            })
        }
        //const results = await lib.createQuiz();
        return res.status(200).json( quizFormated );
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
