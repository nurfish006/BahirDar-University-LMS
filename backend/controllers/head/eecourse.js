import Eecourse from "../../models/eecourse";

export const addcourseee = async (req, res) => {
    try {
      // console.log(req.body);
      const { cname, ccode, ccredit } = req.body;
      // validation
      if (!cname) return res.status(400).send(" course Name is required");
      if (!ccode) return res.status(400).send(" course code is required");
      if (!ccredit) return res.status(400).send(" course credit is required");
  
      let courseExist = await Eecourse.findOne({ cname }).exec();
      if (courseExist) return res.status(400).send("this course is already added");
  
      // adding course
      const course = new Eecourse({
        cname,
        ccode,
        ccredit,
      });
      await course.save();
      // console.log("saved user", user);
      return res.json({ ok: true });
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error. Try again.");
    }
  };