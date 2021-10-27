import { Query, tables, Model } from "./db";

import * as QuestionController from "./question";
import {Question, QuestionQuery} from "./question";

export class Quiz extends Model {
    idQuiz;
    link;
    expiry;
    time;

    constructor(link, expiry, time, id = null) {
        super();
        this.idQuiz = id;
        this.link = link;
        this.expiry = expiry;
        this.time = time;
    }

    getId() {
        return this.idQuiz;
    }

    getIdName() {
        return "idQuiz";
    }
}

class QuizQuery extends Query {
    constructor() {
        super(tables.quiz);
        this.model = new Quiz();
    }
}

/**
 * Create a new quiz in the database and assign a set 
 * @param {Integer} questionCount Number of questions to assign to the quiz
 * @param {Integer} time Number of second assigned to the quiz length
 * @param {Date} expiry Timestamp when quiz expires
 * @param {Integer} is_level 1 if this is a set level 0 if it is a multiplayer quiz 
 * @returns Array of question models.
 */
export async function createQuiz(questionCount = 3, time = 60, expiry = null, is_level = 0) {
    //generate quiz link
    const link = await generateQuizLink();

    //set expiry to be 30 days from now
    if (expiry == null) {
        expiry = new Date;
        expiry.setDate(expiry.getDate() + 30);
    }
    
    //select all questions from database
    const questionQuery = new QuestionQuery()
        .select()
        .innerJoin(tables.answer, Question.prototype.getIdName())
        .run(false);
    const questions = await QuestionController.questionsFromQAJoin(await questionQuery);

    //insert new quiz
    const quizQuery = await new QuizQuery().insert([link, "?", "?", "?"], ['link', 'expiry', 'time', 'is_level']);
    quizQuery.values = [expiry, time, is_level]; 
    const quiz = await quizQuery.run(false);

    //generate list of questions for quiz
    let quizQuestions = [];
    for (let index = 0; index < questionCount; index++) {
        quizQuestions.push([quiz.insertId, questions[index].getId()]);
    }
    
    //insert all quiz to question relationships
    const q = await new Query(tables.quizQuestion).insertMany(quizQuestions, ['Quizzes_idQuiz', 'Questions_idQuestions']).run();

    if (q.affectedRows == 0 || q.affectedRows != quizQuestions.length) {
        throw Error("Wrong number of questions assigned to quiz: " + q.affectedRows.toString());
    }

    return questions;
}

export async function getQuiz(link) {
    const query = new QuizQuery()
        .select()
        .innerJoin(tables.quizQuestion, Quiz.prototype.getIdName())
        .innerJoin(tables.question, tables.question + '_' + Question.prototype.getIdName(), Question.prototype.getIdName(), [], tables.quizQuestion)
        .innerJoin(tables.answer, Question.prototype.getIdName(),  tables.question + '_' + Question.prototype.getIdName(), [], tables.question)
        .where('link = ?', [link])
        .run();
    const questionJSON = await query;
    if (questionJSON.length === 0) {
        return 404;
    }

    let questions = await QuestionController.questionsFromQAJoin(questionJSON);
    return {
        quiz: {
            link: link, 
            expiry: questionJSON[0].expiry, 
            time: questionJSON[0].time, 
            image: questionJSON[0].image,
            levelDescription: questionJSON[0].description,
        },
        questions: questions.map(q => q.toJSON())
    }
}

export async function getAllQuizzes() {
    let query = await new QuizQuery().select();

    return query.run();

}

/**
 * Creates a unique hash for a quiz link.
 * @returns SHA256 encrypted string
 */
async function generateQuizLink() {
    let query = await new QuizQuery().select("COUNT(idQuiz)").run(false);
    const crypto = require("crypto")
        .createHash("sha256")
        .update((parseInt(query[0]["COUNT(idQuiz)"])*parseInt(Date.now())).toString())
        .digest("hex");

    return await crypto;
}