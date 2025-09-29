

export const selectdeptT =async(req, res) => {
    try{
    const selectedOption = req.body.selectedOption;
  
    // Submit the form data to the server
  
    // Navigate to a different page based on the selected option
    if (selectedOption === 'ce') {
      res.send({ url: '/teacher/ce' });
    } else if (selectedOption === 'ee') {
      res.send({ url: '/teacher/ee' });
      } else {
      res.status(400).send('Invalid option');
    }}
    catch (err){
      console.log(err);
      return res.status(400).send("Error. Try again.");
    }
  };