import * as lib from "../../lib/db";


const handler = async (_, res) => {
    try {
        const results = await lib.getAllQuestion();
        return res.status(200).json( results );
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export default handler;
