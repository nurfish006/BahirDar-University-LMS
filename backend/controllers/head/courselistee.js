import Eecourse from "../../models/eecourse";

export const courselistee = async (req, res) => {
    try {
      const courses = await Eecourse.find({}) ;
     res.send({ status: "ok",data: courses});
    } catch (error) {
      console.log(error);
   }};