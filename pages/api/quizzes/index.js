import * as lib from "../../../lib/quiz";

const handler = async (_, res) => {
    try {
        // var question = new lib.Question('Trump is Alive', '1', '1');
        // const results = await lib.updateQuestion(question);
        const results = await lib.getQuestion(1);
        return res.status(200).json( results );
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
