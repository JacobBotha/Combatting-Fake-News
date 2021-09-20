/**
 * MySQL connection.
 * Uses npm module 'serveless-mysql' as a wrapper.
 */
const mysql = require('serverless-mysql')({
    config: {
  host     : process.env.DATABASE_HOST ,
  user     : process.env.DATABASE_USERNAME,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME
    }
});

export class Model {
    /**
     * A model of a database table. The attributes are the names on the Database
     * and the methods are names used by the frontend. 
     * 
     * @abstract
     * @constructs
     */
    constructor() {
        if (this.constructor === Model) {
            throw new Error('Model must be implemented by subclass!');
        }
    }

    /**
     * Return the id for the model. Must be overriden.
     * @abstract 
     * @returns String Id
     */
    getId() {
        return;
    }

    /**
     * Return the name of the id column in the database. Must be overriden.
     * @abstract 
     * @returns String Id
     */
    getIdName() {
        return;
    }
}

/** Database tables. Container for different SQL table names.  */
export const tables = {
    quiz: 'Quizzes',
    question: 'Questions',
    answer: 'answers',
    user: 'users',
    quizHasUser: 'QUIZ_HAS_USERS',
    quizQuestion: 'quizzes_has_questions',
    questionType: 'question_types'
};

export class Query {
    table;
    columns;
    _queryString;
    timeout;
    values;
    model = null;
    
    /**
     * Queries the database.
     * 
     * Holds structure and executes a query on the mysql database. Columns 
     * parameter can be passed as string or string[], and a string array is 
     * parsed to a string.
     * @param {string} table - The table to query.
     * @param {string[] || string} columns - The columns returned by the query.
     * @returns {Query} - Returns this.
     */
    constructor(table, columns="*", timeout=1000) {
        this.table = table;
        this.columns = columns.toString();
        this.timeout = timeout;
        this.values = [];
    }
    
    /**
     * Run the query on the MYSQL database.
     * @param {Boolean} end - If you have more queries to, do not end the
     * connection.
     * @returns {String} - Results from query
     */
     async run(end = true) {
        try {
            console.log("Sending Query to database:\n"+this._queryString+ 
            "\nWith Values: "+ this.values);
            const results = await mysql.query(this._queryString, this.values);
            if (end) await mysql.end();
            return results;
        } catch (e) {
            throw Error(e.message)
        }
    }

    async runTogether(queries, queryConditions = null, end = true) {
        
        console.log("Sending Query to database:\n"+this._queryString+ 
        "\nWith Values: "+ this.values);
        let results = mysql.transaction();
        results = results.query(this._queryString, this.values)

        if (queries !=  null) {
            for (const query of queries) {
                results = results.query(query._queryString, query.values);
            }
        }

        if (queryConditions !=  null) {
            for (const query of queryConditions) {
                results = results.query(query);
            }
        }

        console.log(results);
        results = await results.rollback(e => { throw Error(e.message) })
            .commit(); // execute the queries
        if (end) await mysql.end();
        return results;
    }


    /**
     * Set the query to a select statement. This will clear the current 
     * contents of the query and should be used on a new query.
     * @param {string[] || string} columns - The columns returned by the query.
     * Default to the current query columns.
     * @returns {Query} - Returns this.
     */
    select(columns){
        this.columns = (columns != null ) ? columns.toString() : this.columns;
        this._queryString = "SELECT " + this.columns + " FROM " + 
        this.table;
        
        return this;
    }

    /**
     * Set the query to an insert statement. This will clear the current 
     * contents of the query and should be used on a new query.
     * @param {string[] || string} columns - The columns inserted in the query.
     * Default to the current query columns.
     * @param {string[] || string} values - The values to insert. The number of
     * values must be equal to the length of columns else an SQL error is 
     * thrown.
     * @returns {Query} - Returns this.
     */
    insert(values, columns){
        let statement = this._insertHelper(values, columns);
        this._queryString = statement + this._valuesString(values);
        
        return this;
    }

    /**
     * Set the query to an insert statement, where many are inserted. This will 
     * clear the current contents of the query and should be used on a new query.
     * @param {string[] || string} columns - The columns inserted in the query.
     * Default to the current query columns.
     * @param {string[] || string} values - The values to insert. The number of
     * values must be equal to the length of columns else an SQL error is 
     * thrown.
     * @returns {Query} - Returns this.
     */
    insertMany(values, columns) {
        let many = this._manyHelper(values)
        if (many instanceof Object) {
            values = many['values'];
            columns = many['columns'];
        } else {
            values =  many;
        }
        let statement = this._insertHelper(values, columns);
        this._queryString = statement + values;
        
        return this;
    }
    
    /**
     * Set the query to an update statement. This will clear the current 
     * contents of the query and should be used on a new query. 
     * 
     * BE CAREFUL USING THE UPDATE METHOD! If you run an SQL UPDATE statement
     * without a where statement afterwards, it will update all rows for this
     * table. This is why the id for the model sent here is used as the where
     * condition by default for this update. If you want to update all or use
     * a custom where after the update, set whereCondition paramater to null.
     * Otherwise it will use model.getIdName = model.getID for condition.
     * @param {Model} model - The object to insert into the database.
     * @param {String || String[]} where - The where conditions for 
     * the update. Set this to null to update all rows on table with the given
     * object, or to apply a custom where afterwards.
     * @param {String || String[]} values - The where condition values.
     * @returns {Query} - Returns this.
     */
    update(model, where='id'){
        // if(!(model instanceof typeof(this.model)) && 
        // !(this.model.constructor === Model)) {
        //     throw Error("Value is wrong type");
        // }

        this.model = model;
        let conditions = "";

        if(where == 'id') {
            conditions = this.model.getIdName() + " = " + this.model.getId();
        }

        let setString = " SET";
        for(let key of Object.keys(model)) {
            if (this.model[key] === undefined || this.model[key] == null) {
                continue;
            }
            let kvString = " " + key + " = '" + this.model[key] + "' ";
            if (setString == " SET"){
                setString += kvString;
            } else {
                setString += ", " + kvString;
            }
        }

        this._queryString = "UPDATE " + this.table + setString;
        
        if(where == 'id') {
            console.log(conditions);
            this.where(conditions);
        }
        
        return this;
    }

    /**
     * Where statement to send with the query. This must be called after an 
     * initial statement has been made. If there has been no select, update, 
     * insert or delete called then error will be thrown.
     * 
     * @param {string || string[]} conditions 
     * @param {string[]} values - The values representing any ? placed into 
     * condition strings. Same as npm mysql query. Note that order is important.
     * @param {*} conditionSeperator 
     * @returns 
     */
    where(conditions, values = [], conditionSeperator = " AND ") {
        if(this._queryString && this._queryString.length==0){
            throw Error("Calling where on empty Query.");
        }

        conditions=this._conditionSeperator(conditions, conditionSeperator);
        if (values instanceof Array) {
            values.forEach(value => { this.values.push(value); });
        }

        this._queryString += " WHERE " + conditions;

        return this;
    }

    /**
     * Inner Join statement to send with the query. This must be called after 
     * an initial statement has been made. If there has been no select, update,
     * insert or delete called then error will be thrown.
     * @param {string} joinTable - The table to join with the current.
     * @param {string} column - The column on the query table which is shared
     * by the join table.
     * @param {string} foreignKey - The column on the join table to compare.
     * @returns {Query} - Returns this.
     */
    innerJoin(joinTable, column, foreignKey, conditions, table = null,
        conditionSeperator = " AND ") {
        if (table == null) {
            table = this.table;
        }

        var joinType = " INNER "
        this._join(joinTable, column , foreignKey, conditions,
            conditionSeperator, table, joinType);
        return this;
    }

    /**
     * Left Join statement to send with the query. This must be called after 
     * an initial statement has been made. If there has been no select, update, 
     * insert or delete called then error will be thrown.
     * @param {string} joinTable - The table to join with the current.
     * @param {string} column - The column on the query table which is shared
     * by the join table.
     * @param {string} foreignKey - The column on the join table to compare.
     * @returns {Query} - Returns this.
     */
     leftJoin(joinTable, column, foreignKey, conditions, table = null,
        conditionSeperator = " AND ") {
            if (table == null) {
                table = this.table;
            }
        var joinType = " LEFT "
        let statement = this._join(joinTable, column , foreignKey, conditions,
            conditionSeperator, table, joinType);
        return this;
    } 
    /**
    * Left Outer Join statement to send with the query. This must be called after 
    * an initial statement has been made. If there has been no select, update, 
    * insert or delete called then error will be thrown.
    * @param {string} joinTable - The table to join with the current.
    * @param {string} column - The column on the query table which is shared
    * by the join table.
    * @param {string} foreignKey - The column on the join table to compare.
    * @returns {Query} - Returns this.
    */
    leftOuterJoin(joinTable, column, foreignKey, conditions, table = null,
       conditionSeperator = " AND ") {
        if (table == null) {
            table = this.table;
        }
       var joinType = " LEFT OUTER "
       let statement = this._join(joinTable, column , foreignKey, conditions,
           conditionSeperator, joinType);
       return this;
   }

    /**
     * Right Join statement to send with the query. This must be called after 
     * an initial statement has been made. If there has been no select, update, 
     * insert or delete called then error will be thrown.
     * @param {string} joinTable - The table to join with the current.
     * @param {string} column - The column on the query table which is shared
     * by the join table.
     * @param {string} foreignKey - The column on the join table to compare.
     * @returns {Query} - Returns this.
     */
    rightJoin(joinTable, column, foreignKey, conditions, 
        conditionSeperator = " AND ") {
        var joinType = " RIGHT "
        let statement = this._join(joinTable, column , foreignKey, conditions,
            conditionSeperator, joinType);
        return this;
    }

    /**
     * Return the string for an generic JOIN sql statement. This is a private
     * class and should not be called outside of the other join methods in 
     * this class. Use method innerJoin() if unsure.
     * @param {string} joinTable - The table to join with the current.
     * @param {string} column - The column on the query table which is shared
     * by the join table.
     * @param {string} foreignKey - The column on the join table to compare.
     * @returns {String} - Returns this.
     */
    _join(joinTable, column , foreignKey, conditions, conditionSeperator, 
        table, joinType) {
        if(this._queryString && this._queryString.length==0){
            throw Error("Calling join on empty Query.");
        }
        conditions=this._conditionSeperator(conditions, conditionSeperator);
        if (foreignKey === undefined) {
            foreignKey = this.table + "_" + column;
        }

        this._queryString += joinType +"JOIN " + joinTable + " ON " + 
        table + "." + column + " = " + joinTable + "." + foreignKey +
        conditions;

        return this;
    }

    _insertHelper(values, columns) {
        this.columns = (columns != null ) ? columns.toString() : this.columns;
        return "INSERT INTO " + this.table + " (" + this.columns + 
        ") VALUES";
    }

    _valuesString(values) {
        let s = "( ";
        if (values instanceof String) {
            values = values.split(",");
        } 
        if (values instanceof Array) {
            for(let value of values) {
                let valueString = "'" + value.toString() + "'";
                if (value.toString() == '?') {
                    valueString = '?';
                }

                if (s == "( ") {
                    s += valueString;
                } else {
                    s += ", " + valueString;
                }
            }
        } else {
            throw Error("Incorrect Type passed as values, only string and string[]" +
            "allowed");
        }

        if (s == "( ") {
            throw Error("Values is epmty");
        } else {
            s += ")"
        }

        return s;

    }

    _manyHelper(values) {
        if(values instanceof Array) {
            //If the values are an array of objects, return an object with 
            //values and columns as string attributes.
            if (this.model && values[0] instanceof typeof(this.model)) {
                if (this.model = null) {
                    throw Error("Cannot use object paramaters without" +
                    "defining the model of the table.")
                }
                let v = {
                    values : "",
                    columns : values[0].keys
                }
                
                for (let value of values) {
                    if (value.keys() != v.columns) {
                        throw Error("Objects in array must have the same keys.");
                    }
                    for(let key in value) {
                        let x = this._valuesString(value[key]);
                        if(v.values == "") {
                            v.values = x;
                        } else {
                            v.values += ", " + x;

                        }
                    }
                }
                return v;
            }
            //If the values are an array of strings or arrays put each into 
            //brackets
            var s = "";
            for(let value of values) {
                let x = this._valuesString(value);
                if(s == "") {
                    s = x;
                } else {
                    s += ", " + x;
                }
            }
            return s;
        }   
        
        return null;
    }

    /**
     * Generate a string that has seperated the conditions.
     * @param {string[] || string} conditions - Seperates if string array
     * @param {string} conditionSeperator - How the conditions are seperated
     * Default is AND.
     * @returns string
     */
    _conditionSeperator(conditions, conditionSeperator = " AND ") {
        if (conditions instanceof Array) {
            return conditions.join(conditionSeperator);
        } if (conditions === undefined || conditions == null) {
            return "";
        }

        return conditions;
    }
}

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
    return sql_query('SELECT * FROM Questions', [])
}

export async function getQuestion(questionId) {
    return sql_query('SELECT * FROM Questions WHERE idQuestion = ?', [questionId]) 
}