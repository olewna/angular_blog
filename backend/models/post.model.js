const neo4j = require("neo4j-driver");
require("dotenv").config();
const { URL, DB_USERNAME, DB_PASSWORD, DB } = process.env;
const driver = neo4j.driver(URL, neo4j.auth.basic(DB_USERNAME, DB_PASSWORD));
const session = driver.session({ DB });

const findAll = async () => {
  const transaction = session.beginTransaction();
  try {
    const result = await transaction.run(`Match (u:BlogPost) RETURN u`);
    const records = result.records.map((record) => {
      const properties = record.get("u").properties;
      if (properties.categories) {
        properties.categories = properties.categories.split(",");
      }
      return properties;
    });
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
      `MATCH (u:BlogPost {id : '${id}'} ) RETURN u LIMIT 1`
    );
    const records = result.records[0].get("u").properties;
    if (records.categories) {
      records.categories = records.categories.split(",");
    }
    await transaction.commit();
    return records;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const create = async (post) => {
  const createRelationQuery = `
    MATCH (user:User {login: '${post.author}'})
    CREATE (user)-[:Wrote]->(post:BlogPost {id: '${post.id}', title: '${
    post.title
  }', body: '${post.body}', categories: '${post.categories
    .map((x) => x.name)
    .toString()}', author: '${post.author}'})
    RETURN post
  `;
  const transaction = session.beginTransaction();

  try {
    await transaction.run(createRelationQuery);
    await transaction.commit();
    return await findById(post.id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findByIdAndUpdate = async (id, post) => {
  const transaction = session.beginTransaction();
  try {
    const result = await transaction.run(
      `MATCH (u:BlogPost {id : '${id}'}) SET u.title= '${
        post.title
      }', u.body= '${post.body}', u.categories= '${post.categories
        .map((x) => x.name)
        .toString()}', u.author= '${post.author}' RETURN u`
    );
    const records = result.records[0].get("u").properties;
    await transaction.commit();
    return records;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findByIdAndDelete = async (id) => {
  const transaction = session.beginTransaction();
  try {
    await transaction.run(`MATCH (u:User)-[r]-(p:BlogPost {id : '${id}'})
    DETACH DELETE p;`);
    await transaction.commit();
    return await findAll();
  } catch (error) {
    await transaction.rollback();
  }
};

module.exports = {
  findAll,
  findById,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
};
