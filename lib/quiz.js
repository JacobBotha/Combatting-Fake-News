import ContentAddCircleOutline from "material-ui/svg-icons/content/add-circle-outline";
import { Query, tables, Model } from "./db";

class QuestionQuery extends Query{
    /**
     * A Query specifically for querying the questions table. Sets the 
     * table name to be the questions table. When passing objects as values
     * into insert/update/delete queries, the type mus be a Question.
     */
    constructor(){
        super(tables.question);
        this.model = new Question;
    } 
}

export class Question extends Model {
    idQuestions; 
    headline;
    Question_Type_idQuestion_Type;

    constructor(headline, questionType, id=null) {
        super();
        this.idQuestions = id;
        this.headline = headline;
        this.Question_Type_idQuestion_Type = questionType;
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

    getIdName() {
        return 'idQuestions';
    }
}

class Answer extends Model {
    idAnswer;
    Answer;
    Statement;
    Questions_idQuestion;
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
 * @returns JSON response
 */
 export async function getAllQuestionsWithAnswers() {
    return new QuestionQuery()
        .select()
        .innerJoin(tables.answer, Question.prototype.getIdName())
        .run();
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
    console.log(query);
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