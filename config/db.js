const mongoose = require("mongoose");

const db = async () => {

    try {
        mongoose
            .connect(process.env.MONGO_URI)
            .then((onfulfilled) =>
                console.log({
                    connect_db_success: "success connect NodeJS to MongoDB",
                })
            )
            .catch((err) => console.log({ connect_db_err: err }));
    } catch (error) {
        console.log({ connect_db_error: error });
    }
};

module.exports = { db };
