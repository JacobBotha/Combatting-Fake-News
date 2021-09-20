import { Query, tables, Model } from "./db";

export class QuestionQuery extends Query {
    /**
     * A Query specifically for querying the questions table. Sets the 
     * table name to be the questions table. When passing objects as values
     * into insert/update/delete queries, the type mus be a Question.
     */
    constructor() {
        super(tables.question);
        this.model = new Question;
    }
}

class QuestionTypeQuery extends Query {
    constructor() {
        super(tables.questionType);
        this.model = new QuestionType;
    }
}

export class QuestionType extends Model {
    idQuestion_Type;
    name;
    data_type;

    constructor(name, data_type, id = null) {
        super();
        this.idQuestions = id;
        this.name = name;
        this.data_type = data_type;
    }

    getId() {
        return this.idQuestion_Type;
    }

    getIdName() {
        return "idQuestion_Type";
    }
}

export async function getAllQuestionTypes() {
    return new QuestionTypeQuery().select().run();
}

export class Question extends Model {
    idQuestions;
    headline;
    Question_Type_idQuestion_Type;
    answers;
    body;
    imageUrl;

    /**
     * A model of a question.
     * @param { String } headline 
     * @param { String } questionType 
     * @param { String } id 
     */
    constructor(headline, body, questionTypeId, questionType, id = null) {
        super();
        this.idQuestions = id;
        this.body = body;
        this.headline = headline;
        this.Question_Type_idQuestion_Type = questionTypeId;
        this.questionType = questionType;
        this.answers = [];
    }

    getHeadline() {
        return this.headline;
    }

    getId() {
        return this.idQuestions;
    }

    getQuestionTypeId() {
        return this.Question_Type_idQuestion_Type;
    }

    getQuestionType() {
        return this.questionType;
    }

    getAnswers() {
        return this.answers;
    }

    getBody() {
        return this.body;
    }

    getImageUrl() {
        return this.imageUrl;
    }

    /**
     * Check if the question has an Answer based off of the ID.
     * @param {String} idAnswer - ID of the answer to search question for
     * @returns True if contains answer, else false
     */
    hasAnswer(idAnswer) {
        for (let answer of this.answers) {
            if (answer.getId() == idAnswer) {
                return true;
            }
        }

        return false;
    }

    /**
     * Add an answer to the question
     * @param {Answer} answer The answer to add to the question.
     */
    addAnswer(answer) {
        if (!(answer instanceof Answer)) {
            throw Error("Must be of type Answer!")
        }

        this.answers.push(answer);
    }

    getIdName() {
        return 'idQuestions';
    }

    toJSON(questionType) {
        let answers = this.answers.map(answer => ({
            answer: answer.answer,
            statement: answer.statement
        }));

        return {
            headline: this.getHeadline(),
            body: this.getBody(),
            questionType: this.getQuestionType(),
            answers: answers
        }
    }
}

class Answer extends Model {
    idAnswer;
    answer;
    statement;
    questions_idQuestion;

    /**
     * A model of an answer. 
     * @param {String} answer - Whether the answer is corrent or not. Should be
     * "0" or "1".
     * @param {String} statement - Written answer.
     * @param {String} questions_idQuestions - The id of the question this 
     * anser belongs to.
     * @param {String} id - Answer ID on database. If this is a new question to
     * insert leave the id null.
     */
    constructor(answer, statement, questions_idQuestions, id = null) {
        super();
        this.idAnswer = id;
        this.answer = answer;
        this.statement = statement;
        this.questions_idQuestion = questions_idQuestions;
    }

    getId() {
        return this.idAnswer;
    }

    getStatement() {
        return this.statement;
    }

    getQuestionId() {
        return this.questions_idQuestion;
    }

    isCorrect() {
        return this.answer == true;
    }

    getIdName() {
        return 'idAnswers';
    }
}

/**
 * Returns all questions from the database
 * @returns JSON response
 */
 export async function getAllQuestions() {
    return new QuestionQuery()
        .select()
        .leftJoin(tables.answer, Question.prototype.getIdName())
        .run();
}

/**
 * Returns all questions that have an Answer.
 * @returns Question Array
 */
export async function getAllQuestionsWithAnswers() {
    const query = new QuestionQuery()
        .select()
        .innerJoin(tables.answer, Question.prototype.getIdName());
    const questionJSON = await query.run();

    //Iterate db response and create array of question objects.
    return questionsFromQAJoin(questionJSON);
}

export async function questionsFromQAJoin(questionJSON) {
    //Iterate db response and create array of question objects.
    let questions = [];
    let ids = [];

    let questionTypes = await new QuestionTypeQuery().select().run();
    for (const i of questionJSON) {
        if (ids.includes(i[Question.prototype.getIdName()])) {
            continue;
        }
        let questionType = null;
        for (let q of questionTypes) {
            if(q.idQuestion_Type == i.Question_Type_idQuestion_Type) {
                questionType = q.name;
            }
        }
        let question = new Question(i.headline, i.body, i.Question_Type_idQuestion_Type, questionType, i[Question.prototype.getIdName()]);
        ids.push(i[Question.prototype.getIdName()]);
        //Iterate db response and assign answers to the current question.
        for (const j of questionJSON) {
            if (j[Question.prototype.getIdName()] == question.getId() && !question.hasAnswer(j[Answer.prototype.getIdName()])) {
                let answer = new Answer(j.answer, j.statement, question.getId(), j[Answer.prototype.getIdName()]);
                question.addAnswer(answer);
            }
        }
        questions.push(question);
    }
    return questions;
}

/**
 * Returns a question from the database.
 * @param {string} idQuestion - ID for the question to return
 * @returns JSON response
 */
export async function getQuestion(id) {
    let condition = Question.prototype.getIdName() + " = ?";
    let query = new QuestionQuery()
        .select()
        .leftJoin(tables.answer, Question.prototype.getIdName())
        .where(condition, [id]);
    return query.run();
}

/**
 * Insert a single question into the database.
 * @param {String[] || Question} question - Values to insert.
 * @returns JSON response
 */
export async function insertQuestion(question) {
    return new QuestionQuery().insert(question).run();
}

/**
 * Insert a single question into the database.
 * @param {String[] || String[][] || Question[]} question - Values to insert.
 * @returns JSON response
 */
export async function insertQuestions(questions) {
    return new QuestionQuery().insertMany(questions).run();
}

/**
 * Update the given question on the database.
 * @param {Question} question - Undefined behaviour if Question.getId returns
 * null.
 * @returns 
 */
export async function updateQuestion(question) {
    return new QuestionQuery().update(question).run();
}
