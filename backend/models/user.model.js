const neo4j = require("neo4j-driver");
require("dotenv").config();
const { URL, DB_USERNAME, DB_PASSWORD, DB } = process.env;
const driver = neo4j.driver(URL, neo4j.auth.basic(DB_USERNAME, DB_PASSWORD));
const session = driver.session({ DB });

const findAll = async () => {
  const transaction = session.beginTransaction();

  try {
    const result = await transaction.run("MATCH (u:User) RETURN u");
    const records = result.records.map((record) => record.get("u").properties);
    await transaction.commit();

    return records;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findById = async (id) => {
  const transaction = session.beginTransaction();

  try {
    const result = await transaction.run(
      `MATCH (u:User {id : '${id}'} ) RETURN u LIMIT 1`
    );
    const records = result.records[0].get("u").properties;
    await transaction.commit();
    return records;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findByLoginOrEmail = async (login, email) => {
  const transaction = session.beginTransaction();

  try {
    const result = await transaction.run(
      `MATCH (u:User) WHERE u.login = '${login}' OR u.email = '${email}' RETURN u;`
    );
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const create = async (user) => {
  const transaction = session.beginTransaction();
  try {
    await transaction.run(
      `CREATE (u:User {id : '${user.id}', login: '${user.login}', email: '${user.email}', password: '${user.password}'} ) RETURN u`
    );
    await transaction.commit();
    return await findById(user.id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findByIdAndUpdate = async (id, user) => {
  const transaction = session.beginTransaction();
  try {
    const result = await transaction.run(
      `MATCH (u:User {id : '${id}'}) SET u.login= '${user.login}', u.email= '${user.email}', u.password= '${user.password}' RETURN u`
    );
    const records = result.records[0].get("u").properties;
    await transaction.commit();
    return records;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findByIdAndDeleteWithPosts = async (id) => {
  const transaction = session.beginTransaction();
  try {
    await transaction.run(
      `MATCH (u:User {id : '${id}'}) OPTIONAL MATCH (u)-[r]-(p:BlogPost) WITH u,r,p DELETE u,r,p;`
    );
    await transaction.commit();
    return await findAll();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  findByIdAndUpdate,
  findByIdAndDeleteWithPosts,
  findByLoginOrEmail,
};
