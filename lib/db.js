// Require and initialize outside of your main handler
const mysql = require('serverless-mysql')({
    config: {
  host     : process.env.DATABASE_HOST ,
  user     : process.env.DATABASE_USERNAME,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME
    }
});

export async function sql_query(query_string, values = []) {
    try {
        const results = await mysql.query(query_string, values);
        await mysql.end();
        return results;
    } catch (e) {
        throw Error(e.message)
    }
}

export async function getAllQuestion() {
    return sql_query('SELECT * FROM Question', [])
}

export async function getQuestion(questionId) {
    return sql_query('SELECT * FROM Question WHERE idQuestion = ?', [questionId]) 
}