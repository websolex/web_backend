const ViewCount = require('../model/viewcount');


const getViewCount = async (req, res) => {
    const viewCount = await ViewCount.findOne();

    res.json(viewCount);
}

const incrementViewCount = async (req, res) => {
    let viewCount = await ViewCount.findOne();
    if (viewCount) {
        viewCount.count += 1;
        await viewCount.save();
    } else {
        viewCount = new ViewCount({ count: 1 });
        await viewCount.save();
    }
    res.json({ message: "View count incremented" });
}

module.exports = {
    getViewCount,
    incrementViewCount
}