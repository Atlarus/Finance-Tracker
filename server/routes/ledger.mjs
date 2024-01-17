// Get a list of 50 posts
router.get("/", async (req, res) => {
    let collection = await db.collection("Companies");
    let results = await collection.find({})
      .toArray();
    res.send(results).status(200);
  });