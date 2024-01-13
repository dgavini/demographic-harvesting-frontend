const fetching = require("./sample");

const Returdata = async () => {
    try {
        const data = await fetching();
        console.log("Data from API", data);
    } catch (error) {
        console.error('Error in Returdata:', error);
    }
};

Returdata();
